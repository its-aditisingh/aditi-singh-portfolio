# Project Context (one page)

## Who
**Aditi Singh** — MCA (AI/ML & Data Science), AKS University Satna, 95%. BCA 94.8%.
AI/ML Intern at Shanti Infosoft LLP, Indore (CMMI Level 5), Jan–Jun 2026.
Career goal (from resume): **Assistant Professor in Computer Science**, with strong AI/ML/Data Science industry exposure.
Based in Indore, Madhya Pradesh.

## What
A personal portfolio website that:
1. Introduces her (role, career objective, contact CTA).
2. Shows education, skills, what she's learning now.
3. Lists **projects, certificates, achievements, experience** — each as a card grid; clicking a card opens a **detail view**.
4. Lets visitors contact her.
5. Feels premium: smooth animations (12 patterns from the reference screenshot), one interactive **3D neural-network hero scene**, tasteful micro-interactions.

## Navbar (7 items)
`Home · About · Projects · Certificates · Achievements · Experience · Contact`

## Stack (decided — see [tech-stack](00-overview/tech-stack.md))
Vite · React 18 · **TypeScript (strict)** · React Router · Tailwind CSS · Framer Motion · React Three Fiber + drei · lucide-react · Web3Forms (contact) · Vercel hosting.

## No backend
All content lives in typed files under `src/data/`. Certificates/resume are static files in `public/`.

## Content inventory
| Type | Count | Source |
|---|---|---|
| Projects | 4 (Mind Scan Analyzer, EEG Power BI Dashboard, Cancer Variant Power BI Dashboard, Internship ML work) | Resume + GitHub |
| Photos | 1 formal profile portrait (`photo2.jpeg`) + 4 GOER 2025 event photos | `Certificate/` |
| Journey | 10-step timeline 2021 → Next | Derived from all dates |
| Certificates | 14 (Saylor, 5× Kaggle, GfG, Anudip-AWS, ISRO-IIRS, 5× Udemy) | `Certificate/` |
| Achievements | 6 (GOER 2025 National Finalist & Team Leader, academic toppers, etc.) | Resume + certificates |
| Experience | 2 (AI/ML internship, AWS training program) + 1 optional academic entry | Resume + certificates |

## Visual direction
Warm off-white background, white rounded cards, **orange accent**, monospace index numbers (`01`, `02`…) and orange line icons — directly inspired by the reference screenshot. Dark mode included.

## Key decisions (29 Oct 2026)
- Home shows **both** identities: static "MCA · AI/ML & Data Science" + rotating roles (Assistant Professor ↔ AI/ML).
- Formal studio portrait (`photo2.jpeg`) in an arch frame with the 3D network behind it.
- Phone **never** shown in full (masked `+91 738 •••• 858` only if ever enabled; off by default).
- Hosting on free Vercel: `its-aditisingh-portfolio.vercel.app`.
- Content marked ✎ in `05-content/` was added during planning — the owner may edit or remove it.

## Status
✅ **Live:** https://its-aditisingh-portfolio.vercel.app · code: https://github.com/its-aditisingh/aditi-singh-portfolio. Phases 0–9 done; remaining: one real contact-form test, PageSpeed Insights check, content review with Aditi ([plan](06-phases/implementation-plan.md)).
