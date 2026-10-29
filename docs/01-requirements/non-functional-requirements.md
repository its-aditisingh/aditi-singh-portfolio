# Non-Functional Requirements

## Performance
| ID | Requirement |
|---|---|
| NFR-P1 | Lighthouse mobile Performance ≥ 90 on Home. |
| NFR-P2 | LCP < 2.5 s, CLS < 0.1, INP < 200 ms (simulated 4G, mid-range phone). |
| NFR-P3 | Initial JS (excluding the lazy `three` chunk) ≤ 200 KB gzipped. |
| NFR-P4 | `three` chunk loads **after** first paint (`React.lazy` + idle callback); hero text is never blocked by it. |
| NFR-P5 | 3D scene: ≤ 2,000 points, ≤ 60 fps cap, device-pixel-ratio clamped to `[1, 1.75]`, pauses when off-screen or tab hidden. |
| NFR-P6 | Certificate thumbnails are WebP, ≤ 120 KB each, with explicit `width`/`height`; lazy-loaded below the fold. |
| NFR-P7 | Fonts self-hosted, `font-display: swap`, only weights used are bundled. |

## Accessibility (WCAG 2.1 AA)
| ID | Requirement |
|---|---|
| NFR-A1 | All interactive elements reachable by keyboard, with visible focus ring (accent color, 2px offset). |
| NFR-A2 | Detail modal: `role="dialog"`, `aria-modal`, labelled by title, focus trapped, focus returns to the originating card on close. |
| NFR-A3 | Text contrast ≥ 4.5:1 (body), ≥ 3:1 (large text, icons). Orange accent on white is checked — use the darker accent token for text. |
| NFR-A4 | `prefers-reduced-motion: reduce` → no auto-playing motion, no 3D canvas, no parallax; fades only. |
| NFR-A5 | Every image has meaningful `alt`; decorative images `alt=""`. 3D canvas is `aria-hidden` with a text equivalent nearby. |
| NFR-A6 | Rotating words announce politely (`aria-live="polite"`) only the first time, or expose full list to screen readers via visually-hidden text. |
| NFR-A7 | Touch targets ≥ 44×44 px. |

## SEO & sharing
| ID | Requirement |
|---|---|
| NFR-S1 | Unique `<title>` and meta description per route (react-helmet-async). |
| NFR-S2 | Open Graph + Twitter card image (1200×630) for the site; detail pages reuse their cover image when available. |
| NFR-S3 | `robots.txt`, `sitemap.xml` (generated at build from data files). |
| NFR-S4 | JSON-LD `Person` schema on Home (name, jobTitle, alumniOf, sameAs links). |
| NFR-S5 | Canonical URL from `VITE_SITE_URL`. |

## Responsiveness & browsers
| ID | Requirement |
|---|---|
| NFR-R1 | Breakpoints: 360, 768, 1024, 1280, 1536 px. No horizontal scroll at any width ≥ 320 px. |
| NFR-R2 | Supported: latest 2 versions of Chrome, Edge, Firefox, Safari; iOS Safari 16+; Android Chrome. |
| NFR-R3 | Without WebGL, the hero shows a static SVG fallback — no error, no blank space. |

## Maintainability
| ID | Requirement |
|---|---|
| NFR-M1 | Adding a certificate = add one object to `certificates.ts` + one image. No component change. |
| NFR-M2 | `tsc --noEmit` and ESLint pass with zero errors before every deploy. |
| NFR-M3 | Data-integrity tests (unique slugs, files exist, required fields) run in Vitest. |

## Privacy & content integrity
| ID | Requirement |
|---|---|
| NFR-C1 | Full phone number never appears in UI, source data, HTML or JS. Masked form only, and only if `showPhone` is enabled. **Exception:** the downloadable resume PDF is shipped unchanged (owner decision Q12). |
| NFR-C4 | Event photos are captioned by scene, not by naming people in them. |
| NFR-C2 | Student registration numbers on certificates (e.g. Anudip student reg. no.) are **not** repeated in text fields; they remain only inside the certificate image. |
| NFR-C3 | All text facts match [05-content](../05-content/) exactly. |
