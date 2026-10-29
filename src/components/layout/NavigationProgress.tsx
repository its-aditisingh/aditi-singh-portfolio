import { AnimatePresence, motion } from 'framer-motion';
import { useNavigation } from 'react-router-dom';

/** Thin bar while the router fetches a lazy page (usually a few hundred ms on a slow network). */
export function NavigationProgress() {
  const loading = useNavigation().state === 'loading';

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          aria-hidden
          initial={{ scaleX: 0, opacity: 1 }}
          animate={{ scaleX: 0.85, transition: { duration: 2, ease: [0.1, 0.6, 0.2, 1] } }}
          exit={{ scaleX: 1, opacity: 0, transition: { duration: 0.25 } }}
          className="fixed inset-x-0 top-0 z-[61] h-0.5 origin-left bg-accent-ink"
        />
      )}
    </AnimatePresence>
  );
}
