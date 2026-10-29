import { motion, type Variants } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { ease, stagger } from '@/lib/motion';

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: stagger.letters } },
};

const letter: Variants = {
  hidden: { y: '110%' },
  show: { y: '0%', transition: { duration: 0.6, ease: ease.out } },
};

// Pattern #01 "Hero reveal" (animation-spec): each letter rises out of a clip mask.
// Screen readers get the plain text; the per-letter spans are aria-hidden.
export function RevealText({ text, delay = 0 }: { text: string; delay?: number }) {
  const reduce = useReducedMotion();
  const words = text.split(' ');

  return (
    <>
      <span className="sr-only">{text}</span>
      <motion.span
        aria-hidden
        variants={container}
        initial={reduce ? false : 'hidden'}
        animate="show"
        transition={{ delayChildren: delay }}
        className="inline-flex flex-wrap gap-x-[0.25em]"
      >
        {words.map((word, w) => (
          <span key={w} className="inline-flex overflow-hidden pb-[0.08em]">
            {[...word].map((char, c) => (
              <motion.span key={c} variants={letter} className="inline-block">
                {char}
              </motion.span>
            ))}
          </span>
        ))}
      </motion.span>
    </>
  );
}
