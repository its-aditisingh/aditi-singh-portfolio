import { ArrowRight } from 'lucide-react';
import { DetailLink } from '@/components/detail/DetailLink';
import { Badge } from '@/components/ui/Badge';
import { Chip } from '@/components/ui/Chip';
import { formatDuration, formatRange, monthsBetween } from '@/lib/format';
import type { Experience } from '@/types';

export function ExperienceCard({ item }: { item: Experience }) {
  const duration =
    item.start && item.end ? formatDuration(monthsBetween(item.start, item.end)) : null;

  return (
    <DetailLink
      to={`/experience/${item.slug}`}
      className="group block rounded-card bg-surface p-5 shadow-card transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-card-hover md:p-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.06em] text-accent-ink">
          {formatRange(item.start, item.end)}
          {duration && <span className="text-muted"> · {duration}</span>}
        </p>
        <Badge>{item.type}</Badge>
      </div>
      <h2 className="mt-3 text-xl font-bold tracking-[-0.01em] text-ink">{item.role}</h2>
      <p className="mt-0.5 text-sm font-medium text-ink/80">
        {item.organisation}
        {item.facts?.[0] && <span className="text-muted"> · {item.facts[0]}</span>}
      </p>
      <p className="mt-3 text-sm text-muted">{item.summary}</p>
      <ul className="mt-4 flex flex-wrap gap-1.5">
        {item.skills.slice(0, 4).map((skill) => (
          <li key={skill}>
            <Chip>{skill}</Chip>
          </li>
        ))}
      </ul>
      <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-accent-ink">
        View details
        <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
      </span>
    </DetailLink>
  );
}
