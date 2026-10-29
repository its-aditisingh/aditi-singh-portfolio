import type { Variants } from 'framer-motion';

// Shared motion tokens — docs/04-design/animation-spec.md
export const ease = {
  out: [0.22, 1, 0.36, 1],
  inOut: [0.65, 0, 0.35, 1],
} as const;

export const spring = {
  soft: { type: 'spring', stiffness: 220, damping: 26 },
  snappy: { type: 'spring', stiffness: 420, damping: 30 },
} as const;

export const dur = {
  fast: 0.15,
  base: 0.3,
  slow: 0.6,
} as const;

export const stagger = {
  letters: 0.04,
  cards: 0.06,
} as const;

/* ---------- Reusable variants ---------- */

/** Parent that reveals its `item` children one after another. */
export const staggerParent = (gap: number = stagger.cards, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren: delay } },
});

/** #06 Bento build — tiles assemble from slightly below and smaller. */
export const bentoItem: Variants = {
  hidden: { opacity: 0, scale: 0.92, y: 24 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: dur.slow, ease: ease.out } },
};

/** Generic fade-up for lines of text and list items. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: ease.out } },
};

/** whileInView settings shared by section reveals: once, when a bit is visible. */
export const inViewOnce = { once: true, amount: 0.15 } as const;
