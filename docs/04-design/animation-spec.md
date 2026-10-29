# Animation Spec

All 12 patterns from the reference screenshot, mapped to where they appear in the portfolio. Library: **Framer Motion**. Shared variants live in `src/lib/motion.ts`.

## Global motion tokens
| Token | Value |
|---|---|
| `ease.out` | `[0.22, 1, 0.36, 1]` |
| `ease.inOut` | `[0.65, 0, 0.35, 1]` |
| `spring.soft` | `{ type: 'spring', stiffness: 220, damping: 26 }` |
| `spring.snappy` | `{ type: 'spring', stiffness: 420, damping: 30 }` |
| `dur.fast / base / slow` | 0.15s / 0.3s / 0.6s |
| `stagger` | 0.04s (letters), 0.06s (cards) |
| In-view trigger | `useInView(ref, { once: true, amount: 0.4 })` |

## The 12 patterns

> **Status (Phase 7):** all 12 implemented with reduced-motion fallbacks. Card → modal uses a *container transform* (panel grows from the clicked card, `src/lib/modalOrigin.ts`) rather than a `layoutId` shared element. Deck offsets ended up `y: i*14` with bottom-anchored scale so the stack shows.
>
> **Performance rule (Phase 8):** don't use Framer `useScroll`, `layout` or `layoutId` — profiling showed each kept Framer measuring layout every frame (12.5 s → 3 s of main thread on Home after removing them). Use `src/hooks/useScrollMotion.ts` for scroll-linked values and `useSlidingIndicator` for active pills. The WordRotator width morph and the filter-reflow `layout` were dropped for this reason.

| # | Reference name | Portfolio usage | Component | Behaviour | Reduced-motion fallback |
|---|---|---|---|---|---|
| 01 | **Hero reveal** | Home hero: "Hi, I'm / Aditi Singh / role / objective / CTAs" | `RevealText` (+ stagger in `Hero`) | Each letter of the name rises from a clip mask (`y: 110% → 0`), stagger 0.04s; then lines below fade-up with 0.08s stagger. Total ≤ 1.2s. | Instant render, 150ms fade |
| 02 | **Word rotator** | Home job role | `WordRotator` | Word slides up and out with blur(4px), next slides in from below; container width animates to word width (`layout`). Interval 2.4s. Accent underline sweeps under each word. | Shows first role only |
| 03 | **Sale pings** → *Highlight pings* | Home hero bottom-right: toasts like "🎓 MCA · 95%", "🏆 National GOER 2025 Finalist", "✓ Kaggle · Time Series", "💼 AI/ML Intern @ Shanti Infosoft" (icons via lucide, not emoji) | `HighlightPings` | One toast at a time pops in (scale 0.9→1, y 12→0), stays 3.5s, exits up. Small pulsing orange dot. Click → goes to related page. Pauses on hover/focus or tab hidden. | Hidden |
| 04 | **Review shuffle** | Certificates page featured deck (5 certs) | `ShuffleDeck` | Cards stacked with offset `y: i*10`, `scale: 1 - i*0.05`, `rotate: ±i*2°`. Every 3.5s / click / swipe / ←→: top card flies out (x 120%, rotate 12°) then re-enters at the back. | Static stack, buttons to step |
| 05 | **Count-up stats** | Home stats strip; About MCA/BCA scores | `CountUp` | `animate(0 → value)` 1.4s `ease.out` using `useMotionValue` + `tabular-nums`, supports decimals (94.8). Fires once in view. | Final value shown |
| 06 | **Bento build** | About page grid; Home explore grid | `bentoItem` + `staggerParent` in `src/lib/motion.ts` (no separate component) | Tiles start `opacity 0, scale 0.92, y 24` and assemble with stagger 0.06s in reading order; inner content fades 0.1s later. | Fade only |
| 07 | **Cursor tour** | Project detail cover screenshot | `CursorTour` | SVG cursor moves through `cursorTour` hotspots (% coords) with spring; at each stop a ripple + label tooltip appears for 1.2s. Plays once in view, "Replay" button. | All labels shown statically as numbered pins |
| 08 | **Process draw** | (a) Experience timeline line, scroll-linked; (b) Project pipeline diagram | scroll-linked `scaleY` line in `ExperiencePage` (timeline), `PipelineSteps` (pipeline) | (a) `scaleY` bound to `useElementProgress` (section progress); nodes pop when reached. (b) Sequential: line segment draws 0.4s → node scales in → next. | Fully drawn |
| 09 | **Before / after** | Project detail (e.g. raw EEG data → prediction dashboard; raw table → Power BI dashboard) | `BeforeAfter` | Draggable divider (pointer + keyboard ←→ 5%), `clip-path: inset()` on the top image. Intro hint: divider nudges 50%→60%→50% once. | Same, without intro nudge |
| 10 | **Price roll** → *Number roll* | Certificate detail (Grade 96.00%, 19 hours, 332 hours), Achievement metrics | `NumberRoll` | Odometer: each digit is a vertical 0–9 strip that rolls to its target with stagger 0.05s, `spring.soft`. Distinct from Count-up (digits roll, not count). | Final value shown |
| 11 | **Us vs them** → *Classroom vs Industry* | Experience detail (internship) and optionally About | `CompareColumns` | Two columns; rows reveal one by one, left items get a muted dot, right items get an orange ✓ that draws in (pathLength). | Static |
| 12 | **Click → success** | Contact submit; also "Copy" buttons | `SuccessButton` | States: idle → loading (label crossfades to spinner, width shrinks to circle) → success (circle turns green, ✓ draws, confetti 16 particles) → idle after 2s. Error: shake x ±6px ×3. | Text-only state change |

## Additional micro-interactions
| Where | Interaction |
|---|---|
| Cards (project, certificate) | CSS 3D tilt on pointer move (max 6°, `perspective: 900px`) + glare gradient follows pointer. Disabled on touch. |
| Card → detail | Container transform from the clicked card (`modalOrigin`); backdrop blur fades in. |
| Navbar | Sliding active pill (`useSlidingIndicator`, CSS transition); hide on scroll down. |
| Primary buttons | Magnetic pull (≤ 6px) on desktop. |
| Section headings | Mono index ("02 — About") types in, heading fades up. |
| Page change | Fade + 12px slide (see layout spec). |
| Filter change | `layout` reflow animation on grid. |

## Implementation rules
1. One `useReducedMotion()` hook (wraps Framer's) decides fallbacks; components accept no "force" override.
2. Only animate `transform`, `opacity`, `filter` (blur ≤ 6px), `clip-path`. Never animate `width/height/top/left` except Framer `layout`.
3. Intervals (rotator, pings, deck) pause when `document.hidden` or element out of view.
4. No animation may delay the hero text being readable for more than 1.2s.
