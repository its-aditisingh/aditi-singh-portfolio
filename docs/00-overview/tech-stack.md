# Tech Stack & Config

## Decisions

| Concern | Choice | Why (and what was rejected) |
|---|---|---|
| Build tool | **Vite 5** | Fastest DX for a static SPA. Next.js rejected: no server needs, SSR adds complexity; SEO handled via prerendered meta. |
| UI | **React 18** | Best ecosystem for Framer Motion + React Three Fiber. |
| Language | **TypeScript 5 (strict)** | Requirement. Typed content prevents broken detail pages. |
| Routing | **React Router 6** (data router) | Real URLs for detail views; "modal route" pattern (background location). |
| Styling | **Tailwind CSS 3** + CSS variables | Fast, consistent spacing; tokens in CSS vars enable dark mode. |
| Animation | **Framer Motion 11** (`motion`) | Layout animations (card → modal), `AnimatePresence`, `useInView`, `pathLength` draws. GSAP rejected: two animation libs = bigger bundle. |
| 3D | **three + @react-three/fiber 8** | Declarative 3D in React; lazy-loaded chunk. drei was planned but removed in Phase 6 — a custom shader covered everything (and drei pulled in a vulnerable `uuid`). |
| Icons | **lucide-react** | Matches the thin orange line icons in the reference. |
| Fonts | **Plus Jakarta Sans** (display/body), **JetBrains Mono** (indices, numbers) via `@fontsource` | Self-hosted, no layout shift. |
| Contact form | **Web3Forms** (free, POST from browser, no backend) | EmailJS is the fallback option. |
| SEO meta | **react-helmet-async** + static `index.html` defaults | Per-page titles/OG tags. |
| Images | Pre-generated **WebP** at 2 widths + `srcSet` (`npm run images`: sharp + **pdf-to-img** 7.0.1 for PDFs) | Original certificate PDFs are up to 2.5 MB. `pdftoppm` isn't available on this machine; pdf-to-img is pure Node. |
| Lint/format | ESLint (typescript-eslint) + Prettier | |
| Tests | **Vitest** + React Testing Library; Lighthouse CI (manual) | See [test plan](../07-testing/test-plan.md). |
| Hosting | **Vercel** (free) | SPA rewrite to `index.html`; preview deploys. Netlify is an equal alternative. |
| Package manager | npm | |

## Dependencies (planned)

```text
dependencies:
  react, react-dom, react-router-dom
  framer-motion
  three, @react-three/fiber, @react-three/drei
  lucide-react
  react-helmet-async
  @fontsource-variable/plus-jakarta-sans, @fontsource-variable/jetbrains-mono
  clsx, tailwind-merge

devDependencies:
  typescript, vite, @vitejs/plugin-react
  tailwindcss, postcss, autoprefixer
  @types/react, @types/react-dom, @types/three
  eslint, typescript-eslint, eslint-plugin-react-hooks, prettier
  vitest, @testing-library/react, @testing-library/jest-dom, jsdom
  sharp (thumbnail script)
```

### Pinned versions (Phase 0, 29 Oct 2026)
| Package | Version | | Package | Version |
|---|---|---|---|---|
| react / react-dom | 18.3.1 | | typescript | 5.6.3 |
| react-router-dom | 6.30.6 | | vite | 5.4.10 |
| framer-motion | 11.11.9 | | @vitejs/plugin-react | 4.3.3 |
| three | 0.169.0 | | tailwindcss | 3.4.14 |
| @react-three/fiber | 8.17.10 | | eslint / typescript-eslint | 9.13.0 / 8.11.0 |
| ~~@react-three/drei~~ | removed (Phase 6) | | prettier | 3.3.3 |
| lucide-react | 0.453.0 | | vitest | 2.1.3 |
| react-helmet-async | 2.0.5 | | @testing-library/react | 16.0.1 |
| clsx / tailwind-merge | 2.1.1 / 2.5.4 | | sharp | 0.33.5 |

`package.json` is the source of truth; this table is a snapshot.

## Configuration (replaces a separate `config` folder)

### Environment variables (`.env`, with `.env.example` committed)
| Var | Used by | Example |
|---|---|---|
| `VITE_WEB3FORMS_KEY` | Contact form | `xxxxxxxx-xxxx-...` (from web3forms.com, free) |
| `VITE_SITE_URL` | Canonical URLs, OG tags, sitemap | `https://aditisingh.vercel.app` |

### Config files
- `tsconfig.json` — `strict`, `noUncheckedIndexedAccess`, path alias `@/* → src/*`.
- `vite.config.ts` — React plugin, alias `@`, Vitest config. No `manualChunks`: the dynamic import in `HeroCanvas` splits three.js out on its own (a manual chunk made the entry preload it).
- `tailwind.config.ts` — colors mapped to CSS vars (see [design-system](../04-design/design-system.md)), `darkMode: 'class'`.
- `vercel.json` — rewrite `/(.*)` → `/index.html`.

### Scripts
| Script | Does |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | `tsc --noEmit && vite build` |
| `npm run preview` | Serve production build |
| `npm run test` | Vitest |
| `npm run lint` | ESLint |
| `npm run images` | Regenerate all WebP assets, `public/certificates/`, `og-image.png` and the image manifest from `Certificate/` + `assets-src/` (see `scripts/generate-images.mjs`) |
