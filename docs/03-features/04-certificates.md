# Feature: Certificates

Covers FR-C1 … FR-C7, FR-C12. Content: [05-content/certificates.md](../05-content/certificates.md) (14 certificates).

## List page `/certificates`

### 1. Featured deck (**#04 Review shuffle**)
- Stack of the 5 `featured` certificates (Saylor ML, Kaggle Deep Learning, ISRO IIRS, Anudip AWS, GfG Data Science).
- Top card shows thumbnail + title + issuer. Every 3.5s (or on click / swipe / → key) the top card flies to the back and the stack shuffles up.
- Click the top card's "View" → opens its detail.
- Desktop: deck on the right, intro + count ("14 certificates · 386+ learning hours") on the left. Mobile: deck above grid, swipe enabled.

### 2. Filters & sort
- `FilterTabs`: All (14) · AI & ML (6) · Data Science (1) · Cloud (1) · Programming & Web (3) · Workshops (1) · Other (2). Counts computed from data. Animated underline (`layoutId`).
- Sort: Newest first (default) / Oldest first.
- URL sync: `?category=ai-ml` so filters are shareable.
- Changing filter: cards animate with `layout` + `AnimatePresence` (fade/scale).

### 3. Grid
- 1 / 2 / 3 columns (mobile / tablet / desktop).
- **CertificateCard:** thumbnail (aspect 4:3, `object-cover`), issuer logo/name, title (2-line clamp), date, category badge. Hover: CSS 3D tilt + glare sweep.

## Detail `/certificates/:slug`

```text
┌───────────────────────────────┬─────────────────────────┐
│                               │ CATEGORY BADGE          │
│   CERTIFICATE IMAGE           │ Title                   │
│   (click → zoom / pan)        │ Issuer · Platform       │
│   3D flip-in on open          │                         │
│                               │ Issued     22 Oct 2026  │
│                               │ Duration   19 hours     │  ← #10 Number roll
│                               │ Grade      96.00 %      │  ← #10 Number roll
│                               │ Credential 1911370930AS [copy]
│                               │                         │
│                               │ Skills: chip chip chip  │
│                               │ Description             │
│                               │ [Verify ↗] [View PDF ↗] │
├───────────────────────────────┴─────────────────────────┤
│ ← Prev                                          Next →  │
└──────────────────────────────────────────────────────────┘
```
- Fields not present on a certificate are omitted (e.g. Kaggle has no ID/grade).
- **Copy** credential → button morphs to "Copied ✓" for 1.5s (small **#12** reuse).
- `Verify` only if `verifyUrl`; `View PDF` always (opens `/certificates/<slug>.<ext>` in new tab).

## Acceptance criteria
- [ ] Exactly 14 certificates, counts in tabs correct.
- [ ] Filter + sort combinations work and are reflected in the URL.
- [ ] Every thumbnail loads (no broken image); lazy below fold.
- [ ] Credential copy works (Clipboard API with fallback).
- [ ] Shuffle deck pauses on hover/focus, keyboard operable (← →), and is static under reduced motion.
