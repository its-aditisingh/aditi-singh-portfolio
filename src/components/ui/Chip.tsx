import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export function Chip({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full bg-surface-2 px-3 py-1.5 text-[13px] font-medium text-ink',
        className,
      )}
    >
      {children}
    </span>
  );
}
