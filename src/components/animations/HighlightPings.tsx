import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { pings } from '@/data/highlights';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/cn';
import { icons } from '@/lib/icons';
import { ease } from '@/lib/motion';

const SHOW_MS = 3500;

// Pattern #03 "Sale pings" → highlight pings (animation-spec). Decorative duplicates of page
// content, so hidden from assistive tech and out of the tab order. Hidden under reduced motion.
export function HighlightPings({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduce || paused || !inView) return;
    const id = window.setInterval(() => {
      if (!document.hidden) setIndex((i) => (i + 1) % pings.length);
    }, SHOW_MS);
    return () => window.clearInterval(id);
  }, [reduce, paused, inView]);

  if (reduce) return null;
  const ping = pings[index];
  if (!ping) return null;
  const Icon = icons[ping.icon];

  return (
    <div
      ref={ref}
      aria-hidden
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      className={cn('pointer-events-auto', className)}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={ping.text}
          initial={{ opacity: 0, y: 12, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.96 }}
          transition={{ duration: 0.35, ease: ease.out }}
        >
          <Link
            to={ping.href}
            tabIndex={-1}
            className="flex w-max max-w-[280px] items-center gap-2.5 rounded-full border border-line bg-surface/95 py-1.5 pl-1.5 pr-4 text-[13px] font-medium text-ink shadow-card backdrop-blur transition-shadow hover:shadow-card-hover"
          >
            <span className="relative grid size-8 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
              <Icon className="size-4" strokeWidth={1.75} />
              <span className="absolute -right-0.5 -top-0.5 flex size-2.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-70" />
                <span className="relative inline-flex size-2.5 rounded-full border-2 border-surface bg-accent" />
              </span>
            </span>
            <span className="truncate">{ping.text}</span>
          </Link>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
