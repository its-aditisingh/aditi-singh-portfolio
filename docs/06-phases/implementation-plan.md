# Implementation Plan

Build in this order. Each phase ends in a working, deployable state. Tick boxes as you go.

## Phase 0 — Project setup ✅ (29 Oct 2026)
- [x] Vite + React + TS scaffold written by hand in repo root (keeps `Certificate/` and `docs/`)
- [x] Install deps from [tech-stack](../00-overview/tech-stack.md); exact versions pinned (`--save-exact`)
- [x] `tsconfig` strict + `noUncheckedIndexedAccess` + `@/` alias (split: `tsconfig.app.json` / `tsconfig.node.json`)
- [x] Tailwind + PostCSS; ESLint (flat config) + Prettier (+ tailwind plugin); Vitest + RTL + jsdom
- [x] `git init`, `.gitignore` (also ignores `Certificate/`), `.env.example`, `vercel.json`
- [x] Folder skeleton per [folder-structure](../02-architecture/folder-structure.md) (`.gitkeep` in empty dirs)
- [x] `three` / `@react-three/*` routed to a separate `three` chunk in `vite.config.ts`

**Done when:** `npm run dev`, `npm run build`, `npm run test`, `npm run lint` all pass on an empty app. → **All pass.** Initial JS 46 KB gzip.

Notes:
- npm 11 blocks install scripts for `esbuild` and `sharp`; both work from prebuilt binaries (verified: build runs, sharp reads images).
- `npm audit --omit=dev`: 2 moderate in `react-router` 6.x (open redirect via user-supplied paths; SSR hydration). Not exploitable here — we navigate only to our own static slugs and don't use SSR. Fixed only in v7; revisit if upgrading.
- Dev-only advisories (sharp/libvips, esbuild dev server, vitest, postcss) don't ship to users; sharp only processes our own files.

## Phase 1 — Design system & layout shell ✅ (29 Oct 2026)
- [x] Tokens in `globals.css` (light + `.dark`, RGB triplets), self-hosted variable fonts, Tailwind mapping
- [x] Theme toggle + no-flash inline script in `index.html`; follows OS until the visitor chooses
- [x] UI primitives: `Button` (button / router link / anchor), `IndexCard`, `Badge`, `Chip`, `SectionHeading`, `FilterTabs`, `CopyButton`
- [x] `RootLayout`: `Navbar` (hide-on-scroll, `layoutId` pill), `MobileMenu` (portal, focus trap, scroll lock), `Footer`, `ScrollProgress`, `AnimatedOutlet` page transitions, `Seo`, skip link, page backdrop
- [x] Router with all routes → placeholder pages (`PagePlaceholder`, `DetailPlaceholderPage`); 404
- [x] Resume copied to `public/resume/Aditi-Singh-Resume.pdf` (Q12)

**Done when:** all 7 nav links work on mobile + desktop, theme persists, [layout spec](../03-features/00-layout-and-navbar.md) criteria pass. → 10 tests pass (nav order, active state on detail route, navigation, resume link, mobile menu Esc + focus return + scroll lock, close on link, theme persistence, 404, detail back-link). Initial JS 128 KB gzip.

