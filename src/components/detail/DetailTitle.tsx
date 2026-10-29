import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { useDetailContext } from './detailContext';

/** Detail heading: h1 as a full page, h2 inside the modal (the list page keeps its h1). */
export function DetailTitle({ children, className }: { children: ReactNode; className?: string }) {
  const { mode, titleId } = useDetailContext();
  const Heading = mode === 'modal' ? 'h2' : 'h1';

  return (
    <Heading
      id={titleId}
      className={cn(
        'text-[28px] font-extrabold leading-[1.1] tracking-[-0.02em] text-ink md:text-[40px]',
        className,
      )}
    >
      {children}
    </Heading>
  );
}
