import { CountUp } from '@/components/animations/CountUp';
import { stats } from '@/data/highlights';
import { cn } from '@/lib/cn';
import { formatStat } from '@/lib/format';

// Home stats (FR-H4) with the count-up (#05); the real value is in the sr-only text.
export function StatsStrip() {
  return (
    <section aria-label="Highlights" className="container-page">
      <dl className="grid grid-cols-2 overflow-hidden rounded-card border border-line bg-surface shadow-card lg:grid-cols-4">
        {stats.map((stat, i) => {
          const wordySuffix = (stat.suffix?.length ?? 0) > 2;
          return (
            <div
              key={stat.label}
              className={cn(
                'flex flex-col-reverse gap-1 p-5 md:p-7',
                i % 2 === 1 && 'border-l border-line',
                i >= 2 && 'border-t border-line lg:border-t-0',
                i === 2 && 'lg:border-l',
              )}
            >
              <dt className="text-sm text-muted">{stat.label}</dt>
              <dd className="font-mono font-semibold tabular-nums tracking-tight text-ink">
                <span className="sr-only">{formatStat(stat)}</span>
                <span aria-hidden className="text-[40px] leading-none md:text-[56px]">
                  {stat.prefix}
                  <CountUp value={stat.value} decimals={stat.decimals} />
                  {!wordySuffix && stat.suffix}
                </span>
                {wordySuffix && (
                  <span aria-hidden className="ml-1 text-lg text-muted md:text-xl">
                    {stat.suffix}
                  </span>
                )}
              </dd>
            </div>
          );
        })}
      </dl>
    </section>
  );
}
