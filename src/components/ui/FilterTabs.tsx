import { useRef } from 'react';
import { useSlidingIndicator } from '@/hooks/useSlidingIndicator';
import { cn } from '@/lib/cn';

export interface FilterTabItem<T extends string> {
  value: T;
  label: string;
  count?: number;
}

interface FilterTabsProps<T extends string> {
  items: FilterTabItem<T>[];
  value: T;
  onChange: (value: T) => void;
  /** Accessible name for the group, e.g. "Filter certificates by category". */
  label: string;
  className?: string;
}

export function FilterTabs<T extends string>({
  items,
  value,
  onChange,
  label,
  className,
}: FilterTabsProps<T>) {
  const ref = useRef<HTMLDivElement>(null);
  const pill = useSlidingIndicator(ref, value);

  return (
    <div
      ref={ref}
      role="group"
      aria-label={label}
      className={cn(
        'no-scrollbar relative -mx-4 flex gap-1 overflow-x-auto px-4 md:mx-0 md:px-0',
        className,
      )}
    >
      <span
        aria-hidden
        style={pill}
        className="pointer-events-none absolute left-0 top-0 rounded-full bg-accent-soft duration-300 ease-out"
      />
      {items.map((item) => {
        const active = item.value === value;
        return (
          <button
            key={item.value}
            type="button"
            aria-pressed={active}
            data-active={active}
            onClick={() => onChange(item.value)}
            className={cn(
              'relative shrink-0 rounded-full px-4 py-2.5 text-sm font-medium transition-colors',
              active ? 'text-accent-ink' : 'text-muted hover:text-ink',
            )}
          >
            {item.label}
            {item.count !== undefined && (
              <span className="ml-1.5 font-mono text-xs">{item.count}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
