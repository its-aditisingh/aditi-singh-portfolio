// Converts the original documents/photos into responsive WebP assets.
//
//   npm run images
//
// Inputs (git-ignored, local only):  Certificate/   assets-src/
// Outputs (committed):               src/assets/**  public/certificates/**  public/og-image.png
//                                    src/data/images.generated.ts  (typed manifest: src, srcSet, width, height)
//
// Content decisions behind each job: docs/05-content/*.md

import { copyFile, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { pdf } from 'pdf-to-img';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const CERT = 'Certificate';
const SRC = 'assets-src';
const ASSETS = 'src/assets';
const MANIFEST = 'src/data/images.generated.ts';

const W = {
  certificate: [400, 800, 1600],
  photo: [800, 1600],
  screenshot: [800, 1600],
  diagram: [600, 1024],
};

/**
 * key      → output path under src/assets (without extension) and manifest key
 * src      → source file
 * page     → PDF page (1-based)
 * rotate   → clockwise degrees
 * extract  → crop box in source pixels (after rotation)
 * publish  → copy the original to public/<publish> for "View PDF"
 */
const jobs = [
  // ---- Certificates (docs/05-content/certificates.md)
  cert('saylor-cs207-fundamentals-of-ml', '1911370930AS.pdf', { page: 2 }),
  cert('isro-iirs-tropical-cyclone-workshop', 'ISRO IIRS Certificate.pdf'),
  cert('kaggle-feature-engineering', 'kagle-feature engineering.jpeg'),
  cert('kaggle-time-series', 'kagle-time series.jpeg'),
  cert('kaggle-intro-to-deep-learning', 'kagle-intro to deep learning.jpeg'),
  cert('kaggle-intermediate-machine-learning', 'kagle-intermediate machine learning.jpeg'),
  cert('kaggle-intro-to-machine-learning', 'kagle intro to machine learning.jpeg'),
  cert('udemy-python-flask', 'Udemy Python+Flask.pdf'),
  cert('udemy-java-masterclass', 'Udemy Java Course.pdf'),
  cert('udemy-html-css', 'Udemy HTML+CSS Certificate.pdf'),
  cert('udemy-social-media-marketing', 'Udemy Social Media.pdf'),
  cert('udemy-advanced-ms-word', 'Udemy MS Word Course.pdf'),
  cert('anudip-aws-advanced-program', 'aws-certificate.jpeg'),
  cert('gfg-data-science-bootcamp', 'Data Science Certificate.pdf'),
  // Proof documents for Achievements / Experience
  cert('goer-2025', 'GOER 2025 certificate.pdf'),
  // Scan is sideways (page top points right) → rotate 90° counter-clockwise
  cert('shanti-infosoft-internship', 'internship-certificate.jpeg', { rotate: 270 }),

  // ---- Profile (docs/05-content/profile.md#photo)
  {
    key: 'profile/aditi-portrait',
    src: `${CERT}/photo2.jpeg`,
    extract: { left: 0, top: 120, width: 976, height: 1220 },
    widths: [480, 800],
  },
  {
    key: 'profile/aditi-avatar',
    src: `${CERT}/photo2.jpeg`,
    extract: { left: 245, top: 200, width: 540, height: 540 },
    widths: [256],
  },

  // ---- GOER 2025 event photos (docs/05-content/achievements.md)
  photo('goer-2025-stage', 'WhatsApp Image 2026-10-29 at 12.25.21 AM.jpeg'),
  photo('goer-2025-strategy-1', 'WhatsApp Image 2026-10-29 at 12.25.19 AM.jpeg'),
  photo('goer-2025-strategy-2', 'WhatsApp Image 2026-10-29 at 12.25.20 AM.jpeg'),
  photo('goer-2025-venue', 'WhatsApp Image 2026-10-29 at 12.25.20 AM (1).jpeg'),

  // ---- Project screenshots from the GitHub repos (docs/05-content/projects.md)
  shot('mind-scan-home', 'mind-scan/MindScan-Analyzer-Homepage.png'),
  shot('mind-scan-upload', 'mind-scan/Prediction-Interface.png'),
  shot('mind-scan-run-prediction', 'mind-scan/Run-prediction.png'),
  shot('mind-scan-performance', 'mind-scan/Model-Performance.png'),
  shot('mind-scan-insights', 'mind-scan/Model-Insights.png'),
  shot('mind-scan-dataset', 'mind-scan/Dataset.png'),
  shot('mind-scan-workflow', 'mind-scan/Project_Workflow.png', W.diagram),
  // System_Architecture.png is intentionally skipped: it shows CNN/LSTM and a "Relaxed 92%" output,
  // which contradicts the actual Random Forest, 7-class app (docs/05-content/projects.md)
  shot('eeg-patient-overview', 'eeg-dashboard/EEG-Patient-Overview.png'),
  shot('eeg-demographic-overview', 'eeg-dashboard/Demographic-Overview.png'),
  shot('eeg-disorder-analysis', 'eeg-dashboard/Disorder-Analysis.png'),
  shot('eeg-signal-analysis', 'eeg-dashboard/EEG-Signal-Analysis.png'),
  shot('cancer-executive-overview', 'cancer-dashboard/Executive-overview-dashboard.png'),
  shot('cancer-clinical-significance', 'cancer-dashboard/Clinical-significance-deepdrive-dashboard.png'),
  shot('cancer-gene-chromosome', 'cancer-dashboard/GeneandChromosome-analysis-dashboard.png'),
  shot('cancer-variant-risk', 'cancer-dashboard/Variant-risk-Assessment-dashboard.png'),
  shot('cancer-predictive-evidence', 'cancer-dashboard/Predictive-evidence-dashboard.png'),
  shot('cancer-research-discovery', 'cancer-dashboard/research-discovery.png'),
];

function cert(slug, file, opts = {}) {
  const src = `${CERT}/${file}`;
  return {
    key: `certificates/${slug}`,
    src,
    widths: W.certificate,
    publish: `certificates/${slug}${extname(file).toLowerCase()}`,
    ...opts,
  };
}

function photo(name, file) {
  return { key: `achievements/${name}`, src: `${CERT}/${file}`, widths: W.photo, quality: 78 };
}

function shot(name, file, widths = W.screenshot) {
  return { key: `projects/${name}`, src: `${SRC}/projects/${file}`, widths };
}

async function loadSource(job) {
  const path = join(ROOT, job.src);
  if (!existsSync(path)) throw new Error(`Missing source: ${job.src}`);
  if (extname(path).toLowerCase() !== '.pdf') return readFile(path);
  const doc = await pdf(path, { scale: 2.5, docInitParams: { standardFontDataUrl: FONT_DIR } });
  return doc.getPage(job.page ?? 1);
}

// pdf-to-img builds this path with backslashes on Windows, which pdfjs can't load — pass a POSIX one
const FONT_DIR = `${join(ROOT, 'node_modules/pdfjs-dist/standard_fonts').replace(/\\/g, '/')}/`;

async function processJob(job) {
  let base = sharp(await loadSource(job)).rotate(job.rotate);
  if (job.extract) base = sharp(await base.toBuffer()).extract(job.extract);
  const buffer = await base.toBuffer();
  const { width: srcWidth } = await sharp(buffer).metadata();

  // Never upscale; collapse sizes that would end up identical
  const widths = [...new Set(job.widths.map((w) => Math.min(w, srcWidth)))];
  const outputs = [];
  for (const width of widths) {
    const rel = `${job.key}-${width}.webp`;
    const out = join(ROOT, ASSETS, rel);
    await mkdir(dirname(out), { recursive: true });
    const info = await sharp(buffer)
      .resize({ width })
      .webp({ quality: job.quality ?? 80, effort: 5 })
      .toFile(out);
    outputs.push({ rel, width: info.width, height: info.height, kb: Math.round(info.size / 1024) });
  }

  if (job.publish) {
    const dest = join(ROOT, 'public', job.publish);
    await mkdir(dirname(dest), { recursive: true });
    await copyFile(join(ROOT, job.src), dest);
  }
  return { job, outputs };
}

function manifestSource(results) {
  const imports = [];
  const entries = [];
  results.forEach(({ job, outputs }, i) => {
    const names = outputs.map((o) => {
      const name = `img${i}w${o.width}`;
      imports.push(`import ${name} from '@/assets/${o.rel}';`);
      return { ...o, name };
    });
    const largest = names[names.length - 1];
    const srcSet = names.map((n) => `\${${n.name}} ${n.width}w`).join(', ');
    entries.push(
      `  '${job.key}': { src: ${largest.name}, srcSet: \`${srcSet}\`, width: ${largest.width}, height: ${largest.height} },`,
    );
  });
  return [
    '// AUTO-GENERATED by scripts/generate-images.mjs (`npm run images`) — do not edit by hand.',
    ...imports,
    '',
    'export const images = {',
    ...entries,
    '} as const;',
    '',
    'export type ImageKey = keyof typeof images;',
    '',
  ].join('\n');
}

async function ogImage() {
  // 1200×630 share card: warm background, avatar, name, roles (NFR-S2)
  const avatar = await sharp(join(ROOT, CERT, 'photo2.jpeg'))
    .extract({ left: 255, top: 230, width: 520, height: 520 })
    .resize(360, 360)
    .composite([
      {
        input: Buffer.from('<svg width="360" height="360"><circle cx="180" cy="180" r="180"/></svg>'),
        blend: 'dest-in',
      },
    ])
    .png()
    .toBuffer();

  const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <defs><radialGradient id="g" cx="100%" cy="0%" r="80%">
      <stop offset="0" stop-color="#FFE9DD"/><stop offset="1" stop-color="#FBF7F3"/></radialGradient></defs>
    <rect width="1200" height="630" fill="url(#g)"/>
    <circle cx="930" cy="315" r="196" fill="#EA5A24"/>
    <text x="80" y="200" font-family="Segoe UI, Arial, sans-serif" font-size="26" fill="#6E655E" letter-spacing="3">PORTFOLIO</text>
    <text x="80" y="290" font-family="Segoe UI, Arial, sans-serif" font-size="84" font-weight="800" fill="#16130F">Aditi Singh</text>
    <text x="80" y="350" font-family="Segoe UI, Arial, sans-serif" font-size="34" font-weight="600" fill="#B8410F">MCA · AI/ML &amp; Data Science</text>
    <text x="80" y="410" font-family="Segoe UI, Arial, sans-serif" font-size="28" fill="#6E655E">Aspiring Assistant Professor · AI/ML Engineer</text>
    <rect x="80" y="470" width="96" height="6" rx="3" fill="#EA5A24"/>
  </svg>`;

  await sharp(Buffer.from(svg))
    .composite([{ input: avatar, left: 750, top: 135 }])
    .png({ compressionLevel: 9 })
    .toFile(join(ROOT, 'public', 'og-image.png'));
}

async function main() {
  // Start clean so renamed/removed jobs don't leave stale files behind
  for (const dir of ['certificates', 'profile', 'achievements', 'projects']) {
    await rm(join(ROOT, ASSETS, dir), { recursive: true, force: true });
  }
  await rm(join(ROOT, 'public', 'certificates'), { recursive: true, force: true });

  const results = [];
  for (const job of jobs) {
    const result = await processJob(job);
    results.push(result);
    const sizes = result.outputs.map((o) => `${o.width}×${o.height} ${o.kb}KB`).join(', ');
    console.log(`✓ ${job.key.padEnd(48)} ${sizes}`);
  }

  await writeFile(join(ROOT, MANIFEST), manifestSource(results));
  await ogImage();
  console.log(`\n${results.length} images → ${ASSETS}, manifest → ${MANIFEST}, og-image.png`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
