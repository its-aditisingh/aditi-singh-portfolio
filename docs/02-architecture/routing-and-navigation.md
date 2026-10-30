# Routing & Navigation

## Route table

| Path | Page | Nav item | Title tag |
|---|---|---|---|
| `/` | HomePage | Home | Aditi Singh — Aspiring Assistant Professor, Computer Science |
| `/about` | AboutPage | About | About · Aditi Singh |
| `/research` | ResearchPage | Research | Research · Aditi Singh |
| `/projects` | ProjectsPage | Projects | Projects · Aditi Singh |
| `/projects/:slug` | ProjectDetail | Projects | `{project.title}` · Aditi Singh |
| `/certificates` | CertificatesPage | Certificates | Certificates · Aditi Singh |
| `/certificates/:slug` | CertificateDetail | Certificates | `{cert.title}` · Aditi Singh |
| `/achievements` | AchievementsPage | Achievements | Achievements · Aditi Singh |
| `/achievements/:slug` | AchievementDetail | Achievements | `{achievement.title}` · Aditi Singh |
| `/experience` | ExperiencePage | Experience | Experience · Aditi Singh |
| `/experience/:slug` | ExperienceDetail | Experience | `{role} at {org}` · Aditi Singh |
| `/contact` | ContactPage | Contact | Contact · Aditi Singh |
| `*` | NotFoundPage | — | Page not found |

Nav order: **Home · About · Research · Projects · Certificates · Achievements · Experience · Contact** (Research added 31 Oct 2026). A detail route keeps its parent nav item active.

## Modal-route pattern (detail views)

> **As implemented (Phase 4):** instead of a `backgroundLocation`, each detail route is a *child* of its list route (`projects` → `:slug`). The list page wraps itself in `CollectionRoute`, which renders the list plus the detail as a modal when the link carried the modal token (`DetailLink` / `src/lib/modalRoute.ts`), or only the detail as a page otherwise. The token is regenerated per page load, so a refreshed or shared URL is a page. `AnimatedOutlet` keeps the list's transition key while a modal is open. The diagram below is the original design; behaviour is the same.

Goal: clicking a card feels like it *expands into* a modal, yet the detail has a real URL.

```text
Card click
  └─ navigate(`/certificates/${slug}`, { state: { backgroundLocation: location } })

Router render
  ├─ if state.backgroundLocation exists:
  │     render <Routes location={backgroundLocation}> (the list stays visible)
  │     + render <Routes> for the detail inside <DetailShell mode="modal">
  └─ else (direct visit / refresh / shared link):
        render detail inside <DetailShell mode="page"> (full page with header + back link)
```

- **Close** (✕, `Esc`, backdrop click) → `navigate(-1)` if opened from list, else `navigate('/certificates')`.
- **Prev / Next** → `navigate(nextSlug, { replace: true, state })` so Back still closes the modal instead of stepping through items.
- **Shared element**: card and modal header share `layoutId={`cert-${slug}`}` (Framer Motion) for the expand animation. Disabled under reduced motion.
- Body scroll locked while modal is open; scroll position of the list is preserved.

## Scroll behaviour
- Route change between pages → scroll to top (smooth unless reduced motion).
- Opening/closing a modal → no scroll change.
- `<ScrollRestoration />` from React Router handles Back navigation.

## Hosting rewrite
`vercel.json`:
```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
```
