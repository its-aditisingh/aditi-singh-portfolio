# Test Plan

## 1. Automated (Vitest + React Testing Library)

### Data integrity — `src/data/data.test.ts` (implemented, 20 tests)
| Test | Rule |
|---|---|
| Unique slugs | per collection, kebab-case regex `^[a-z0-9]+(-[a-z0-9]+)*$` |
| Counts | `certificates.length === 14`, `projects.length >= 4`, `achievements.length >= 6`, GOER has 4 photos |
| Privacy | no 10-digit phone number pattern (`/\b\d{10}\b/`, plus the owner's number in any spacing — assembled from parts inside the test so it never appears in the repo) in `src/` or in built `dist/**/*.{html,js,css}` — PDFs excluded (resume ships as-is, Q12) |
| Required fields | non-empty `title`, `summary`/`description`, `image.alt` |
| Files exist | every `fileUrl` exists under `public/`; every image import resolves |
| No placeholders | no string field contains `TBD`, `CONFIRM`, `lorem` |
| Dates | valid ISO (`YYYY-MM` or `YYYY-MM-DD`); lists sorted newest first |
| Category counts | certificates per category match [05-content](../05-content/certificates.md) |
| Cross-links | every ping `href` and achievement proof slug points to an existing route/item |

### Components
| Component | Tests |
|---|---|
| `Navbar` | renders 7 links in order; active state on `/certificates/x`; mobile menu opens/closes with Esc |
| `DetailShell` | modal mode traps focus, Esc calls close, focus returns to trigger; page mode renders back link |
| Detail routes | unknown slug renders not-found state |
| `FilterTabs` / Certificates page | selecting "Cloud" shows 1 card; URL param updates |
| `ContactForm` | validation messages; honeypot filled → no fetch; success + error paths (mock `fetch`) |
| `CountUp` / `NumberRoll` | with reduced motion mocked → shows final value immediately |
| `WordRotator` | reduced motion → only first role visible |
| `format.ts` | duration "Jan 2026 – Jun 2026", month formatting |

## 2. Manual QA checklist

### Functional
- [ ] Every nav link, CTA, social link, resume download
- [ ] Every card opens detail (click + Enter key); direct URL + refresh on each detail type
- [ ] Prev/Next wraps correctly; Back button closes modal
- [ ] Verify / View PDF links open correct files
- [ ] Contact form sends a real email

### Responsive (Chrome devtools + real phone)
- [ ] 320, 360, 390, 768, 1024, 1280, 1536 px — no horizontal scroll, no overlap
- [ ] Mobile menu, timeline layout, shuffle deck swipe

### Motion
- [ ] All 12 patterns visible and smooth (no jank in Performance panel)
- [ ] OS "reduce motion" ON → no 3D, no auto-rotation, everything still readable/usable
- [ ] Switching tabs pauses rotators/pings/3D

### Accessibility
- [ ] Keyboard-only walkthrough of every page
- [ ] NVDA: headings structure, modal announced, form errors announced
- [ ] axe DevTools: 0 serious/critical issues
- [ ] Contrast check on accent text in both themes

### Browsers
- [ ] Chrome, Edge, Firefox (Windows) · Safari (macOS/iOS if available) · Android Chrome

## 3. Performance targets (Lighthouse, mobile)
| Page | Perf | A11y | BP | SEO |
|---|---|---|---|---|
| `/` | ≥ 90 | ≥ 95 | ≥ 95 | ≥ 95 |
| `/certificates` | ≥ 90 | ≥ 95 | ≥ 95 | ≥ 95 |
| `/projects/mind-scan-analyzer` | ≥ 90 | ≥ 95 | ≥ 95 | ≥ 95 |

Also check with `vite build` output: initial JS ≤ 200 KB gzip; `three` in a separate chunk.

## 4. Content review (with Aditi, before launch)
- [ ] Every fact on the site matches her documents
- [ ] Open questions in [open-questions.md](../00-overview/open-questions.md) resolved or defaults accepted
- [ ] She is comfortable answering interview questions on every listed skill
