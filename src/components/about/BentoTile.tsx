import { useId, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/cn';
import { bentoItem } from '@/lib/motion';

interface BentoTileProps {
  title: string;
  icon?: LucideIcon;
  id?: string;
  className?: string;
  children: ReactNode;
}

/** One tile of the About bento grid (docs/03-features/02-about.md); assembles via the parent's stagger (#06). */
export function BentoTile({ title, icon: Icon, id, className, children }: BentoTileProps) {
  const headingId = useId();

  return (
    <motion.section
      variants={bentoItem}
      id={id}
      aria-labelledby={headingId}
      className={cn('flex flex-col rounded-card bg-surface p-5 shadow-card md:p-6', className)}
    >
      <div className="flex items-center justify-between gap-3">
        <h2
          id={headingId}
          className="font-mono text-[12px] font-medium uppercase tracking-[0.08em] text-muted"
        >
          {title}
        </h2>
        {Icon && <Icon aria-hidden strokeWidth={1.75} className="size-5 shrink-0 text-accent" />}
      </div>
      <div className="mt-4 flex-1">{children}</div>
    </motion.section>
  );
}
