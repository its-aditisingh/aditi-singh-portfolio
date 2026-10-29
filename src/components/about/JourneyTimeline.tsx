import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { journey } from '@/data/journey';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/cn';
import { fadeUp, inViewOnce, staggerParent } from '@/lib/motion';
import type { JourneyItem } from '@/types';

// FR-A8 · docs/05-content/journey.md. Vertical on mobile, horizontal scroll-snap from md up.
// Steps fade up one after another on first view (light take on #08 — the rail itself stays static).
export function JourneyTimeline() {
  const reduce = useReducedMotion();

  return (
    <section aria-labelledby="journey-heading" className="container-page mt-20 md:mt-28">
      <div className="flex items-end justify-between gap-6">
        <SectionHeading
          id="journey-heading"
          eyebrow="My journey"
          title="From BCA to the classroom"
          description="Every step below is backed by a result, a certificate or a project."
        />
        <p aria-hidden className="hidden shrink-0 font-mono text-xs text-muted md:block">
          Scroll →
        </p>
      </div>

      <motion.ol
        variants={staggerParent(0.08)}
        initial={reduce ? false : 'hidden'}
        whileInView="show"
        viewport={inViewOnce}
        className={cn(
          'relative mt-10',
          // mobile: vertical rail
          'space-y-7 pl-8 before:absolute before:bottom-2 before:left-[7px] before:top-2 before:w-px before:bg-line',
          // md+: horizontal, scrollable
          'md:flex md:gap-6 md:space-y-0 md:overflow-x-auto md:pb-4 md:pl-0 md:before:hidden',
          'md:snap-x md:snap-mandatory',
          // fade the right edge so it reads as "more this way"
          'md:[mask-image:linear-gradient(to_right,black_88%,transparent)]',
        )}
      >
        {journey.map((item) => (
          <motion.li
            variants={fadeUp}
            key={`${item.when}-${item.title}`}
            className={cn(
              'relative md:w-64 md:shrink-0 md:snap-start md:pt-9',
              // md+: rail segment above each card
              'md:before:absolute md:before:left-0 md:before:right-[-24px] md:before:top-[7px] md:before:h-px md:before:bg-line',
            )}
          >
            <span
              aria-hidden
              className={cn(
                'absolute -left-8 top-1 size-[15px] rounded-full border-2 border-accent md:left-0 md:top-0',
                item.upcoming ? 'animate-pulse bg-accent' : 'bg-surface',
              )}
            />
            <JourneyCard item={item} />
          </motion.li>
        ))}
      </motion.ol>
    </section>
  );
}

function JourneyCard({ item }: { item: JourneyItem }) {
  const body = (
    <>
      <p className="font-mono text-xs font-medium uppercase tracking-[0.06em] text-accent-ink">
        {item.when}
      </p>
      <h3 className="mt-1 font-bold leading-snug text-ink">{item.title}</h3>
      <p className="mt-1 text-sm text-muted">{item.detail}</p>
    </>
  );

  return item.href ? (
    <Link
      to={item.href}
      className="-m-3 block rounded-xl p-3 transition-colors hover:bg-surface md:hover:shadow-card"
    >
      {body}
    </Link>
  ) : (
    <div>{body}</div>
  );
}
