import { Layers } from 'lucide-react';
import { Chip } from '@/components/ui/Chip';
import { skillGroups } from '@/data/skills';
import { icons } from '@/lib/icons';
import { BentoTile } from './BentoTile';

export function SkillsTile({ className }: { className?: string }) {
  return (
    <BentoTile title="Technical skills" icon={Layers} className={className}>
      <div className="grid gap-5 sm:grid-cols-2">
        {skillGroups.map((group) => {
          const Icon = icons[group.icon];
          return (
            <div key={group.category}>
              <h3 className="flex items-center gap-2 text-sm font-bold text-ink">
                <Icon aria-hidden strokeWidth={1.75} className="size-4 text-accent" />
                {group.category}
              </h3>
              <ul className="mt-2.5 flex flex-wrap gap-1.5">
                {group.skills.map((skill) => (
                  <li key={skill}>
                    <Chip className="transition-shadow hover:shadow-[0_0_0_3px_rgb(var(--accent)/0.18)]">
                      {skill}
                    </Chip>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </BentoTile>
  );
}
