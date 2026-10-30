# Feature: Research (new, 31 Oct 2026)

Owner request: a Research section with research interests, a methodology write-up for Mind Scan Analyzer (1–2 page PDF) and short summaries of papers Aditi has read. Content: [05-content/research.md](../05-content/research.md).

## Route & nav
`/research` (lazy route) · nav item **Research** (icon `FlaskConical`) after About · section index `03` (later pages renumbered: Projects 04 … Contact 08) · included in the sitemap.

## Layout `/research`
1. Heading (h1) + one-line intro.
2. **Research interests** tile — accent chips, bento stagger.
3. **Write-ups** — one card per `WorkingPaper`: kind badge · date · pages · title · abstract · topic chips · **Read the PDF** (new tab) · link to the related project.
4. **Reading notes** — grid of `PaperNote` cards (venue · year · linked title · authors · summary · takeaways). **Rendered only when `paperNotes` is non-empty** (no placeholder text in production).
5. Contact nudge.

## PDF pipeline
HTML source in `research/*.html` (A4 print CSS) → `npm run research:pdf` (`scripts/build-research-pdf.mjs`, headless Chrome `--print-to-pdf`; `CHROME_PATH` overrides the default path) → `public/research/*.pdf`. Must stay ≤ 2 pages (checked by rendering with pdf-to-img).

## Home hero (related change)
Research interests appear as chips directly **above** the hero buttons, which are now **Get In Touch · Projects · Resume**.

## Acceptance criteria
- [x] Nav shows Research; `/research` renders on direct visit and from the nav.
- [x] PDF link opens `/research/mind-scan-analyzer-methodology.pdf` (file existence checked by data tests).
- [x] Reading notes: 3 papers (revision 2); hidden while empty; complete entries required when present (data test).
- [x] axe-clean headings: h1 page, h2 sections, h3 cards.
