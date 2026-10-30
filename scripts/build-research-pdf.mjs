// Builds the research PDFs from their HTML sources with headless Chrome.
//
//   npm run research:pdf
//
// Set CHROME_PATH if Chrome isn't at the default Windows location.

import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const CHROME =
  process.env.CHROME_PATH ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe';

const documents = [
  {
    source: 'research/mind-scan-analyzer-methodology.html',
    output: 'public/research/mind-scan-analyzer-methodology.pdf',
  },
];

if (!existsSync(CHROME)) {
  throw new Error(`Chrome not found at ${CHROME} — set CHROME_PATH.`);
}

for (const doc of documents) {
  const output = join(ROOT, doc.output);
  mkdirSync(dirname(output), { recursive: true });
  execFileSync(CHROME, [
    '--headless=new',
    '--disable-gpu',
    '--no-pdf-header-footer',
    `--print-to-pdf=${output}`,
    pathToFileURL(join(ROOT, doc.source)).href,
  ]);
  console.log(`✓ ${doc.output}`);
}
