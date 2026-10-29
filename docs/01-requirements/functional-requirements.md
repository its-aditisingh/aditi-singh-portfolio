# Functional Requirements

IDs are referenced from feature specs and tests. Priority: **M** = must (v1), **S** = should (v1 if time), **C** = could (v2).

## Global
| ID | Requirement | P |
|---|---|---|
| FR-G1 | Sticky navbar with 7 links: Home, About, Projects, Certificates, Achievements, Experience, Contact. Active link is highlighted. | M |
| FR-G2 | Mobile (< 768px): hamburger opens a full-screen menu; closes on link click, `Esc`, or outside tap. | M |
| FR-G3 | Light/dark theme toggle; defaults to system preference; choice remembered (localStorage, wrapped in try/catch). | S |
| FR-G4 | "Download Resume" available in navbar (desktop) and Home. Downloads `Aditi-Singh-Resume.pdf`. | M |
| FR-G5 | Footer: name, short tagline, social links (LinkedIn, GitHub, Email), © year. | M |
| FR-G6 | Animated page transitions between routes. | M |
| FR-G7 | Scroll-to-top on route change (except when opening a detail modal). | M |
| FR-G8 | 404 page with link back home. | M |
| FR-G9 | Scroll progress bar at top of page. | S |

## Home
| ID | Requirement | P |
|---|---|---|
| FR-H1 | Hero shows name, **job role** (rotating words), and **career objective**. | M |
| FR-H2 | **Get In Touch** CTA → `/contact`; secondary CTAs: Download Resume, LinkedIn, GitHub. | M |
| FR-H3 | Interactive 3D neural-network scene beside/behind the hero text (desktop), reacts to pointer. | M |
| FR-H4 | Count-up stats strip (e.g. 95% MCA, 14 Certifications, 5+ months AI/ML Internship). | M |
| FR-H5 | "Live pings" — small cycling toast cards of recent highlights. | S |
| FR-H6 | Quick-explore cards linking to each section (numbered card style from the reference). | S |
| FR-H7 | Profile photo in an arch frame, layered in front of the 3D scene. | M |
| FR-H8 | "Open to Assistant Professor & AI/ML roles" availability badge. | S |

## About
| ID | Requirement | P |
|---|---|---|
| FR-A1 | **Education** — MCA and BCA with institution, years, score, status. | M |
| FR-A2 | **Technical Skills** grouped by category (AI/ML, Programming, Web, Database, BI & Tools, Cloud). | M |
| FR-A3 | **Currently Learning** list with short note + progress hint. | M |
| FR-A4 | Teaching Competencies, Research Interests, Languages, Academic Engagements. | S |
| FR-A5 | Laid out as an animated bento grid. | M |
| FR-A6 | Profile photo in the intro tile. | M |
| FR-A7 | Teaching Philosophy + Open To tiles. | S |
| FR-A8 | "My Journey" timeline (2021 → Next) with links to related pages. | S |

## Collections (Projects, Certificates, Achievements, Experience)
| ID | Requirement | P |
|---|---|---|
| FR-C1 | Each collection page lists **all** items as cards. | M |
| FR-C2 | Clicking a card opens its **detail view** with all fields for that item. | M |
| FR-C3 | Detail view has its own URL (`/projects/:slug`, etc.). From the list it opens as a modal over the list; on direct visit/refresh it renders as a full page. | M |
| FR-C4 | Detail view: close button, `Esc` closes, browser Back closes, Prev/Next navigation inside the collection. | M |
| FR-C5 | Unknown slug → "not found" state with link back to the list. | M |
| FR-C6 | Certificates page: category filter tabs (All, AI & ML, Data Science, Cloud, Programming & Web, Workshops, Other) + sort by date. | M |
| FR-C7 | Certificate detail: preview image (zoomable), issuer, date, duration, grade, credential ID (copy button), **Verify** link, **View PDF** link. | M |
| FR-C8 | Project detail: overview, problem, features, tech stack, pipeline diagram, screenshots, Live Demo / GitHub links, future scope. | M |
| FR-C9 | Achievement detail: what, when, organisation, her role, story, proof certificate. | M |
| FR-C10 | Experience detail: role, company, type, dates + computed duration, company facts, responsibilities, skills, proof certificate. | M |
| FR-C11 | Experience list renders as a vertical timeline. | M |
| FR-C12 | Featured certificate "shuffle deck" at top of Certificates page. | S |

## Contact
| ID | Requirement | P |
|---|---|---|
| FR-CT1 | Form: Name, Email, Subject, Message; client-side validation with inline errors. | M |
| FR-CT2 | Submit posts to Web3Forms; button shows loading → success (animated) or error with retry. | M |
| FR-CT3 | Honeypot field for spam. | M |
| FR-CT4 | Direct links: email (with copy-to-clipboard), LinkedIn, GitHub, location (Indore, MP). | M |
| FR-CT5 | Phone hidden by default; if enabled, only the masked form `+91 738 •••• 858` is shown. | C |
