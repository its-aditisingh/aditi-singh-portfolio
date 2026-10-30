# Feature: Experience

Covers FR-C1 … FR-C5, FR-C10, FR-C11. Content: [05-content/experience.md](../05-content/experience.md).

## List page `/experience` — timeline
```text
   ●── Jan 2026 – Jun 2026 · 6 mos ───────────────────────────
   │   AI/ML Intern (Industry Immersion)          [Internship]
   │   Shanti Infosoft LLP, Indore · CMMI L5
   │   one-line summary · 4 skill chips          [View details →]
   │
   ●── May 2025 ───────────────────────────────────────────────
   │   Advanced Program on Amazon Web Services      [Training]
   │   Anudip Foundation (supported by Accenture) · 332 hrs · A1
   │
   ●── 2024 – 2026 (optional, Q-dependent) ────────────────────
       Academic Engagements — AKS University          [Academic]
```
- Vertical line **draws as you scroll** (**#08 Process draw**, `pathLength` bound to scroll progress of the section). Each node dot pops when the line reaches it.
- Desktop: alternating left/right cards. Mobile: line on the left, cards right.
- Card click → detail (modal route).

## Detail `/experience/:slug`
1. Header — role, organisation, type badge, location, date range + computed duration ("6 months").
2. Organisation facts — chips (CMMI Level 5, ISO 9001:2015).
3. Summary.
4. Responsibilities — check-list that ticks in sequence.
5. Skills & tools — chips.
6. Learnings (if any).
7. **Classroom vs Industry** — **#11 Compare columns** (internship only, optional S).
8. Proof — certificate image (rotated correctly), credential ID with copy, View PDF.
9. Prev / Next.

## Acceptance criteria
- [ ] Duration computed from dates (`format.ts`), not hard-coded.
- [ ] Timeline line draw is scroll-linked and static under reduced motion.
- [ ] Internship certificate displays upright.
