# Feature: Layout, Navbar, Footer

Covers FR-G1 … FR-G9.

## Navbar
- **Desktop (≥ 1024px):** logo/monogram "AS" left · 7 links center · theme toggle + "Resume" button right.
- **Tablet/Mobile (< 1024px):** logo left · theme toggle + hamburger right.
- Sticky; transparent over the hero, gains `surface` background + blur + bottom border after 24px scroll.
- Hides on scroll down, reveals on scroll up (desktop and mobile). Never hides while the mobile menu is open.
- **Active indicator:** orange pill behind the active link, that slides between links (`useSlidingIndicator` + CSS transition — not Framer `layoutId`, see animation-spec performance rule).
- Links are `NavLink`s; detail routes keep parent active (`/certificates/x` → Certificates).

## Mobile menu
- Full-screen overlay, `surface` bg. Links listed large with mono index numbers (`01 Home`, `02 About` …) — echoes the reference cards.
- Links stagger in (40ms each). Closes on link click, `Esc`, or ✕. Focus trapped while open; body scroll locked.

## Footer
- Left: "Aditi Singh" + motto *"Learning never exhausts the mind; it only expands the possibilities."*
- Right: LinkedIn, GitHub, Email icon buttons.
- Bottom: `© {currentYear} Aditi Singh · Built with React & TypeScript`.

## Page transition
- Wrapper `<PageTransition>` with `AnimatePresence mode="wait"`: exit = fade + 8px up (150ms), enter = fade + 12px from below (300ms, ease-out).
- Reduced motion: fade only, 120ms.

## Scroll progress
- 2px orange bar fixed at the very top, `scaleX` bound to page scroll (`usePageProgress`, updated only on scroll/resize).

## Acceptance criteria
- [ ] All 7 links navigate correctly; active state correct on list and detail routes.
- [ ] Mobile menu: opens/closes via button, `Esc`, link click; focus returns to hamburger on close.
- [ ] Resume button downloads the PDF (`download` attribute, correct filename).
- [ ] Theme toggle persists after reload; no flash of wrong theme (inline script in `index.html` sets class before paint).
- [ ] No layout shift when navbar changes background.