Notes:
- Primary button uses `--accent-btn` (#C94410) instead of `--accent` for AA contrast — see design-system.
- Test env shim in `src/test/setup.ts` strips `signal` from `Request` (jsdom AbortSignal vs Node fetch); test-only.
- Not yet verified by eye in a real browser — do a quick visual pass with `npm run dev` (light/dark, 360px / 1280px).

## Phase 2 — Data layer & assets ✅ (29 Oct 2026)
- [x] `src/types/index.ts` per [data-model](../02-architecture/data-model.md) (see "As implemented" there)
- [x] `scripts/generate-images.mjs` (`npm run images`, sharp + pdf-to-img): 14 certificates + GOER + internship (rotated upright)
- [x] Originals copied to `public/certificates/<slug>.<ext>` (16 files); resume in `public/resume/`
- [x] Profile photo (`photo2.jpeg`) → `aditi-portrait` (4:5, 480/800) + `aditi-avatar` (1:1, 256)
- [x] 4 GOER event photos → `src/assets/achievements/goer-2025-*` (800/1600, q78)
- [x] OG image 1200×630 → `public/og-image.png`
- [x] Project screenshots: downloaded from the GitHub repos (18 PNGs, no live-site capture needed) → 17 WebP in `src/assets/projects/` (architecture diagram skipped — contradicts the real model)
- [x] `src/data/*.ts` filled from [05-content](../05-content/): profile, education, skills, journey, projects (4), certificates (14), achievements (6), experience (2), highlights
- [x] Data-integrity tests (20): slugs, counts, category counts, alt text, files exist, no placeholders, ISO dates, sort order, cross-links, privacy scan

**Done when:** tests green; `certificates.length === 14`. → 30/30 tests pass. Initial JS 130 KB gzip. Visually checked: Saylor & ISRO PDF renders, rotated internship certificate, portrait/avatar crops, OG image.

Notes:
- Mind Scan facts (98.41% accuracy, 945 patients, RF 300 trees…) come from the app's own screens in the repo screenshots.
- `Certificate/` and `assets-src/` are git-ignored; regenerate with `npm run images` only on a machine that has them.

## Phase 3 — Home & About (static first) ✅ (29 Oct 2026)
- [x] Home hero (badge, name, role, headline, objective, Get In Touch + Resume CTAs, socials) — role shows the first role + full list for screen readers (the reduced-motion form of the rotator)
- [x] Stats strip (final values; count-up in Phase 7), Explore grid with descriptions
- [x] Hero photo in arch frame + availability badge; static neural-network SVG (`HeroFallback`) behind it — becomes the WebGL fallback in Phase 6
- [x] About bento (12 tiles, explicit `lg:` placement, DOM order = mobile spec order): Intro + photo, MCA, BCA, Technical Skills, Currently Learning (4 → "Show all 6"), Teaching Competencies, Research, Engagements, Languages, Teaching Philosophy, Open To, Classroom ⟷ Industry (`CompareColumns`, static)
- [x] My Journey timeline (vertical mobile / horizontal scroll-snap md+, edge fade + "Scroll →" hint)
- [x] `/about#education`-style links scroll to the target after the page transition (`useScrollToHash`)
- [x] Shared pieces: `ResponsiveImage` (srcSet, lazy/eager + fetchpriority), `SocialLinks`, `SectionHeading id`

**Done when:** [home](../03-features/01-home.md) + [about](../03-features/02-about.md) content criteria pass (animation criteria in Phase 7). → 40/40 tests (10 new page tests). Initial JS 140 KB gzip. Visually checked with headless Chrome at 1280px and 390px (390px via iframe — Chrome windows can't go below ~500px): no horizontal overflow.

Notes:
- Q11 resolved with the default: Home stat "5+ months".
- `HeroFallback` builds its network from a seeded PRNG, so it's identical on every render.

## Phase 4 — Collections + detail views ✅ (29 Oct 2026)
- [x] `DetailShell` (modal + page modes): portal dialog, focus trap, Esc / ✕ / backdrop / Back close, body-scroll lock, `DetailTitle` (h1 page / h2 modal), Prev/Next
- [x] Modal-route logic: detail routes are **children** of their list route; `CollectionRoute` renders list + modal (from a list click) or the detail alone as a page (direct/refresh). A per-session token in history state makes a refreshed URL render as a page. `preventScrollReset` keeps the list's scroll; Prev/Next in the modal use `replace` so Back/Esc returns straight to the list
- [x] Focus traps are stack-aware: Esc in the lightbox closes only the lightbox
- [x] Projects list (filter tabs, featured full-width) + detail (links, cursor-tour pins, metrics, overview, dataset, pipeline, features, before/after slider, grouped stack, screenshot gallery, results, future scope; confidential note for the internship)
- [x] Certificates list (category tabs with counts, sort, both in the URL; filtered list survives behind the modal) + detail (zoomable image, meta rows, credential copy, Verify, View PDF/original)
- [x] Achievements list (GOER hero tile with photo + tilted certificate) + detail (metric, story, skills, related link, proof, masonry photo gallery)
- [x] Experience timeline (alternating on lg) + detail (computed duration, facts, checklist, skills, certificate quote, Classroom ⟷ Industry, proof + ID copy)
- [x] `Lightbox` (←/→, counter, captions), `Gallery`, `ZoomableImage`; static `PipelineSteps`, `CursorTour` (pins), working `BeforeAfter` (native range input)
- [ ] Shared-element `layoutId` card → modal — **moved to Phase 7** (pure animation polish; needs visual tuning)

**Done when:** every item opens via click **and** direct URL; refresh on a detail URL works; feature specs 03–06 criteria pass. → 63/63 tests (17 collection + 6 lib tests new). Visually checked via a CDP screenshot script (real clicks, exact 390px viewport): modal, mobile bottom sheet, lightbox, all list and detail pages.

Notes:
- Moved to Phase 7 with the other animations: certificate shuffle deck (#04), number roll (#10), cursor animation (#07), pipeline/timeline draw (#08), card tilt + glare, certificate flip-in, filter reflow.
- Certificate "zoom / pan": the lightbox shows the 1600px image fit-to-screen; free panning isn't implemented (not needed at that size).
- With two items (Experience), Prev/Next shows only "Next" — both would point at the same item.
- Initial JS is 156 KB gzip — route-level code splitting is planned for Phase 8.

## Phase 5 — Contact ✅ code complete (29 Oct 2026) · ⏳ live check needs the Web3Forms key
- [x] Form (Name, Email, Subject optional, Message with counter) + validation on blur and submit, `aria-invalid` / `aria-describedby`, focus moves to the first invalid field
- [x] Honeypot (`botcheck`): ticked → pretend success, nothing sent
- [x] Web3Forms POST (`src/lib/contact.ts`), 15 s timeout, double-submit blocked, error message with email fallback + "Try again", form resets 2 s after success
- [x] `SuccessButton` (#12 base): idle → Sending… → Message sent! / Try again, shake on error; width morph + confetti in Phase 7
- [x] No `VITE_WEB3FORMS_KEY` → form hidden, "Email Aditi" button instead (+ console warning in dev)
- [x] Direct links: email + copy, LinkedIn, GitHub, location; phone only masked and only if `showPhone`
- [x] "Open to" card; on mobile the form comes right after the contact details

**Done when:** a real test message arrives in Aditi's inbox. → **Pending:** needs a free key from web3forms.com (sent to Aditi's email). Put it in `.env` locally and in Vercel env vars, then send one test message. All other behaviour is covered by 7 tests with a mocked `fetch` (70/70 total) and checked visually at 1280px and 390px.

## Phase 6 — 3D hero ✅ (29 Oct 2026)
- [x] `HeroCanvas` gating: reduced motion, no WebGL, Save-Data / 2G → SVG only; otherwise mounts after `requestIdleCallback` (setTimeout fallback for Safari) and crossfades from the SVG once the first frame is drawn; `SceneErrorBoundary` keeps the SVG if WebGL fails at runtime
- [x] `NeuralScene` (lazy `<Canvas>`, dpr 1–1.75) + `NeuralBrain`: 1,400 nodes on two hemispheres (`network.ts`, seeded), 2-nearest-neighbour lines, 24 pulses walking the graph, idle spin + breathing, pointer tilt (±0.25 rad), pointer glow/push and click ripple in a custom point shader (`shaders.ts`)
- [x] Theme-aware: accent colours read from CSS vars; normal blending on light, additive on dark
- [x] Off-screen / hidden-tab pause (`frameloop="never"` via IntersectionObserver + visibilitychange); mobile tier 700 nodes / 12 pulses; ≤ 4 cores → no pulses
- [x] `HeroFallback` SVG (shares the seeded PRNG in `src/lib/random.ts`)
- [x] Removed `manualChunks` (it made the entry modulepreload all of three.js) and the unused `@react-three/drei` dependency

**Done when:** 55–60 fps on a mid-range laptop, three chunk not in initial bundle, Lighthouse perf still ≥ 90. → Measured in Chrome via CDP on this laptop's **Intel UHD 620**: **60 fps**; WebGL draw calls 183/s on screen → **0/s** scrolled away → 183/s back. three.js only in the lazy `NeuralScene` chunk (221 KB gzip), no modulepreload, entry 159 KB gzip. Reduced motion: no canvas and the chunk is never requested. 390px: no horizontal overflow. **Lighthouse not run yet — part of Phase 8.**

Notes:
- Not built (S priority in the spec): dark-mode bloom post-processing; scroll-linked scale/fade of the scene.
- The pointer is tracked at window level because the photo covers the canvas; clicks on the photo fire the ripple.

## Phase 7 — Animations (the 12 patterns) & polish ✅ (29 Oct 2026)
- [x] 01 `RevealText` (per-letter mask rise; hero lines stagger after it) · 02 `WordRotator` (blur slide, width morph, underline sweep, pauses off-screen/hidden tab) · 03 `HighlightPings` (one toast at a time, pauses on hover)
- [x] 04 `ShuffleDeck` (5 featured certs; auto every 3.5 s, buttons, ←/→, swipe; back cards show surface only) · 05 `CountUp` (Home stats + MCA/BCA) · 06 bento build (About grid, Home explore grid via shared `bentoItem` / `staggerParent`)
- [x] 07 `CursorTour` (cursor visits pins with ripple + label, "Replay tour") · 08 pipeline draw (`PipelineSteps`) + scroll-linked Experience line with popping nodes · 09 `BeforeAfter` first-view nudge 50→62→50
- [x] 10 `NumberRoll` (project metrics, certificate grade/duration, achievement metrics) · 11 `CompareColumns` (rows reveal, ticks draw) · 12 `SuccessButton` (shrinks to a spinner circle, green ✓, 16-particle confetti, shake on error)
- [x] `TiltCard` (≤6° + glare, mouse only) on project & certificate cards, `Magnetic` on "Get In Touch", certificate flip-in, `SectionHeading` type-in reveal, filter reflow (`layout` + `AnimatePresence`), floating hero photo
- [x] Card → modal: **container transform** (panel grows from the clicked card's rect, `src/lib/modalOrigin.ts`) instead of a `layoutId` shared element — the card stays mounted in the list while the modal lives in a portal, which `layoutId` doesn't handle cleanly
- [x] Reduced-motion pass on every pattern

**Done when:** [animation-spec](../04-design/animation-spec.md) table fully implemented incl. fallbacks. → 77/77 tests (new: shuffle-deck keyboard/buttons; `IntersectionObserver` mocked in jsdom). Verified in Chrome via CDP: role rotates (Assistant Professor → AI/ML Engineer), count-up mid-value 53 → 95, deck auto-advances 1 → 2, all 4 cursor-tour labels appear, contact success with a mocked Web3Forms response (no real email). Reduced motion: no canvas, no pings, role static, stats final, deck doesn't auto-play but buttons work. 390px: no horizontal overflow.

Notes:
- `DrawPath` as a separate component wasn't needed: the timeline uses a scroll-linked `scaleY` line, the pipeline animates in `PipelineSteps`. The About journey rail stays static (its cards fade up in sequence).
- Initial JS grew to 169 KB gzip (budget 200 KB) — route-level splitting is next, in Phase 8.

## Phase 8 — SEO, accessibility, performance ✅ mostly (29 Oct 2026)
- [x] Route-level code splitting: every page except Home is a React Router `lazy` route (entry 169 → 143 KB gzip; pages 1–5 KB each). `HydrateFallback` for direct deep links, `NavigationProgress` bar while a chunk loads
- [x] SEO: site-wide share card + canonical in static `index.html` (`data-rh`, filled with `%SITE_URL%` at build — link previews don't run JS); per-page title/description/canonical/OG via `Seo` (detail pages use their own image); JSON-LD `Person` on Home; `sitemap.xml` (33 URLs, slugs read from `src/data`) and `robots.txt` emitted at build; `<noscript>` contact line
- [x] Accessibility: axe-core 4.14 in real Chrome on all 12 routes × light/dark + modal + mobile menu → **0 violations** (WCAG 2.1 A/AA + best practice). Fixed: logo link name (label-in-name), heading order (cards h2; detail sub-headings follow modal/page mode), modal `<article>` (no duplicate banner), filter-count contrast
- [x] Performance, found by CPU profiling at 4× throttle (not guesswork):
  - Framer `useScroll` re-measured the page every frame → replaced with `useScrollY` / `usePageProgress` / `useElementProgress` (`src/hooks/useScrollMotion.ts`), which read layout only after a real scroll/resize
  - `layoutId` pills (nav, filter tabs) and `layout` on WordRotator / list items kept Framer's projection re-measuring every frame → CSS sliding pill (`useSlidingIndicator`), no width morph, plain enter/exit on filter changes. Home main-thread JS during load: **12.5 s → 3.0 s** (4× throttle)
  - 3D scene: loads on first interaction on phones; on desktop after `load` + 1.5 s + idle (or on interaction). WebGL support is probed only at mount time
  - LCP images (deck top card, project cover) eager + `fetchpriority="high"`; certificates gained an 800 px size so phones don't fetch the 1600 px one
- [ ] Keyboard + NVDA screen-reader walkthrough — **needs a person**; automated: focus-trap/Esc/focus-return tests + axe
- [ ] Lighthouse ≥ 90 on all three pages — see results below

**Lighthouse (mobile, simulated 4G, median of 2 on a quiet machine):**

| Page | Perf | A11y | BP | SEO | LCP | TBT | CLS |
|---|---|---|---|---|---|---|---|
| `/` | **90** | 100 | 100 | 100 | 2.4 s | ~285 ms | 0 |
| `/projects/mind-scan-analyzer` | 88–89 | 100 | 100 | 100 | 2.9 s | ~210 ms | 0.02 |
| `/certificates` | 83–84 | 100 | 100 | 100 | 3.4 s | ~280 ms | 0 |
| `/` (desktop preset) | 90 | 100 | 100 | 100 | 0.6 s | 260 ms | 0.02 |

Notes:
- Measurements on this laptop swing a lot with background load (same page: 70 → 90). Re-check on the deployed site with PageSpeed Insights (Phase 9).
- Certificates/project LCP is mostly the direct-visit waterfall: entry JS → lazy page chunk → render → image. Options if needed: make Certificates eager (+~5 KB entry), or prerender routes (v2).
- Per-page share previews only work for crawlers that run JS; link-preview bots see the site-wide card. Prerendering would fix that (v2).
- Test infra: `renderRoute` is async (waits for lazy routes), Testing Library async timeout 3 s, Vitest test timeout 10 s; `IntersectionObserver`/`ResizeObserver` mocked in jsdom. 83 tests.

## Phase 9 — Deploy ✅ live (29 Oct 2026) — **https://its-aditisingh-portfolio.vercel.app**
- [x] Pushed to GitHub: https://github.com/its-aditisingh/aditi-singh-portfolio (`main`)
- [x] Vercel project (auto-detected Vite), SPA rewrite works (direct deep links return 200 and render as pages)
- [x] Env vars `VITE_WEB3FORMS_KEY` and `VITE_SITE_URL` — must be type **Config**, not Secret: Vercel blocks `VITE_*` secrets because Vite inlines them into the browser bundle (the Web3Forms key is public by design). A saved Secret can't be switched to Config — delete and re-add. Redeploy after any change.
- [x] Verified live: share card, canonical and sitemap (33 URLs) use the real domain; Web3Forms key is in the Contact chunk and the form shows; 3D mounts on desktop; no broken images; phone number not in the JS
- [ ] Send one real test message from the live Contact form and confirm it reaches adytisingh@gmail.com
- [ ] Check scores on PageSpeed Insights (Google's servers — this laptop's Lighthouse swings ±10). Local Lighthouse on the live site: `/` 79, `/certificates` 85, A11y/BP/SEO 100
- [ ] Final content review **with Aditi** (✎ items in `05-content/`)
- [ ] Add the portfolio link to resume, LinkedIn, GitHub profile

## Revision 1 — owner feedback ✅ (31 Oct 2026)
- [x] Hero: only **Aspiring Assistant Professor** (rotator + WordRotator removed); badge "Open to Assistant Professor roles in Computer Science"; titles and share card updated. About's "Open to" list unchanged (owner).
- [x] Research interests above the hero buttons; buttons now Get In Touch · Projects · Resume
- [x] New **Research** page + nav item ([spec](../03-features/08-research.md)); 2-page Mind Scan methodology PDF (`npm run research:pdf`); reading notes ready for Aditi's summaries (Q18)
- [x] Achievements: grade repeats removed (MCA, BCA, Saylor, AWS); Anchor gets 6 photos and a photo tile
- [x] Projects: generic internship project replaced by the GitHub ML repos (Cancer Variant Prioritization, Tesla Stock Price Prediction)
- [x] **Every project shows its dataset & source** (`ProjectDataset`, required; data test)
- [x] ~~Mind Scan: demo-model scores (98.41%) removed~~ — reverted in revision 2
- [x] AWS training starts March 2025; same-month ranges show one month, no "0 months"
- [x] `npm run images`: checks all sources before deleting anything (a renamed file had wiped the outputs mid-run)

## Revision 2 — owner feedback ✅ (31 Oct 2026)
- [x] AWS training **Feb 2025 – May 2025** (3 months); journey item "May 2025"
- [x] Reading notes: 3 paper summaries (ASD EEG CNN–LSTM, XAI for Healthcare 5.0, SSL survey)
- [x] Datasets: cancer variant → Kaggle (punithpunk, verified); Tesla → "Downloaded from Kaggle" (exact page pending, Q15)
- [x] Mind Scan 98.41% / macro F1 0.98 restored (owner-confirmed, viva); methodology PDF section 5 now reports results with a per-class table

## Rough effort
| Phase | Estimate |
|---|---|
| 0–1 | 1 day |
| 2 | 0.5–1 day |
| 3 | 1 day |
| 4 | 2 days |
| 5 | 0.5 day |
| 6 | 1–1.5 days |
| 7 | 2 days |
| 8–9 | 1 day |
| **Total** | **~9–10 working days** |
