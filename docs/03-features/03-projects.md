# Feature: Projects

Covers FR-C1 … FR-C5, FR-C8. Content: [05-content/projects.md](../05-content/projects.md).

## List page `/projects`
- Heading + one-line intro.
- Filter chips: All · AI / ML · Data Analytics (hidden if only one category has items).
- Grid: 1 col mobile, 2 cols ≥ 768px. Featured project (Mind Scan Analyzer) spans full width on desktop.
- **ProjectCard:** cover image (or gradient + icon fallback), mono index `01`, category badge, title, tagline, 3–4 tech chips, Live/GitHub mini icons. Whole card is the click target (link to detail, with modal state). Hover: 3D tilt (max 6°) + cover zoom 1.04.

## Detail `/projects/:slug`
Order of sections:

1. **Header** — title, tagline, context (e.g. "MCA Final Year Project"), category, period. Buttons: **Live Demo**, **GitHub**.
2. **Cover / hero screenshot** with **#07 Cursor tour** — animated cursor visits `cursorTour` hotspots with labels (plays once when in view; "Replay" button).
3. **Overview** — problem → solution.
4. **Pipeline** — **#08 Process draw**: horizontal (desktop) / vertical (mobile) step diagram from `pipeline[]`; connector lines draw in sequence, each node pops.
5. **Key features** — icon list.
6. **Before / After** — **#09** slider, only if `beforeAfter` exists.
7. **Tech stack** — chips grouped.
8. **Screenshots gallery** — click to zoom (lightbox), arrow keys navigate.
9. **Results** — only if `results` has verified items.
10. **Future scope** — list.
11. **Prev / Next** project.

## Acceptance criteria
- [ ] All 4 projects render list + detail (internship project shows the "confidential" note and links to its Experience entry instead of Live/GitHub) with no empty sections (sections with no data are omitted).
- [ ] Live Demo / GitHub open in a new tab with `rel="noopener noreferrer"`.
- [ ] Cursor tour and pipeline respect reduced motion (static labels shown instead).
- [ ] Direct visit to `/projects/mind-scan-analyzer` renders full page; from list it opens as modal with shared-element expand.
