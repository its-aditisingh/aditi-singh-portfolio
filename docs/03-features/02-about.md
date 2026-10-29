# Feature: About

Covers FR-A1 … FR-A5. Content: [05-content/education-and-skills.md](../05-content/education-and-skills.md).

## Layout — bento grid (**#06 Bento build**)

```text
desktop (4 cols)
┌───────────────────────────┬─────────────┬─────────────┐
│ INTRO (objectiveLong)     │ MCA  95%    │ BCA  94.8%  │
│ + photo/avatar (if Q2)    │ (count-up)  │ (count-up)  │
├─────────────┬─────────────┴─────────────┼─────────────┤
│ CURRENTLY   │ TECHNICAL SKILLS          │ LANGUAGES   │
│ LEARNING    │ (6 groups, chips)         │ EN · HI     │
│ (3 items,   │                           ├─────────────┤
│ pulsing dot)│                           │ RESEARCH    │
├─────────────┴───────────┬───────────────┤ INTERESTS   │
│ TEACHING COMPETENCIES   │ ACADEMIC      │             │
│ (4 groups)              │ ENGAGEMENTS   │             │
├─────────────────────────┴───────────┬───┴─────────────┤
│ TEACHING PHILOSOPHY (quote) ✎       │ OPEN TO ✎       │
├─────────────────────────────────────┴─────────────────┤
│ CLASSROOM ⟷ INDUSTRY  (#11 Compare columns, optional)  │
└────────────────────────────────────────────────────────┘

below the bento:
┌────────────────────────────────────────────────────────┐
│ MY JOURNEY  2021 ──●── 2024 ──●── Mar'25 ──●── … → Next │  (#08 Process draw)
└────────────────────────────────────────────────────────┘
```
Intro tile uses the portrait photo (rounded 20px, left side) next to `objectiveLong`.
Tablet: 2 cols. Mobile: 1 col, order = Intro → Education → Skills → Currently Learning → Teaching → Research → Engagements → Languages.

## Tiles
| Tile | Required fields | Notes |
|---|---|---|
| **Education** (×2) | degree, full name, institution, years, score, status | Score uses **#05 Count-up** with 1 decimal for 94.8. Click → expands to show institution location. |
| **Technical Skills** | 6 `SkillGroup`s | Chips; hover a chip → glow. Category icon in orange. |
| **Currently Learning** | `LearningItem[]` | Each item: topic, one-line note, small "evidence" link (e.g. Kaggle cert). Animated "live" dot. |
| Teaching Competencies | 4 groups | Matches resume table. |
| Research Interests | list | Tag cloud. |
| Academic Engagements | 3 bullets | Seminars, workshops, peer help. |
| Languages | English (Professional), Hindi (Native) | |
| Compare (optional) | Classroom vs Industry | **#11** — S priority. |
| Teaching Philosophy ✎ | quote text | Large quote mark in accent; draft text — owner edits. |
| Open To ✎ | 4 items | Same list as Contact page. |
| **My Journey** | `JourneyItem[]` from [journey.md](../05-content/journey.md) | Separate section under the bento. Each node links to its page. Horizontal scroll-snap (desktop) / vertical (mobile). |

## Acceptance criteria
- [ ] Education, Technical Skills, Currently Learning are present and above the fold on desktop (first two rows).
- [ ] Bento tiles assemble with stagger on first view only; no re-animation on scroll back.
- [ ] All tiles readable at 320px width.
- [ ] Every skill listed exists in [05-content](../05-content/education-and-skills.md); nothing invented.
