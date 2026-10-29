import { motion, type Variants } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/cn';
import { formatIndex } from '@/lib/format';
import { ease, fadeUp, inViewOnce, staggerParent } from '@/lib/motion';

interface SectionHeadingProps {
  title: string;
  /** Put on the heading element so a section can use aria-labelledby. */
  id?: string;
  eyebrow?: string;
  index?: number;
  description?: string;
  as?: 'h1' | 'h2';
  align?: 'left' | 'center';
  className?: string;
}

// The mono label "types" in left to right, then the heading and description fade up
const typeIn: Variants = {
  hidden: { clipPath: 'inset(0 100% 0 0)' },
  show: { clipPath: 'inset(0 0% 0 0)', transition: { duration: 0.6, ease: ease.out } },
};

export function SectionHeading({
  title,
  id,
  eyebrow,
  index,
  description,
  as = 'h2',
  align = 'left',
  className,
}: SectionHeadingProps) {
  const reduce = useReducedMotion();
  const label = [index !== undefined ? formatIndex(index) : null, eyebrow]
    .filter(Boolean)
    .join(' — ');
  const Heading = as === 'h1' ? motion.h1 : motion.h2;

  return (
    <motion.header
      variants={staggerParent(0.1)}
      initial={reduce ? false : 'hidden'}
      whileInView="show"
      viewport={inViewOnce}
      className={cn(align === 'center' && 'mx-auto text-center', 'max-w-3xl', className)}
    >
      {label && (
        <motion.p
          variants={typeIn}
          className="font-mono text-[13px] uppercase tracking-[0.08em] text-muted"
        >
          {label}
        </motion.p>
      )}
      <Heading
        id={id}
        variants={fadeUp}
        className={cn(
          'mt-3 text-ink',
          as === 'h1'
            ? 'text-[34px] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[56px]'
            : 'text-[26px] font-bold leading-tight tracking-[-0.02em] md:text-[36px]',
        )}
      >
        {title}
      </Heading>
      {description && (
        <motion.p variants={fadeUp} className="mt-4 text-muted md:text-lg">
          {description}
        </motion.p>
      )}
    </motion.header>
  );
}
