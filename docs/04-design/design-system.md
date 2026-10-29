# Design System

Visual direction taken from the reference screenshot: **warm off-white canvas, white rounded cards, orange accent, mono index numbers, thin orange line icons, bold sans titles.**

## 1. Color tokens (`src/styles/globals.css`)

| Token | Light | Dark | Use |
|---|---|---|---|
| `--bg` | `#FBF7F3` | `#0F0D0C` | Page background |
| `--bg-glow` | `#FFE9DD` | `#2A160D` | Soft radial glow behind hero (as in reference top-right) |
| `--surface` | `#FFFFFF` | `#1A1716` | Cards, navbar, modal |
| `--surface-2` | `#F5EFEA` | `#231F1D` | Chips, inputs, nested tiles |
| `--line` | `#EDE5DF` | `#2E2825` | Borders, dividers |
| `--ink` | `#16130F` | `#F6F1EC` | Headings, body |
| `--muted` | `#6E655E` | `#A69C94` | Secondary text, mono indices |
| `--accent` | `#EA5A24` | `#FF7A45` | Icons, active pill, buttons, lines |
| `--accent-ink` | `#B8410F` | `#FF9A6E` | Accent **text** (meets 4.5:1 on surface) |
| `--accent-soft` | `#FDE7DC` | `#3A1E12` | Badge bg, hover tint |
| `--success` | `#1F9D55` | `#3CCB7F` | Form success |
| `--danger` | `#D64545` | `#FF6B6B` | Form errors |

| `--accent-btn` | `#C94410` | `#FF7A45` | Primary button fill |
| `--on-accent` | `#FFFFFF` | `#0F0D0C` | Text/icon on `--accent-btn` |

Rules: raw `--accent` only for icons/fills/large text; text in orange uses `--accent-ink`. Tailwind maps `bg-canvas` (= `--bg`), `bg-surface`, `text-ink`, `text-accent` etc. to these vars.

**Why `--accent-btn`:** white text on `#EA5A24` is only ~3.5:1 (fails AA for 15px button text). `#C94410` + white ≈ 4.9:1. In dark mode the button uses the bright accent with near-black text (≈ 7:1).

**Implementation:** tokens are stored as space-separated RGB triplets (`--accent: 234 90 36;`) so Tailwind opacity modifiers work (`bg-surface/80`). Dark tokens live under `.dark` on `<html>`.

## 2. Typography
| Role | Font | Size (mobile → desktop) | Weight |
|---|---|---|---|
| Display (hero name) | Plus Jakarta Sans | 44 → 88 px, `-0.03em` | 800 |
| H1 page title | Plus Jakarta Sans | 34 → 56 px | 800 |
| H2 section | Plus Jakarta Sans | 26 → 36 px | 700 |
| Card title | Plus Jakarta Sans | 18 → 22 px, `-0.01em` | 700 |
| Body | Plus Jakarta Sans | 16 → 17 px, 1.65 lh | 400 |
| Small | Plus Jakarta Sans | 14 px | 500 |
| Mono index / numbers | JetBrains Mono | 12–14 px, `0.04em` | 500 |
| Stats | JetBrains Mono | 40 → 64 px, tabular-nums | 600 |

## 3. Spacing, radius, shadow
- Spacing scale: Tailwind default (4px base). Section vertical padding: 64px mobile / 112px desktop. Content max-width 1200px, gutter 16px mobile / 24px desktop.
- Radius: cards `20px` (`rounded-[20px]`, matches reference), buttons/chips `999px`, inputs `14px`, modal `28px`.
- Shadow (light): `0 1px 2px rgb(22 19 15 / .04), 0 8px 24px rgb(22 19 15 / .06)`; hover: `0 12px 32px rgb(234 90 36 / .14)`. Dark mode uses border + subtle glow instead of shadow.

## 4. Signature component — `IndexCard`
Directly from the reference:
```text
┌──────────────────────────┐
│ 01                    ✦  │  ← mono index (muted) · lucide icon (accent, 22px, stroke 1.75)
│                          │
│                          │
│ Hero reveal              │  ← bold title, bottom-left
└──────────────────────────┘
```
- Used for: Home explore grid, Achievements cards, mobile menu links, About tiles headers.
- Aspect ~ 1.6:1, padding 18px, white surface, 20px radius.
- Hover: translateY(-4px), shadow-hover, icon rotates -8° and scales 1.1 (spring).

## 5. Buttons
| Variant | Style |
|---|---|
| Primary | `--accent` bg, white text, pill, 48px height, arrow icon slides 4px on hover, magnetic pull (max 6px) on desktop |
| Secondary | `--surface` bg, `--line` border, ink text |
| Ghost | text only, accent-ink, underline on hover |
| Icon | 44×44 round, surface bg |

## 6. Chips & badges
- Skill chip: `--surface-2` bg, 13px medium text, 6×12 padding.
- Category badge: `--accent-soft` bg, `--accent-ink` text, uppercase 11px mono.

## 7. Iconography (lucide)
Navbar/sections: Home `House`, About `UserRound`, Projects `FolderGit2`, Certificates `BadgeCheck`, Achievements `Trophy`, Experience `BriefcaseBusiness`, Contact `Send`. Skills: AI/ML `Brain`, Programming `Code2`, Web `Globe`, Database `Database`, BI & Tools `BarChart3`, Cloud `Cloud`.

## 8. Background texture
- Light: soft radial `--bg-glow` blob top-right (as in reference) + very faint dot grid (4% opacity).
- Dark: same blob at lower intensity; 3D scene glow complements it.

## 9. Breakpoints
`sm 640 · md 768 · lg 1024 · xl 1280 · 2xl 1536`. Mobile-first.
