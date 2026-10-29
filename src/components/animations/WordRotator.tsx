import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { ease } from '@/lib/motion';

const INTERVAL_MS = 2400;

// Pattern #02 "Word rotator" (animation-spec). No width morph: the role sits alone on its line,
// and a Framer `layout` node here kept the projection tree re-measuring every frame (Phase 8). Screen readers get the full list once;
// the rotating word is aria-hidden. Pauses off-screen and in hidden tabs; static under reduced motion.
export function WordRotator({ words }: { words: string[] }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce || !inView || words.length < 2) return;
    const id = window.setInterval(() => {
      if (!document.hidden) setIndex((i) => (i + 1) % words.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [reduce, inView, words.length]);

  const word = words[reduce ? 0 : index] ?? '';

  return (
    <>
      <span className="sr-only">{words.join(', ')}</span>
      <motion.span
        ref={ref}
        aria-hidden
        className="relative inline-flex overflow-hidden pb-1 align-bottom"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={word}
            initial={{ y: '100%', opacity: 0, filter: 'blur(4px)' }}
            animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
            exit={{ y: '-100%', opacity: 0, filter: 'blur(4px)' }}
            transition={{ duration: 0.45, ease: ease.out }}
            className="inline-block whitespace-nowrap"
          >
            {word}
            {/* accent underline sweeps under each new word */}
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.15, ease: ease.out }}
              className="absolute inset-x-0 bottom-0 h-[3px] origin-left rounded-full bg-accent/40"
            />
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </>
  );
}
