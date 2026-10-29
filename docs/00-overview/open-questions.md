# Decisions & Open Questions

## Resolved (29 Oct 2026)

| # | Question | Decision |
|---|---|---|
| Q1 | Headline role on Home | **Both.** Static headline "MCA · AI/ML & Data Science" + rotating roles (Aspiring Assistant Professor → AI/ML Engineer → Data Scientist → Power BI Analyst). Editable later in `src/data/profile.ts`. |
| Q2 | Profile photo | Superseded by Q2b → `photo2.jpeg`. See [profile.md](../05-content/profile.md#photo). |
| Q3 | Phone public? | **Hidden by default** (`showPhone: false`). If ever enabled, show masked: `+91 738 •••• 858` (middle 4 digits hidden) — never the full number. |
| Q4 | More projects | Use what exists. Added a 4th entry for the **internship work** (described only from resume bullets). More projects later. |
| Q7 | Currently Learning | AI/ML + Neural Networks confirmed; planner added related topics (marked ✎ in [education-and-skills.md](../05-content/education-and-skills.md#currently-learning)) — remove any that don't fit. |
| Q8 | Event photos | **Provided:** 4 WhatsApp images, all from National GOER 2025 (Third Edition). Used in the GOER achievement gallery. |
| Q9 | Domain | Free **`*.vercel.app`** (e.g. `aditisingh.vercel.app`, or nearest available). |
| — | Extra content | Planner may add related content; owner edits later. Everything added this way is marked ✎ in `05-content/`. |
| Q2b | Formal headshot | **Provided:** `Certificate/photo2.jpeg` (studio portrait, plain background) is the portfolio photo. `photo.jpeg` is not used. |
| Q5 | Mind Scan Analyzer stack | **Follow GitHub** (README + repo About). No metrics. |
| Q6 | AWS program start | **Left empty**; owner fills later. |
| Q10 | GfG completion date | **Left empty**; owner fills later. |
| Q12 | Resume PDF contains the full phone number | **Use the resume as-is** (owner OK with phone inside the PDF). Copied to `public/resume/Aditi-Singh-Resume.pdf`. The site's own pages still never show the phone (Q3). |

| Q11 | Internship length on Home | Default kept: **"5+ months"** (true for both resume and certificate dates). Change in `src/data/highlights.ts`. |

## Still open

| # | What | Needed by | Until then |
|---|---|---|---|
| Q13 | **Web3Forms access key** — free at web3forms.com, created with the email that should receive messages (adytisingh@gmail.com). Add as `VITE_WEB3FORMS_KEY` in `.env` and in Vercel. | Phase 9 (deploy) | Contact page shows an "Email Aditi" button instead of the form |

Owner can fill later: AWS program start month (`src/data/experience.ts`), GfG certificate date (`src/data/certificates.ts`).

## Suggestions

1. **Fix "AWS Cloud Practitioner" on the resume.** The certificate is *"Advanced Program on Amazon Web Services"* by **Anudip Foundation (supported by Accenture)** — 332 hours, Grade A1 — not the official AWS Certified Cloud Practitioner exam. The portfolio uses the accurate name.
2. **Edusat Registrations.pdf** is only a registration confirmation → not shown.
3. **GOER Certificate.pdf** is a duplicate → only `GOER 2025 certificate.pdf` is used.
4. **Internship certificate** scan is sideways → thumbnail script rotates it.
5. ~~Formal headshot~~ — done (`photo2.jpeg`).
6. **Group photos show other students.** Normal for event galleries; if any of them object, remove that image from `achievements.ts`.
7. Later (v2): Hindi toggle; a **Teaching** page with sample lecture notes/slides (very strong for professor applications).
