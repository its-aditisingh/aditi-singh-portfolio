import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { DetailLink } from '@/components/detail/DetailLink';
import { ResponsiveImage } from '@/components/ui/ResponsiveImage';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/cn';
import { spring } from '@/lib/motion';
import type { Certificate } from '@/types';

const INTERVAL_MS = 3500;
const FLY_MS = 350;
const SWIPE_PX = 80;

// Pattern #04 "Review shuffle" → featured certificate deck (animation-spec).
// Auto-shuffles every 3.5s (paused on hover/focus, off-screen, hidden tab); ←/→, buttons and swipe
// step through it. Reduced motion: a static stack with step buttons, no fly-out or auto play.
export function ShuffleDeck({ items }: { items: Certificate[] }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const dragged = useRef(false);
  const [order, setOrder] = useState(() => items.map((_, i) => i));
  const [flying, setFlying] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    if (flying !== null) return;
    const top = order[0];
    if (top === undefined) return;
    if (reduce) {
      setOrder((o) => [...o.slice(1), ...o.slice(0, 1)]);
      return;
    }
    setFlying(top);
    window.setTimeout(() => {
      setOrder((o) => [...o.slice(1), ...o.slice(0, 1)]);
      setFlying(null);
    }, FLY_MS);
  }, [flying, order, reduce]);

  const prev = useCallback(() => {
    if (flying !== null) return;
    setOrder((o) => [...o.slice(-1), ...o.slice(0, -1)]);
  }, [flying]);

  useEffect(() => {
    if (reduce || paused || !inView) return;
    const id = window.setInterval(() => !document.hidden && next(), INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [reduce, paused, inView, next]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowRight') next();
    if (event.key === 'ArrowLeft') prev();
  };

  const topIndex = order[0] ?? 0;

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="carousel"
      aria-label="Featured certificates"
      tabIndex={0}
      onKeyDown={onKeyDown}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="rounded-card outline-offset-8"
    >
      <div className="grid pb-14">
        {items.map((cert, idx) => {
          const pos = order.indexOf(idx);
          const isTop = pos === 0;
          const tilt = pos === 0 ? 0 : (pos % 2 ? 1 : -1) * pos * 2;
          return (
            <motion.div
              key={cert.slug}
              aria-hidden={!isTop}
              // Scale from the bottom edge so each card behind peeks out below the one in front
              style={{ gridArea: '1 / 1', zIndex: items.length - pos, originY: 1 }}
              initial={false}
              animate={
                flying === idx
                  ? { x: '120%', rotate: 12, opacity: 0 }
                  : {
                      x: 0,
                      y: pos * 14,
                      scale: 1 - pos * 0.05,
                      rotate: tilt,
                      opacity: pos > 3 ? 0 : 1,
                    }
              }
              transition={spring.soft}
              drag={isTop && !reduce ? 'x' : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.6}
              onDragStart={() => (dragged.current = true)}
              onDragEnd={(_, info) => {
                if (Math.abs(info.offset.x) > SWIPE_PX) next();
                window.setTimeout(() => (dragged.current = false), 0);
              }}
              className={isTop ? 'cursor-grab active:cursor-grabbing' : 'pointer-events-none'}
            >
              <DetailLink
                to={`/certificates/${cert.slug}`}
                tabIndex={isTop ? 0 : -1}
                onClick={(event) => dragged.current && event.preventDefault()}
                draggable={false}
                className="group block overflow-hidden rounded-card border border-line bg-surface shadow-card"
              >
                <div className="aspect-[4/3] border-b border-line bg-white p-3">
                  <ResponsiveImage
                    image={cert.image}
                    sizes="380px"
                    // The card on top at first paint is the page's LCP image (Lighthouse, Phase 8)
                    priority={idx === 0}
                    className="pointer-events-none size-full select-none object-contain"
                  />
                </div>
                {/* Text only on the top card — tilted titles behind it would overlap */}
                <div
                  className={cn(
                    'flex items-end justify-between gap-3 p-4 transition-opacity duration-300',
                    !isTop && 'opacity-0',
                  )}
                >
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-[0.06em] text-muted">
                      {cert.issuer}
                    </p>
                    <p className="mt-1 line-clamp-1 font-bold text-ink">{cert.title}</p>
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-accent-ink">
                    View
                    <ArrowUpRight aria-hidden className="size-4" />
                  </span>
                </div>
              </DetailLink>
            </motion.div>
          );
        })}
      </div>

      <div className="flex items-center justify-between">
        <span className="font-mono text-xs text-muted" aria-live="polite">
          {topIndex + 1} / {items.length}
        </span>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous featured certificate"
            className="grid size-10 place-items-center rounded-full border border-line bg-surface text-ink transition-colors hover:bg-surface-2"
          >
            <ArrowLeft aria-hidden className="size-4" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next featured certificate"
            className="grid size-10 place-items-center rounded-full border border-line bg-surface text-ink transition-colors hover:bg-surface-2"
          >
            <ArrowRight aria-hidden className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
