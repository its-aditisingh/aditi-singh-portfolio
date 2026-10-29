import { motion, type Variants } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { ease, staggerParent } from '@/lib/motion';
import type { CompareBlock } from '@/types';

const row: Variants = {
  hidden: { opacity: 0, x: -8 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: ease.out } },
};

const tick: Variants = {
  hidden: { pathLength: 0 },
  show: { pathLength: 1, transition: { duration: 0.4, delay: 0.25, ease: ease.out } },
};

// Pattern #11 "Us vs them" → Classroom vs Industry (animation-spec): rows reveal one by one and the
// orange tick draws in. Reduced motion → static.
export function CompareColumns({ block }: { block: CompareBlock }) {
  const reduce = useReducedMotion();

  return (
    <table className="w-full table-fixed border-separate border-spacing-0 text-sm">
      <thead>
        <tr>
          <th scope="col" className="pb-3 text-left font-semibold text-muted">
            {block.left}
          </th>
          <th scope="col" className="pb-3 pl-4 text-left font-semibold text-accent-ink">
            {block.right}
          </th>
        </tr>
      </thead>
      <motion.tbody
        variants={staggerParent(0.12)}
        initial={reduce ? false : 'hidden'}
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        {block.rows.map(([left, right]) => (
          <motion.tr key={left} variants={row}>
            <td className="border-t border-line py-3 pr-4 align-top text-muted">
              <span className="flex gap-2">
                <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-muted/50" />
                {left}
              </span>
            </td>
            <td className="border-t border-line py-3 pl-4 align-top font-medium text-ink">
              <span className="flex gap-2">
                <svg
                  aria-hidden
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mt-0.5 size-4 shrink-0 text-accent"
                >
                  <motion.path d="M20 6 9 17l-5-5" variants={tick} />
                </svg>
                {right}
              </span>
            </td>
          </motion.tr>
        ))}
      </motion.tbody>
    </table>
  );
}
