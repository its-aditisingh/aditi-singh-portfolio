import { useEffect, useRef } from 'react';
import { animate, useInView } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { ease } from '@/lib/motion';

interface CountUpProps {
  value: number;
  decimals?: number;
  className?: string;
}

// Pattern #05 "Count-up stats" (animation-spec). Writes straight to the DOM (no re-render per frame).
// Purely visual: callers keep the real value in screen-reader text. Reduced motion → final value.
export function CountUp({ value, decimals = 0, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const final = value.toFixed(decimals);

  useEffect(() => {
    const node = ref.current;
    if (!node || reduce || !inView) return;
    const controls = animate(0, value, {
      duration: 1.4,
      ease: ease.out,
      onUpdate: (latest) => (node.textContent = latest.toFixed(decimals)),
    });
    return () => controls.stop();
  }, [inView, reduce, value, decimals]);

  return (
    <span ref={ref} aria-hidden className={className}>
      {reduce ? final : (0).toFixed(decimals)}
    </span>
  );
}
