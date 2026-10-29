import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/cn';
import { spring } from '@/lib/motion';

const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

// Pattern #10 "Price roll" → number roll (animation-spec): every digit is a 0–9 strip that rolls to
// its value, staggered. Non-digits ("%", "hrs", "·") stay put. Screen readers get the plain value.
// Reduced motion: Framer's reducedMotion="user" makes the roll land instantly.
export function NumberRoll({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const settled = inView || reduce;
  let digitIndex = 0;

  return (
    <span ref={ref} className={cn('inline-flex', className)}>
      <span className="sr-only">{value}</span>
      <span aria-hidden className="inline-flex items-start tabular-nums leading-none">
        {[...value].map((char, i) => {
          if (!/\d/.test(char)) {
            return (
              <span key={i} className="inline-block h-[1em] whitespace-pre">
                {char}
              </span>
            );
          }
          const delay = digitIndex++ * 0.05;
          return (
            <span key={i} className="relative inline-block h-[1em] overflow-hidden">
              <motion.span
                className="flex flex-col"
                initial={false}
                animate={{ y: settled ? `${-Number(char)}em` : '0em' }}
                transition={{ ...spring.soft, delay }}
              >
                {DIGITS.map((digit) => (
                  <span key={digit} className="h-[1em]">
                    {digit}
                  </span>
                ))}
              </motion.span>
            </span>
          );
        })}
      </span>
    </span>
  );
}
