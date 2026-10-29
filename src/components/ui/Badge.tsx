import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export function Badge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full bg-accent-soft px-2.5 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-accent-ink',
        className,
      )}
    >
      {children}
    </span>
  );
}
