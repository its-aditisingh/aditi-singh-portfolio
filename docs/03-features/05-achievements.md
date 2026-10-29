# Feature: Achievements

Covers FR-C1 … FR-C5, FR-C9. Content: [05-content/achievements.md](../05-content/achievements.md).

## List page `/achievements`
- Hero tile for the top achievement (**National GOER 2025 — Finalist & Team Leader**) spanning full width: stage photo as background (dark gradient overlay for text contrast), certificate thumbnail tilted in the corner, big title, "Team Leader · PG Category · IRM India Affiliate", date, "4 photos" chip.
- Remaining achievements in the **numbered card** style from the reference (mono index `02`, orange icon top-right, bold title bottom, one-line summary). 1 / 2 / 3 columns.
- Cards with a `metric` show it large (e.g. **95%**) using **#10 Number roll** when in view.
- Category chips on each card: Competition · Academic · Leadership · Speaking.

## Detail `/achievements/:slug`
1. Header — icon, title, organisation, date, role badge.
2. Metric (if any) — **#10 Number roll**.
3. Story — 2–3 short paragraphs: what it was, what she did, outcome.
4. Skills demonstrated — chips.
5. Proof — certificate image (click to zoom) + View PDF.
6. Photos — masonry gallery (GOER has 4), click → lightbox with caption, ←/→ keys, swipe on mobile.
7. Prev / Next.

## Acceptance criteria
- [ ] 6 achievements; GOER is first and visually dominant.
- [ ] Every achievement that has proof links to it; academic-score achievements link to the Education tile on About instead.
- [ ] No duplication: GOER certificate appears here, **not** in Certificates.
