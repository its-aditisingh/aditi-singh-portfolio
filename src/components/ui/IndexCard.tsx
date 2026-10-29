import type { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/cn';
import { formatIndex } from '@/lib/format';

interface IndexCardProps {
  index: number;
  title: string;
  icon: LucideIcon;
  to?: string;
  description?: string;
  headingLevel?: 'h2' | 'h3';
  className?: string;
}

/** Signature card from the reference: mono index · accent icon · bold title (design-system §4). */
export function IndexCard({
  index,
  title,
  icon: Icon,
  to,
  description,
  headingLevel: Heading = 'h3',
  className,
}: IndexCardProps) {
  const classes = cn(
    'group relative flex min-h-[148px] flex-col justify-between rounded-card bg-surface p-[18px] shadow-card',
    'transition-[transform,box-shadow] duration-300 ease-out',
    to && 'hover:-translate-y-1 hover:shadow-card-hover',
    className,
  );

  const body = (
    <>
      <div className="flex items-start justify-between">
        <span className="font-mono text-[13px] tracking-[0.04em] text-muted">
          {formatIndex(index)}
        </span>
        <Icon
          aria-hidden
          strokeWidth={1.75}
          className="size-[22px] text-accent transition-transform duration-300 ease-spring group-hover:-rotate-[8deg] group-hover:scale-110"
        />
      </div>
      <div className="mt-8">
        <Heading className="text-lg font-bold tracking-[-0.01em] text-ink md:text-[22px]">
          {title}
        </Heading>
        {description && <p className="mt-1 text-sm text-muted">{description}</p>}
      </div>
    </>
  );

  return to ? (
    <Link to={to} className={classes}>
      {body}
    </Link>
  ) : (
    <div className={classes}>{body}</div>
  );
}
