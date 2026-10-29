import type { PointerEvent, ReactNode } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const MAX_PULL = 6; // px

/** Primary CTAs lean towards the cursor (animation-spec, micro-interactions). Mouse only. */
export function Magnetic({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 300, damping: 20 });
  const y = useSpring(useMotionValue(0), { stiffness: 300, damping: 20 });

  const onMove = (event: PointerEvent<HTMLSpanElement>) => {
    if (reduce || event.pointerType !== 'mouse') return;
    const rect = event.currentTarget.getBoundingClientRect();
    const dx = (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const dy = (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    x.set(dx * MAX_PULL);
    y.set(dy * MAX_PULL);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      style={{ x, y }}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className="inline-flex"
    >
      {children}
    </motion.span>
  );
}
