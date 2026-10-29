import { GraduationCap } from 'lucide-react';
import { CountUp } from '@/components/animations/CountUp';
import { Badge } from '@/components/ui/Badge';
import type { Education } from '@/types';
import { BentoTile } from './BentoTile';

interface EducationTileProps {
  education: Education;
  id?: string;
  className?: string;
}

export function EducationTile({ education: edu, id, className }: EducationTileProps) {
  return (
    <BentoTile
      title={`Education · ${edu.start}–${edu.end}`}
      icon={GraduationCap}
      id={id}
      className={className}
    >
      <div className="flex items-end justify-between gap-3">
        <p className="text-3xl font-extrabold tracking-tight text-ink">{edu.degree}</p>
        <p className="font-mono text-4xl font-semibold tabular-nums leading-none text-accent-ink">
          <span className="sr-only">
            {edu.score.value}
            {edu.score.unit}
          </span>
          <CountUp value={edu.score.value} decimals={Number.isInteger(edu.score.value) ? 0 : 1} />
          <span aria-hidden className="text-2xl">
            {edu.score.unit}
          </span>
        </p>
      </div>
      <p className="mt-3 text-sm font-semibold text-ink">{edu.degreeFull}</p>
      <p className="mt-0.5 text-sm text-muted">
        {edu.institution}, {edu.location}
      </p>
      <Badge className="mt-4">{edu.status}</Badge>
    </BentoTile>
  );
}
