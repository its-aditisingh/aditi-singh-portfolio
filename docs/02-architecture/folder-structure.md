# Folder Structure

```text
aditi-portfolio/
├─ Certificate/                  # ORIGINAL documents & photos (git-ignored, local only)
├─ assets-src/                   # downloaded project screenshots from GitHub (git-ignored, local only)
├─ docs/                         # this spec
├─ scripts/
│  └─ generate-images.mjs        # `npm run images`: PDF/JPEG/PNG → responsive WebP (sharp + pdf-to-img),
│                                #   copies originals to public/certificates, writes og-image + manifest
├─ public/
│  ├─ resume/Aditi-Singh-Resume.pdf
│  ├─ certificates/              # original PDFs/JPEGs renamed to slug, for "View PDF"
│  │   ├─ saylor-cs207-ml.pdf
│  │   └─ ...
│  ├─ og-image.png               # 1200×630
│  ├─ favicon.svg
│  ├─ robots.txt
│  └─ sitemap.xml                # generated at build
├─ src/
│  ├─ main.tsx                   # mounts <App/>, HelmetProvider, theme init
│  ├─ App.tsx                    # RouterProvider
│  ├─ routes/
│  │   └─ router.tsx             # route table + modal-route logic
│  ├─ pages/
│  │   ├─ HomePage.tsx
│  │   ├─ AboutPage.tsx
│  │   ├─ ProjectsPage.tsx
│  │   ├─ CertificatesPage.tsx
│  │   ├─ AchievementsPage.tsx
│  │   ├─ ExperiencePage.tsx
│  │   ├─ ContactPage.tsx
│  │   └─ NotFoundPage.tsx
│  ├─ components/
│  │   ├─ layout/                # RootLayout, Navbar, MobileMenu, Footer, ThemeToggle, ScrollProgress, PageTransition, Seo
│  │   ├─ ui/                    # Button, IndexCard (numbered card), Badge, Chip, FilterTabs, SectionHeading, CopyButton,
│  │   │                         #   ResponsiveImage, Lightbox, Gallery, ZoomableImage, PagePlaceholder (until Contact is built)
│  │   ├─ detail/                # CollectionRoute, DetailShell (modal|page), DetailLink, DetailTitle, DetailNav, DetailSection,
│  │   │                         #   NotFoundDetail, ProjectDetail, CertificateDetail, AchievementDetail, ExperienceDetail
│  │   ├─ cards/                 # ProjectCard (+ ProjectCoverFallback), CertificateCard, AchievementCard, ExperienceCard
│  │   ├─ home/                  # Hero, StatsStrip, ExploreGrid
│  │   ├─ about/                 # BentoTile, EducationTile, SkillsTile, LearningTile, JourneyTimeline
│  │   ├─ animations/            # the 12 patterns — see 04-design/animation-spec.md
│  │   │   ├─ HeroReveal.tsx
│  │   │   ├─ WordRotator.tsx
│  │   │   ├─ HighlightPings.tsx
│  │   │   ├─ ShuffleDeck.tsx
│  │   │   ├─ CountUp.tsx
│  │   │   ├─ BentoGrid.tsx
│  │   │   ├─ CursorTour.tsx
│  │   │   ├─ DrawPath.tsx
│  │   │   ├─ BeforeAfter.tsx
│  │   │   ├─ NumberRoll.tsx
│  │   │   ├─ CompareColumns.tsx
│  │   │   └─ SuccessButton.tsx
│  │   └─ three/                 # lazy chunk
│  │       ├─ HeroCanvas.tsx     # gating (reduced motion / WebGL / data saver), idle mount, pause, pointer — NOT lazy
│  │       ├─ NeuralScene.tsx    # lazy entry: R3F <Canvas> (everything three.js sits behind this import)
│  │       ├─ NeuralBrain.tsx    # points + connections + signal pulses
│  │       ├─ network.ts         # pure geometry builder (tested)
│  │       ├─ shaders.ts         # point shaders: glow, push, ripple, twinkle
│  │       ├─ SceneErrorBoundary.tsx
│  │       └─ HeroFallback.tsx   # static SVG
│  ├─ data/                      # SINGLE SOURCE OF TRUTH for content
│  │   ├─ profile.ts
│  │   ├─ education.ts
│  │   ├─ skills.ts
│  │   ├─ projects.ts
│  │   ├─ certificates.ts
│  │   ├─ achievements.ts
│  │   ├─ experience.ts
│  │   ├─ journey.ts
│  │   ├─ highlights.ts          # pings + stats
│  │   ├─ images.generated.ts    # AUTO-GENERATED image manifest — don't edit
│  │   └─ data.test.ts           # data-integrity tests
│  ├─ assets/
│  │   ├─ certificates/*.webp    # generated thumbnails
│  │   ├─ projects/*.webp
│  │   ├─ profile/               # aditi-portrait.webp (4:5), aditi-avatar.webp (1:1)
│  │   ├─ achievements/          # goer-2025-stage/strategy-1/strategy-2/venue.webp
│  │   └─ logos/*.svg            # issuer logos (Kaggle, Udemy, ISRO, etc.) — optional
│  ├─ types/index.ts
│  ├─ hooks/                     # useReducedMotion, useWebGLSupport, useInViewOnce, useTheme, useLockBodyScroll, useCollectionNav
│  ├─ lib/                       # motion.ts (variants), format.ts (dates/durations), cn.ts, seo.ts
│  ├─ styles/globals.css         # tokens, base, fonts
│  └─ test/                      # setup + data-integrity tests
├─ index.html
├─ vite.config.ts
├─ tailwind.config.ts
├─ postcss.config.js
├─ tsconfig.json
├─ vercel.json
├─ .env.example
└─ package.json
```

## Notes
- `Certificate/` and `assets-src/` stay untouched as local originals (git-ignored for privacy/size). `npm run images` reads them and writes `src/assets/**` (WebP, 2 widths each), `public/certificates/` (slug-renamed originals for "View PDF"), `public/og-image.png` and `src/data/images.generated.ts`. Generated outputs are committed, so a fresh clone builds without the originals.
- `src/lib/icons.ts` (lucide name registry) and `src/lib/images.ts` (`image()` / `captioned()` helpers) back the data files.
- Everything under `components/three/` is only imported via `React.lazy` so it lands in its own chunk.
