import { useRef } from 'react';
import { useLocation, useOutlet } from 'react-router-dom';
import { AnimatePresence, motion, useIsPresent } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { isModalState } from '@/lib/modalRoute';
import { dur, ease } from '@/lib/motion';

/** Live outlet while the page is current; frozen to its last value while it animates out. */
function FrozenOutlet() {
  const outlet = useOutlet();
  const isPresent = useIsPresent();
  const last = useRef(outlet);
  if (isPresent) last.current = outlet;
  return last.current;
}

/** Route outlet with fade + slide between pages (layout spec "Page transition"). */
export function AnimatedOutlet() {
  const { pathname, state } = useLocation();
  const reduce = useReducedMotion();
  // A detail opened as a modal belongs to its list page: keep the key so the list doesn't transition
  const key = isModalState(state) ? `/${pathname.split('/')[1] ?? ''}` : pathname;

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={key}
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { duration: reduce ? 0.12 : dur.base, ease: ease.out },
        }}
        exit={{
          opacity: 0,
          ...(reduce ? {} : { y: -8 }),
          transition: { duration: reduce ? 0.12 : dur.fast, ease: ease.out },
        }}
      >
        <FrozenOutlet />
      </motion.div>
    </AnimatePresence>
  );
}
