import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { useSubheading } from './detailContext';

/** A titled block inside a detail view. */
export function DetailSection({
  title,
  children,
  className,
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  const Heading = useSubheading();
  return (
    <section className={cn('mt-10', className)}>
      <Heading className="font-mono text-[12px] font-medium uppercase tracking-[0.08em] text-muted">
        {title}
      </Heading>
      <div className="mt-4">{children}</div>
    </section>
  );
}
