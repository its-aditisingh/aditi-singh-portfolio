# CLAUDE.md — Rules for implementing this portfolio

Read [PROJECT_CONTEXT.md](PROJECT_CONTEXT.md) first, then the spec for whatever you're building.

## Golden rules
1. **Spec first.** Every feature has a spec in `03-features/`. Build to its acceptance criteria. If something is missing or wrong in the spec, update the spec in the same change.
2. **No invented facts.** All personal content comes from `05-content/`. Never make up grades, dates, metrics, company names, or project results. If data is `TBD`, render nothing for that field (don't show placeholders like "Lorem ipsum" in production).
3. **Single source of truth.** Content lives only in `src/data/*.ts`, typed by `src/types/index.ts`. Components never hard-code content.
4. **TypeScript strict.** `strict: true`, no `any`, no `@ts-ignore`. Use the types in [02-architecture/data-model.md](02-architecture/data-model.md).
5. **Respect reduced motion.** Every animation must have a `prefers-reduced-motion` fallback (see [04-design/animation-spec.md](04-design/animation-spec.md)). The 3D scene must not render when reduced motion is on or WebGL is unavailable.
6. **Performance budget is a requirement**, not a nice-to-have (see [01-requirements/non-functional-requirements.md](01-requirements/non-functional-requirements.md)). Three.js must be lazy-loaded.
7. **Accessibility:** keyboard reachable, visible focus, modal focus-trap + `Esc` to close, alt text on every image, contrast AA.
8. **Follow the phase order** in [06-phases/implementation-plan.md](06-phases/implementation-plan.md). Tick the checklist there when a phase is done.

## Conventions
- Components: `PascalCase.tsx`, one component per file, named exports.
- Hooks: `useXxx.ts` in `src/hooks/`.
- Data files: `camelCase.ts` exporting a typed `const` array, e.g. `export const certificates: Certificate[] = [...]`.
- Slugs: kebab-case, unique per collection, used in URLs.
- Styling: Tailwind utility classes + CSS variables from the design tokens. No inline hex colors in components.
- Motion: reusable variants in `src/lib/motion.ts`; animation components in `src/components/animations/`.
- Icons: `lucide-react` only.
- Dates in data: ISO strings (`"2026-07-29"`); format for display with `src/lib/format.ts`.

## Never
- Commit personal phone number in plain text in the UI (see open questions).
- Add a backend, database, or analytics without updating the spec.
- Ship the original 2–3 MB scanned PDFs as thumbnails — always use generated `.webp` previews.
