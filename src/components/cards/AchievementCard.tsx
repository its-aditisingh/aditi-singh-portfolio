import { NumberRoll } from '@/components/animations/NumberRoll';
import { DetailLink } from '@/components/detail/DetailLink';
import { Badge } from '@/components/ui/Badge';
import { formatIndex } from '@/lib/format';
import { icons } from '@/lib/icons';
import type { Achievement } from '@/types';

/** Numbered card from the reference (design-system §4) with the achievement's metric. */
export function AchievementCard({
  achievement,
  index,
}: {
  achievement: Achievement;
  index: number;
}) {
  const Icon = icons[achievement.icon];

  return (
    <DetailLink
      to={`/achievements/${achievement.slug}`}
      className="group flex h-full flex-col rounded-card bg-surface p-5 shadow-card transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-card-hover md:p-6"
    >
      <div className="flex items-start justify-between">
        <span className="font-mono text-[13px] text-muted">{formatIndex(index)}</span>
        <Icon
          aria-hidden
          strokeWidth={1.75}
          className="size-[22px] text-accent transition-transform duration-300 ease-spring group-hover:-rotate-[8deg] group-hover:scale-110"
        />
      </div>
      {achievement.metric && (
        <p className="mt-6 font-mono text-[32px] font-semibold leading-none tracking-tight text-accent-ink">
          <NumberRoll value={achievement.metric.value} />
        </p>
      )}
      <h2 className="mt-4 text-lg font-bold leading-snug tracking-[-0.01em] text-ink">
        {achievement.title}
      </h2>
      <p className="mt-1.5 text-sm text-muted">{achievement.summary}</p>
      <div className="mt-auto pt-5">
        <Badge>{achievement.category}</Badge>
      </div>
    </DetailLink>
  );
}
