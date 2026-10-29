# Project Overview

## 1. Goal
Build a fast, animated, interactive portfolio for **Aditi Singh** that a recruiter, university hiring panel, or collaborator can scan in under a minute and explore in depth if interested.

## 2. Audience & what they want
| Visitor | Wants to see quickly | Primary page |
|---|---|---|
| University / college hiring panel (Assistant Professor roles) | Degrees + scores, teaching competencies, seminars, research interests | Home → About |
| Tech recruiter (AI/ML / Data roles) | Skills, internship, projects with live demos, certifications | Projects, Experience |
| Peers / students | Projects, what she's learning | Projects, About |

Because her resume targets **Assistant Professor**, the site should present her as an *educator with real industry AI/ML experience* — not only as a developer. (See open question Q1 about the headline role.)

## 3. Scope

### In scope
- 7 navbar pages: Home, About, Projects, Certificates, Achievements, Experience, Contact.
- Card grid + detail view for Projects, Certificates, Achievements, Experience.
- Certificate viewer (image preview + original PDF + verify link).
- Resume download.
- Contact form (no own backend) + direct links.
- 12 animation patterns from the reference screenshot (mapped in [animation-spec](../04-design/animation-spec.md)).
- One WebGL 3D hero scene + CSS-3D card tilts.
- Light/dark theme.
- Responsive (mobile-first), SEO meta + Open Graph, accessible.

### Out of scope (v1)
- CMS / admin panel (content edited in TS files).
- Blog.
- Multi-language (Hindi) — possible v2.
- Analytics (can add Vercel Analytics later — needs spec update).

## 4. Success criteria
- Lighthouse (mobile): Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95.
- Every certificate/achievement/experience entry is backed by a viewable proof file.
- Any detail view is shareable via its own URL.
- Works on latest Chrome, Edge, Firefox, Safari, and Android Chrome / iOS Safari.

## 5. Constraints
- Frontend only; static hosting.
- Content must be truthful and match the source documents exactly.
