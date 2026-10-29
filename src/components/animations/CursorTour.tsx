import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { RotateCcw } from 'lucide-react';
import { ResponsiveImage } from '@/components/ui/ResponsiveImage';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/cn';
import { spring } from '@/lib/motion';
import type { ImageRef, Project } from '@/types';

interface CursorTourProps {
  image: ImageRef;
  /** Above the fold on the project page — it's the LCP image there. */
  priority?: boolean;
  stops: NonNullable<Project['cursorTour']>;
}

const STOP_MS = 1500;
const START = { x: 50, y: 96 };

// Pattern #07 "Cursor tour" (animation-spec): a cursor visits each numbered pin, with a ripple and
// a label. Plays once when in view; "Replay" restarts it. The numbered pins + legend are the
// reduced-motion form and stay visible for everyone.
export function CursorTour({ image, stops, priority = false }: CursorTourProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [step, setStep] = useState(-1); // -1 idle · 0…n-1 at a stop · n finished
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (reduce || !inView) return;
    const timers = stops.map((_, i) => window.setTimeout(() => setStep(i), 500 + i * STOP_MS));
    timers.push(window.setTimeout(() => setStep(stops.length), 500 + stops.length * STOP_MS));
    return () => timers.forEach((id) => window.clearTimeout(id));
  }, [reduce, inView, stops, run]);

  const current = stops[step];
  const touring = !reduce && step >= 0 && step < stops.length;
  const position = current ?? START;
  const labelOnLeft = position.x > 60;

  return (
    <figure>
      <div
        ref={ref}
        className="relative overflow-hidden rounded-card border border-line bg-surface-2"
      >
        <ResponsiveImage
          image={image}
          sizes="(min-width: 1024px) 900px, 100vw"
          priority={priority}
          className="w-full"
        />

        {stops.map((stop, i) => (
          <span
            key={stop.label}
            aria-hidden
            style={{ left: `${stop.x}%`, top: `${stop.y}%` }}
            className={cn(
              'absolute grid size-7 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full font-mono text-xs font-bold shadow-lg ring-4 transition-colors',
              step === i
                ? 'bg-white text-accent-ink ring-accent/60'
                : 'bg-accent-btn text-on-accent ring-white/60',
            )}
          >
            {i + 1}
          </span>
        ))}

        {!reduce && (
          <AnimatePresence>
            {touring && current && (
              <motion.span
                key={`ripple-${run}-${step}`}
                aria-hidden
                style={{ left: `${current.x}%`, top: `${current.y}%` }}
                initial={{ scale: 0.6, opacity: 0.9 }}
                animate={{ scale: 2.4, opacity: 0 }}
                transition={{ duration: 0.9 }}
                className="pointer-events-none absolute size-8 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white"
              />
            )}
          </AnimatePresence>
        )}

        {!reduce && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute"
            initial={false}
            animate={{
              left: `${position.x}%`,
              top: `${position.y}%`,
              opacity: step >= 0 && step < stops.length ? 1 : 0,
            }}
            transition={{ ...spring.soft, opacity: { duration: 0.3 } }}
          >
            {/* cursor tip sits at the point */}
            <svg viewBox="0 0 24 24" className="size-7 drop-shadow-[0_2px_4px_rgb(0_0_0/0.5)]">
              <path
                d="M4 3l7.5 18 2.4-7.1L21 11.5 4 3z"
                fill="white"
                stroke="black"
                strokeWidth={1.2}
              />
            </svg>
            <AnimatePresence mode="wait">
              {touring && current && (
                <motion.span
                  key={`label-${run}-${step}`}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, delay: 0.35 }}
                  className={cn(
                    'absolute top-7 whitespace-nowrap rounded-lg bg-ink px-2.5 py-1.5 text-xs font-semibold text-canvas shadow-lg',
                    labelOnLeft ? 'right-2' : 'left-5',
                  )}
                >
                  {current.label}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      <figcaption className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <ol className="grid flex-1 gap-2 sm:grid-cols-2">
          {stops.map((stop, i) => (
            <li
              key={stop.label}
              className={cn(
                'flex gap-2.5 text-sm transition-colors',
                step === i ? 'text-ink' : 'text-ink/85',
              )}
            >
              <span className="grid size-6 shrink-0 place-items-center rounded-full bg-accent-soft font-mono text-[11px] font-bold text-accent-ink">
                {i + 1}
              </span>
              {stop.label}
            </li>
          ))}
        </ol>
        {!reduce && (
          <button
            type="button"
            onClick={() => {
              setStep(-1);
              setRun((r) => r + 1);
            }}
            disabled={touring}
            className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-semibold text-ink transition-colors hover:bg-surface-2 disabled:opacity-50"
          >
            <RotateCcw aria-hidden className="size-3.5" />
            Replay tour
          </button>
        )}
      </figcaption>
    </figure>
  );
}
