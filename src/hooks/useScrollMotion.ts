import { useEffect, type RefObject } from 'react';
import { useMotionValue, type MotionValue } from 'framer-motion';

/**
 * Lightweight replacements for Framer's `useScroll`.
 *
 * Why (Phase 8 profiling): `useScroll` re-measures scrollHeight/clientHeight on *every* animation
 * frame, even when nothing scrolls. With other animations dirtying styles each frame, that forced
 * a full page layout per frame (~6 s of main thread in a 6 s load at 4× CPU). These hooks read
 * layout only after a real scroll or resize, at most once per frame.
 */
function onScrollFrame(update: () => void) {
  let frame = 0;
  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(() => ((frame = 0), update()));
  };
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  update();
  return () => {
    window.removeEventListener('scroll', schedule);
    window.removeEventListener('resize', schedule);
    cancelAnimationFrame(frame);
  };
}

/** Window scroll offset in px. */
export function useScrollY(): MotionValue<number> {
  const scrollY = useMotionValue(0);
  useEffect(() => onScrollFrame(() => scrollY.set(window.scrollY)), [scrollY]);
  return scrollY;
}

/** Page scroll progress 0–1. */
export function usePageProgress(): MotionValue<number> {
  const progress = useMotionValue(0);
  useEffect(
    () =>
      onScrollFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        progress.set(max > 0 ? Math.min(window.scrollY / max, 1) : 0);
      }),
    [progress],
  );
  return progress;
}

/**
 * Progress 0–1 of an element through the viewport: 0 when its top reaches `start` (fraction of
 * viewport height from the top), 1 when its bottom reaches `end`. Same as Framer's
 * offset ['start <start>', 'end <end>'].
 */
export function useElementProgress(
  ref: RefObject<HTMLElement>,
  start = 0.85,
  end = 0.55,
): MotionValue<number> {
  const progress = useMotionValue(0);
  useEffect(
    () =>
      onScrollFrame(() => {
        const node = ref.current;
        if (!node) return;
        const rect = node.getBoundingClientRect();
        const vh = window.innerHeight;
        const from = vh * start; // top of element here → 0
        const distance = rect.height + vh * start - vh * end; // until bottom reaches vh*end → 1
        const value = distance > 0 ? (from - rect.top) / distance : 1;
        progress.set(Math.min(Math.max(value, 0), 1));
      }),
    [ref, start, end, progress],
  );
  return progress;
}
