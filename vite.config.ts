/// <reference types="vitest/config" />
import { readFileSync } from 'node:fs';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

// Live Vercel URL; VITE_SITE_URL (set in Vercel) overrides it
const DEFAULT_SITE_URL = 'https://its-aditisingh-portfolio.vercel.app';

const PAGES = ['/', '/about', '/projects', '/certificates', '/achievements', '/experience', '/contact'];
const COLLECTIONS = ['projects', 'certificates', 'achievements', 'experience'] as const;

/** Slugs straight from the data files, so the sitemap can't drift from the content. */
function readSlugs(collection: (typeof COLLECTIONS)[number]) {
  const source = readFileSync(new URL(`./src/data/${collection}.ts`, import.meta.url), 'utf8');
  return [...source.matchAll(/^\s{4}slug: '([a-z0-9-]+)',$/gm)].map((match) => match[1]!);
}

/**
 * - replaces %SITE_URL% in index.html (absolute URLs for share cards; crawlers like WhatsApp and
 *   LinkedIn don't run JS, so the site-wide card must be in the static HTML)
 * - emits sitemap.xml and robots.txt at build (NFR-S3)
 */
function seoFiles(siteUrl: string): Plugin {
  return {
    name: 'portfolio-seo-files',
    // 'pre': must run before Vite parses href/src attributes (it chokes on the raw "%SITE_URL%")
    transformIndexHtml: {
      order: 'pre',
      handler: (html) => html.replaceAll('%SITE_URL%', siteUrl),
    },
    generateBundle() {
      const today = new Date().toISOString().slice(0, 10);
      const paths = [
        ...PAGES,
        ...COLLECTIONS.flatMap((collection) => readSlugs(collection).map((slug) => `/${collection}/${slug}`)),
      ];
      const urls = paths
        .map(
          (path) =>
            `  <url><loc>${siteUrl}${path === '/' ? '/' : path}</loc><lastmod>${today}</lastmod></url>`,
        )
        .join('\n');
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      });
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  const siteUrl = (env.VITE_SITE_URL || DEFAULT_SITE_URL).replace(/\/$/, '');

  return {
    plugins: [react(), seoFiles(siteUrl)],
    // One source of truth for the site URL in the app too
    define: { 'import.meta.env.VITE_SITE_URL': JSON.stringify(siteUrl) },
    resolve: {
      alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
    },
    // No manualChunks: three.js / R3F are reached only through the dynamic import in HeroCanvas,
    // which already splits them out. A manual "three" chunk made Rollup hoist shared helpers into it,
    // so the entry imported (and modulepreloaded) all of three.js — defeating the lazy load (NFR-P4).
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./src/test/setup.ts'],
      include: ['src/**/*.test.{ts,tsx}'],
      css: false,
      // Page-level tests render full routes (lazy chunks, modals, galleries) in jsdom; under a
      // loaded CPU the default 5 s per test was too tight for the heaviest one (Mind Scan modal).
      testTimeout: 10000,
    },
  };
});
