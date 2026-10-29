# Feature: Contact (replaces "api")

Covers FR-CT1 … FR-CT5.

## Layout
```text
┌───────────────────────────────┬───────────────────────────┐
│ Let's talk.                   │  Name        [          ] │
│ Open to Assistant Professor   │  Email       [          ] │
│ roles, AI/ML & data           │  Subject     [          ] │
│ opportunities, collaborations.│  Message     [          ] │
│                               │              [          ] │
│ ✉ adytisingh@gmail.com [copy] │                           │
│ in linkedin.com/in/adyti      │  [   Send message  →   ]  │  ← #12 Click → success
│ gh github.com/its-aditisingh  │                           │
│ ⌖ Indore, Madhya Pradesh      │                           │
└───────────────────────────────┴───────────────────────────┘
```

Below the links: **Open to** list (same 4 items as About) ✎.

**Phone:** not shown (`profile.showPhone === false`). If the flag is ever turned on, render only the masked string `+91 738 •••• 858` as plain text — no `tel:` link, no copy button.

## Form
| Field | Rule | Error text |
|---|---|---|
| Name | required, 2–80 chars | "Please enter your name." |
| Email | required, valid email | "Please enter a valid email address." |
| Subject | optional, ≤ 120 chars | — |
| Message | required, 10–2000 chars | "Message should be at least 10 characters." |
| `botcheck` | hidden honeypot; if filled, silently "succeed" without sending | — |

Validate on blur and on submit; errors announced via `aria-describedby` + `aria-invalid`.

## Submission (no own backend)
```text
POST https://api.web3forms.com/submit
Content-Type: application/json
{ access_key: VITE_WEB3FORMS_KEY, name, email, subject, message, botcheck,
  from_name: "Portfolio contact form" }
```
- Success (`success: true`) → **#12** button morphs: label → spinner → ✓ "Message sent!" + small confetti burst (orange/neutral particles, 600ms). Form resets after 2s.
- Failure / network error → button shakes, inline error "Couldn't send right now. Email me directly at adytisingh@gmail.com." with Retry.
- Button disabled while sending; double-submit prevented.
- If `VITE_WEB3FORMS_KEY` is missing at build time → form hidden, show email CTA only (and log a console warning in dev).

## Acceptance criteria
- [ ] Valid submission reaches the inbox (manual test with real key).
- [ ] Invalid fields block submit and focus the first invalid field.
- [ ] Copy email shows "Copied ✓".
- [ ] Works with keyboard only; success state is announced (`role="status"`).
