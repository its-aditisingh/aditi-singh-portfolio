# Feature: Home

Covers FR-H1 … FR-H6. Content: [05-content/profile.md](../05-content/profile.md).

## Layout (desktop)

```text
┌──────────────────────────────────────────────────────────────┐
│ NAVBAR                                                       │
├───────────────────────────────┬──────────────────────────────┤
│ ● Open to Asst. Prof & AI/ML  │   · ·  3D NEURAL NETWORK · · │
│ Hi, I'm                       │  ·   ╭──────────────╮    ·   │
│ ADITI SINGH        (reveal)   │ ·    │   PHOTO      │  ·     │
│ [ AI/ML Engineer ▲ ] (rotator)│   ·  │  (arch frame)│     ·  │
│ MCA · AI/ML & Data Science    │  ·   │              │   ·    │
│                               │      ╰──────────────╯        │
│ Career objective (2–3 lines)  │   nodes orbit behind photo   │
│                               │                              │
│ [Get In Touch →] [Resume ↓]   │                              │
│ in  gh  ✉                     │      ┌─────────────────┐     │
│                               │      │ ping toast      │     │
├───────────────────────────────┴──────┴─────────────────┴─────┤
│ 95%  MCA │ 94.8% BCA │ 14 Certifications │ 5+ mo Internship   │  ← count-up
├──────────────────────────────────────────────────────────────┤
│ Explore:  01 About  02 Projects  03 Certificates ...          │  ← numbered cards
└──────────────────────────────────────────────────────────────┘
```

Mobile: single column — photo (arch frame, 240px wide) on top, then text; 3D scene becomes a faded background layer behind the photo at 40% opacity (or the SVG fallback); pings show one at a time above the stats.

**Photo frame:** arch shape (rounded top, `border-radius: 999px 999px 28px 28px`), 1px `--line` border, soft accent gradient fading up from the bottom 25%, subtle float (y ±6px, 6s loop). On pointer move it tilts slightly opposite to the 3D scene for depth (parallax). The photo is a normal `<img>` with `fetchpriority="high"` — it's part of the LCP, so it must not wait for the 3D chunk.

## Sections

### 1. Hero — Job role · Career Objective · Get In Touch
| Element | Content | Animation |
|---|---|---|
| Greeting | "Hi, I'm" | part of HeroReveal |
| Name | "Aditi Singh" | **#01 Hero reveal** — per-letter mask slide-up |
| Job role | rotating `profile.roles` | **#02 Word rotator** |
| Headline | `profile.headline` | fade |
| Career objective | `profile.objectiveShort` | fade + blur-in |
| Primary CTA | **Get In Touch** → `/contact` | magnetic hover |
| Secondary CTA | Download Resume | — |
| Social icons | LinkedIn, GitHub, Email | stagger |
| Availability badge | "Open to Assistant Professor & AI/ML roles" | pulsing dot |
| Photo | `aditi-portrait.webp` in arch frame | fade + scale 0.96→1, then float |
| Visual | `<HeroCanvas/>` (lazy) behind photo | see [3d-scene](../04-design/3d-scene.md) |
| Pings | `highlights.pings` | **#03 Highlight pings** |

### 2. Stats strip
`highlights.stats` with **#05 Count-up**, triggered once when 50% in view.

### 3. Explore grid
7 numbered cards in the reference style (`01` mono index · orange icon · bold title) linking to each page, except Home. Hover: lift 4px + icon wiggle. Animated as a light **#06 Bento build** (stagger).

## Acceptance criteria
- [ ] Name, role, objective and CTAs are visible and readable **before** the 3D chunk loads (LCP element = name).
- [ ] Rotator cycles through all roles every 2.4s; screen readers get the full list once.
- [ ] Get In Touch navigates to `/contact`; Resume downloads.
- [ ] Stats animate once, end exactly on the target values.
- [ ] With reduced motion: no rotation (first role only + "· and more" list hidden visually but readable), no 3D, numbers render final values immediately.
- [ ] Pings pause on hover/focus and are hidden from screen readers (`aria-hidden`) since they duplicate page content.
