import { useEffect, useRef, useState } from 'react';
import { animate, useInView } from 'framer-motion';
import { ResponsiveImage } from '@/components/ui/ResponsiveImage';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import type { Project } from '@/types';

type BeforeAfterProps = NonNullable<Project['beforeAfter']>;

// Pattern #09 "Before / after" (animation-spec). A native range input drives the divider, so
// drag, click, touch and ←/→ keys all work out of the box. On first view the divider nudges
// 50 → 62 → 50 once to hint that it moves (skipped under reduced motion or after the visitor touches it).
export function BeforeAfter({ before, after, beforeLabel, afterLabel }: BeforeAfterProps) {
  const [position, setPosition] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const touched = useRef(false);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.6 });

  useEffect(() => {
    if (!inView || reduce || touched.current) return;
    const controls = animate(50, [50, 62, 50], {
      duration: 1.2,
      delay: 0.3,
      ease: 'easeInOut',
      onUpdate: (value) => !touched.current && setPosition(value),
    });
    return () => controls.stop();
  }, [inView, reduce]);

  return (
    <figure>
      <div
        ref={ref}
        className="relative select-none overflow-hidden rounded-card border border-line bg-surface-2"
      >
        <ResponsiveImage
          image={after}
          sizes="(min-width: 1024px) 900px, 100vw"
          className="w-full"
        />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
          <ResponsiveImage
            image={before}
            sizes="(min-width: 1024px) 900px, 100vw"
            className="size-full object-cover"
          />
        </div>

        <div
          aria-hidden
          style={{ left: `${position}%` }}
          className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_8px_rgb(0_0_0/0.4)]"
        >
          <span className="absolute left-1/2 top-1/2 grid size-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white font-mono text-xs font-bold text-black shadow-lg">
            ⟷
          </span>
        </div>

        <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-xs font-semibold text-white">
          {beforeLabel}
        </span>
        <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-accent-btn px-2.5 py-1 text-xs font-semibold text-on-accent">
          {afterLabel}
        </span>

        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={Math.round(position)}
          onChange={(event) => {
            touched.current = true;
            setPosition(Number(event.target.value));
          }}
          aria-label={`Compare: ${beforeLabel} (left) and ${afterLabel} (right)`}
          className="absolute inset-0 size-full cursor-ew-resize opacity-0"
        />
      </div>
      <figcaption className="mt-2 text-xs text-muted">
        Drag the handle (or use ← →) to compare {beforeLabel.toLowerCase()} with{' '}
        {afterLabel.toLowerCase()}.
      </figcaption>
    </figure>
  );
}
