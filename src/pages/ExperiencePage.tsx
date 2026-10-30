import { useRef } from 'react';
import { motion, useSpring, useTransform, type MotionValue } from 'framer-motion';
import { ExperienceCard } from '@/components/cards/ExperienceCard';
import { CollectionRoute } from '@/components/detail/CollectionRoute';
import { Seo } from '@/components/layout/Seo';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { experience } from '@/data/experience';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useElementProgress } from '@/hooks/useScrollMotion';
import { cn } from '@/lib/cn';

const rail = 'absolute bottom-4 left-[11px] top-4 w-px lg:left-1/2';

// docs/03-features/06-experience.md — vertical timeline; alternating sides from lg.
// #08 Process draw: the accent line draws as you scroll and each node pops when the line reaches it.
export function ExperiencePage() {
  const reduce = useReducedMotion();
  const listRef = useRef<HTMLOListElement>(null);
  const scrollYProgress = useElementProgress(listRef, 0.85, 0.55);
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const last = Math.max(experience.length - 1, 1);

  return (
    <CollectionRoute>
      <Seo
        title="Experience"
        description="Experience of Aditi Singh — AI/ML internship at Shanti Infosoft LLP (CMMI Level 5) and a 332-hour AWS training program."
        path="/experience"
      />
      <section className="container-page pt-10 md:pt-16">
        <SectionHeading
          as="h1"
          index={7}
          eyebrow="Experience"
          title="Experience"
          description="Industry internship and training, on a timeline."
        />

        <ol ref={listRef} className="relative mt-12">
          <span aria-hidden className={cn(rail, 'bg-line')} />
          <motion.span
            aria-hidden
            style={{ scaleY: reduce ? 1 : progress }}
            className={cn(rail, 'origin-top bg-accent')}
          />
          {experience.map((item, i) => {
            const left = i % 2 === 0;
            return (
              <li
                key={item.slug}
                className={cn(
                  'relative pb-10 pl-10 last:pb-0 lg:w-1/2 lg:pl-0',
                  left ? 'lg:pr-12' : 'lg:ml-auto lg:pl-12',
                )}
              >
                <TimelineDot
                  progress={progress}
                  at={i / last}
                  reduce={reduce}
                  className={left ? 'lg:-right-3 lg:left-auto' : 'lg:-left-3'}
                />
                <ExperienceCard item={item} />
              </li>
            );
          })}
        </ol>
      </section>
    </CollectionRoute>
  );
}

interface TimelineDotProps {
  progress: MotionValue<number>;
  /** Point on the line (0–1) where this node sits. */
  at: number;
  reduce: boolean;
  className?: string;
}

function TimelineDot({ progress, at, reduce, className }: TimelineDotProps) {
  const scale = useTransform(progress, [at - 0.08, at], [0.5, 1]);
  const opacity = useTransform(progress, [at - 0.08, at], [0.4, 1]);

  return (
    <motion.span
      aria-hidden
      style={reduce ? undefined : { scale, opacity }}
      className={cn(
        'absolute left-0 top-6 size-6 rounded-full border-4 border-canvas bg-accent',
        className,
      )}
    />
  );
}
