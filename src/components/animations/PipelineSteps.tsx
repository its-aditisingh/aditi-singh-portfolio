import { motion, type Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { formatIndex } from '@/lib/format';
import { ease, staggerParent } from '@/lib/motion';

const step: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: ease.out } },
};

const connector: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  show: { scaleX: 1, opacity: 1, transition: { duration: 0.3, delay: 0.2, ease: ease.out } },
};

// Pattern #08 "Process draw" for the project pipeline (animation-spec): each node pops in,
// then the connector to the next one draws. Reduced motion → fully drawn.
export function PipelineSteps({ steps }: { steps: string[] }) {
  const reduce = useReducedMotion();

  return (
    <motion.ol
      variants={staggerParent(0.22)}
      initial={reduce ? false : 'hidden'}
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      className="grid gap-2 sm:grid-cols-2 lg:flex lg:items-stretch lg:gap-0"
    >
      {steps.map((label, i) => (
        <motion.li key={label} variants={step} className="flex items-center lg:min-w-0 lg:flex-1">
          <div className="flex flex-1 items-center gap-3 rounded-xl border border-line bg-surface px-3 py-3 lg:h-full lg:flex-col lg:justify-center lg:text-center">
            <span className="grid size-8 shrink-0 place-items-center rounded-full bg-accent-soft font-mono text-xs font-semibold text-accent-ink">
              {formatIndex(i + 1)}
            </span>
            <span className="text-sm font-semibold leading-snug text-ink">{label}</span>
          </div>
          {i < steps.length - 1 && (
            <motion.span
              aria-hidden
              variants={connector}
              className="mx-1 hidden origin-left items-center text-accent lg:flex"
            >
              <span className="h-px w-2 bg-accent" />
              <ArrowRight className="size-4" />
            </motion.span>
          )}
        </motion.li>
      ))}
    </motion.ol>
  );
}
