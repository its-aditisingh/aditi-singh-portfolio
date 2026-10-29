import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { modalState } from '@/lib/modalRoute';
import { useDetailContext } from './detailContext';

export interface DetailNavItem {
  slug: string;
  title: string;
}

interface DetailNavProps {
  basePath: string;
  prev?: DetailNavItem;
  next?: DetailNavItem;
}

/**
 * Prev / Next within a collection. In the modal they replace the history entry,
 * so Back (or Esc) still closes the modal instead of stepping through items.
 */
export function DetailNav({ basePath, prev, next }: DetailNavProps) {
  const { mode } = useDetailContext();
  const { search } = useLocation();
  if (!prev && !next) return null;

  const linkProps = (item: DetailNavItem) =>
    mode === 'modal'
      ? {
          to: `${basePath}/${item.slug}${search}`,
          replace: true,
          state: modalState(),
          preventScrollReset: true,
        }
      : { to: `${basePath}/${item.slug}` };

  const cardClass =
    'group flex min-w-0 flex-1 flex-col gap-1 rounded-card border border-line bg-surface p-4 transition-colors hover:border-accent/40';

  return (
    <nav
      aria-label="More items"
      className="mt-12 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row"
    >
      {prev && (
        <Link {...linkProps(prev)} rel="prev" className={cardClass}>
          <span className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.06em] text-muted">
            <ArrowLeft
              aria-hidden
              className="size-3.5 transition-transform group-hover:-translate-x-0.5"
            />
            Previous
          </span>
          <span className="truncate font-semibold text-ink">{prev.title}</span>
        </Link>
      )}
      {next && (
        <Link {...linkProps(next)} rel="next" className={`${cardClass} sm:items-end sm:text-right`}>
          <span className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.06em] text-muted">
            Next
            <ArrowRight
              aria-hidden
              className="size-3.5 transition-transform group-hover:translate-x-0.5"
            />
          </span>
          <span className="max-w-full truncate font-semibold text-ink">{next.title}</span>
        </Link>
      )}
    </nav>
  );
}
