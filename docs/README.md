# Aditi Singh — Portfolio · Spec Documents

Spec-driven documentation for Aditi Singh's personal portfolio website.
**Rule:** nothing gets implemented unless it is described here first. If the code and the spec disagree, fix the spec first, then the code.

## How to read these docs

| Folder | What it answers | Read when |
|---|---|---|
| [00-overview](00-overview/) | What are we building, why, with which stack, what's still undecided | First, always |
| [01-requirements](01-requirements/) | What the site must do (functional) and how well (performance, a11y, SEO) | Before starting any feature |
| [02-architecture](02-architecture/) | Folder structure, routing, TypeScript data model | Before writing code |
| [03-features](03-features/) | One spec per page/feature with acceptance criteria | While building that page |
| [04-design](04-design/) | Design tokens, the 12 animation patterns, the 3D scene | While styling/animating |
| [05-content](05-content/) | All real content (verified from resume + certificates + GitHub) | While filling `src/data/*.ts` |
| [06-phases](06-phases/) | Build order, phase by phase, with done-criteria | To pick the next task |
| [07-testing](07-testing/) | Test plan, QA checklist, Lighthouse targets | Before calling a phase done |

Also at this level:

- [PROJECT_CONTEXT.md](PROJECT_CONTEXT.md) — one-page summary of the whole project (fastest way to get context)
- [CLAUDE.md](CLAUDE.md) — working rules for an AI assistant (or any developer) implementing this

## Folders intentionally NOT created

This is a **frontend-only static site** (no server, no database, no API of our own), so these reference folders were dropped:

| Dropped | Why | Where its concern lives instead |
|---|---|---|
| `database` | No DB. Content is typed TypeScript data files. | [02-architecture/data-model.md](02-architecture/data-model.md) |
| `api` | No backend. Contact form uses a hosted form service. | [03-features/07-contact.md](03-features/07-contact.md) |
| `config` | Only a few env vars and build configs. | [00-overview/tech-stack.md](00-overview/tech-stack.md) |

## Source material

All facts in [05-content](05-content/) come from:

- `Certificate/Aditi's Resume.pdf`
- The 18 other files in `Certificate/` (certificates, internship letter, ISRO registration)
- GitHub: [github.com/its-aditisingh](https://github.com/its-aditisingh) (repos + profile README)

Anything not found in those sources is marked **`TBD`** or **`CONFIRM`** and listed in [00-overview/open-questions.md](00-overview/open-questions.md).
