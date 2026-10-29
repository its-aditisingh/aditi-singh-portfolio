import { useEffect, useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Loader2, RotateCw, Send } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/cn';

export type SubmitStatus = 'idle' | 'sending' | 'success' | 'error';

interface SuccessButtonProps {
  status: SubmitStatus;
  children: ReactNode;
  successLabel?: string;
  className?: string;
}

const CONFETTI = 16;
const COLORS = ['bg-accent', 'bg-accent-ink', 'bg-success', 'bg-ink/40'];

// Pattern #12 "Click → success" (animation-spec): idle → the button shrinks to a circle with a
// spinner → turns green with a check and a small confetti burst; shakes on error.
// Reduced motion: text-only state change (no shrink, no confetti; Framer drops the shake).
export function SuccessButton({
  status,
  children,
  successLabel = 'Message sent!',
  className,
}: SuccessButtonProps) {
  const reduce = useReducedMotion();
  const [burst, setBurst] = useState(0);
  const sending = status === 'sending';
  const shrink = sending && !reduce;

  useEffect(() => {
    if (status === 'success' && !reduce) setBurst((b) => b + 1);
  }, [status, reduce]);

  const content: Record<SubmitStatus, ReactNode> = {
    idle: (
      <>
        {children}
        <Send
          aria-hidden
          className="size-[18px] transition-transform duration-200 group-hover:translate-x-1"
        />
      </>
    ),
    sending: (
      <>
        <Loader2 aria-hidden className="size-[18px] animate-spin" />
        <span className={cn(shrink && 'sr-only')}>Sending…</span>
      </>
    ),
    success: (
      <>
        <Check aria-hidden strokeWidth={3} className="size-[18px]" />
        {successLabel}
      </>
    ),
    error: (
      <>
        <RotateCw aria-hidden className="size-[18px]" />
        Try again
      </>
    ),
  };

  return (
    <span className="relative inline-flex">
      <motion.button
        type="submit"
        disabled={sending || status === 'success'}
        aria-disabled={sending || status === 'success'}
        initial={false}
        animate={{
          width: shrink ? 48 : 'auto',
          x: status === 'error' ? [0, -6, 6, -6, 6, 0] : 0,
        }}
        transition={{ width: { duration: 0.3, ease: 'easeOut' }, x: { duration: 0.4 } }}
        className={cn(
          'group inline-flex h-12 items-center justify-center overflow-hidden whitespace-nowrap rounded-full text-[15px] font-semibold shadow-sm transition-colors duration-300',
          shrink ? 'px-0' : 'min-w-[200px] px-6',
          status === 'success'
            ? 'bg-success text-white'
            : 'bg-accent-btn text-on-accent hover:bg-accent-ink',
          sending && 'cursor-wait',
          className,
        )}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={status}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="inline-flex items-center gap-2"
          >
            {content[status]}
          </motion.span>
        </AnimatePresence>
      </motion.button>

      {/* Confetti: 16 particles fly out from the button's centre once per success */}
      {burst > 0 && (
        <span key={burst} aria-hidden className="pointer-events-none absolute left-1/2 top-1/2">
          {Array.from({ length: CONFETTI }, (_, i) => {
            const angle = (i / CONFETTI) * Math.PI * 2 + (i % 3) * 0.2;
            const distance = 46 + (i % 4) * 12;
            return (
              <motion.span
                key={i}
                initial={{ x: 0, y: 0, opacity: 1, scale: 1, rotate: 0 }}
                animate={{
                  x: Math.cos(angle) * distance,
                  y: Math.sin(angle) * distance - 14,
                  opacity: [1, 1, 0],
                  scale: 0.6,
                  rotate: (i % 2 ? 1 : -1) * 160,
                }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className={cn(
                  'absolute -ml-1 -mt-1 block size-2',
                  i % 2 ? 'rounded-full' : 'rounded-[2px]',
                  COLORS[i % COLORS.length],
                )}
              />
            );
          })}
        </span>
      )}
    </span>
  );
}
