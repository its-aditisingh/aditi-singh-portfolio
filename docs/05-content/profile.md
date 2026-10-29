# Content: Profile & Home

Source: resume, GitHub profile README. → `src/data/profile.ts`, `src/data/highlights.ts`

## Identity
| Field | Value | Source |
|---|---|---|
| Name | Aditi Singh | Resume |
| Location | Indore, Madhya Pradesh, India | Resume |
| Email | adytisingh@gmail.com | Resume |
| Phone | **Never shown in full.** `showPhone: false` by default. If enabled → masked `+91 738 •••• 858` (no `tel:` link). Full number is not stored in `src/data`. | Resume + decision Q3 |
| LinkedIn | https://linkedin.com/in/adyti | Resume |
| GitHub | https://github.com/its-aditisingh | Resume |
| Resume file | `Certificate/Aditi's Resume.pdf` → `public/resume/Aditi-Singh-Resume.pdf` | — |
| Languages | English (Professional Proficiency), Hindi (Native) | Resume |
| Motto | "Learning never exhausts the mind; it only expands the possibilities." | GitHub README |

## Photo
| Field | Value |
|---|---|
| Source | **`Certificate/photo2.jpeg`** — 976×1584, formal studio portrait: white shirt, glasses, plain warm-grey background, hand-on-chin pose (decision 29 Oct 2026; replaces `photo.jpeg`) |
| Output | `src/assets/profile/aditi-portrait.webp` — crop **4:5** from the top of the frame: full width (976) × ~1220 tall, i.e. hair to mid-torso; face sits in the upper third. WebP q82 at 800px wide + a 480px version |
| Also | `aditi-avatar.webp` — 1:1 head-and-shoulders crop centred on the face (≈ x 280–760, y 230–710 of the source), 256px (navbar/mobile menu/footer/OG) |
| Alt text | "Portrait of Aditi Singh in a white shirt and glasses" |
| Used on | Home hero (arch-shaped frame with 3D neural network behind it), About intro tile, OG image |
| Edit | No retouching needed. The grey background is kept; the arch frame adds a soft accent gradient at the bottom so it blends with the warm page colours. To change later, swap the two WebP files only — no code change. |
| Not used | `photo.jpeg` (outdoor, casual) — kept in `Certificate/` as a backup |

## Headline & roles (Home — "Job role")
- **Headline (static):** `MCA · AI/ML & Data Science`
- **Rotating roles** (order matters — Q1 may change it):
  1. Aspiring Assistant Professor
  2. AI/ML Engineer
  3. Data Scientist
  4. Power BI Analyst

## Career Objective
**Short (Home hero, ~40 words):**
> MCA postgraduate specialising in Artificial Intelligence, Machine Learning and Data Science, with hands-on industry experience from an AI/ML internship at a CMMI Level 5 company. I aim to teach Computer Science the way industry practises it — and keep building AI that matters.

**Long (About intro — from resume Professional Summary):**
> MCA postgraduate specializing in Artificial Intelligence, Machine Learning, and Data Science with outstanding academic performance and hands-on industry experience through an AI/ML internship at Shanti Infosoft LLP (CMMI Level 5 Company). Proficient in Python, machine learning, predictive analytics, and AI-driven application development. Passionate about higher education, student mentoring, and outcome-based education, with a strong interest in research and practical learning. Seeking to contribute as an Assistant Professor by fostering academic excellence, innovation, and industry-aligned Computer Science education.

## Get In Touch (Home CTA block)
- Primary: **Get In Touch** → `/contact`
- Secondary: **Download Resume**
- Icons: LinkedIn · GitHub · Email (`mailto:`)
- Availability badge (pulsing green dot): **"Open to Assistant Professor & AI/ML roles"** ✎

## Open To ✎ (Home small line + Contact page list)
- Assistant Professor roles — Computer Science / AI & ML / Data Science
- AI/ML and Data Science roles
- Guest lectures & workshops on Python, ML and Data Science
- Research collaborations in Healthcare Analytics & Educational Technology

## Stats strip (`highlights.stats`)
| value | suffix | decimals | label |
|---|---|---|---|
| 95 | % | 0 | MCA score |
| 94.8 | % | 1 | BCA score |
| 14 | | 0 | Certifications |
| 5 | + months | 0 | AI/ML internship (see Q11) |

(Alternative 4th stat: `386+` learning hours — sum of stated course hours: 19 + 332 + 12 + 4 + 5 + 7.5 + 6.5 = 386; Kaggle/GfG/ISRO hours not stated, hence "+".)

## Highlight pings (`highlights.pings`)
| icon (lucide) | text | href |
|---|---|---|
| `GraduationCap` | MCA completed · 95% | `/about` |
| `Trophy` | National GOER 2025 Finalist · Team Leader | `/achievements/goer-2025-national-finalist` |
| `BriefcaseBusiness` | AI/ML Intern @ Shanti Infosoft (CMMI L5) | `/experience/shanti-infosoft-ai-ml-intern` |
| `BadgeCheck` | Saylor · Fundamentals of ML · 96% | `/certificates/saylor-cs207-fundamentals-of-ml` |
| `Satellite` | ISRO IIRS workshop · Cyclone forecasting | `/certificates/isro-iirs-tropical-cyclone-workshop` |
| `Brain` | Kaggle · Intro to Deep Learning | `/certificates/kaggle-intro-to-deep-learning` |

## SEO
- Title: `Aditi Singh — AI/ML & Data Science | Aspiring Assistant Professor`
- Description: `Portfolio of Aditi Singh, MCA (95%) in AI/ML & Data Science from AKS University. AI/ML intern at Shanti Infosoft. Projects, certifications, achievements and experience.`
- JSON-LD `Person`: name, jobTitle "AI/ML & Data Science", address Indore IN, alumniOf [AKS University, Makhanlal Chaturvedi National University], sameAs [LinkedIn, GitHub].
