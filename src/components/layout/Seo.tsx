import { Helmet } from 'react-helmet-async';
import { site } from '@/data/site';
import type { ImageRef } from '@/types';

interface SeoProps {
  /** Page name; rendered as "<title> · Aditi Singh". Omit on Home for the default title. */
  title?: string;
  description?: string;
  /** Route path, used for the canonical URL. */
  path: string;
  /** Share image for this page (defaults to the site card). */
  image?: ImageRef;
  /** Structured data (JSON-LD) for this page. */
  jsonLd?: Record<string, unknown>;
}

const SITE_URL = (import.meta.env.VITE_SITE_URL ?? '').replace(/\/$/, '');

function absolute(url: string) {
  return /^https?:\/\//.test(url) ? url : `${SITE_URL}${url.startsWith('/') ? '' : '/'}${url}`;
}

/** Per-page meta (NFR-S1/S2/S5). Replaces the static data-rh tags from index.html. */
export function Seo({ title, description = site.description, path, image, jsonLd }: SeoProps) {
  const fullTitle = title ? `${title} · ${site.name}` : site.defaultTitle;
  const canonical = `${SITE_URL}${path === '/' ? '/' : path}`;
  const shareImage = image
    ? { url: absolute(image.src), width: image.width, height: image.height, alt: image.alt }
    : { url: absolute('/og-image.png'), width: 1200, height: 630, alt: site.defaultTitle };

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={shareImage.url} />
      <meta property="og:image:width" content={String(shareImage.width)} />
      <meta property="og:image:height" content={String(shareImage.height)} />
      <meta property="og:image:alt" content={shareImage.alt} />
      <meta name="twitter:card" content="summary_large_image" />
      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
  );
}
