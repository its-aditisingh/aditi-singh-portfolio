import { ArrowRight, Github, Globe, Lock } from 'lucide-react';
import { TiltCard } from '@/components/animations/TiltCard';
import { DetailLink } from '@/components/detail/DetailLink';
import { Badge } from '@/components/ui/Badge';
import { Chip } from '@/components/ui/Chip';
import { ResponsiveImage } from '@/components/ui/ResponsiveImage';
import { cn } from '@/lib/cn';
import { formatIndex } from '@/lib/format';
import type { Project } from '@/types';
import { ProjectCoverFallback } from './ProjectCoverFallback';

interface ProjectCardProps {
  project: Project;
  index: number;
  /** Featured: full-width, image beside the text on desktop. */
  wide?: boolean;
}

export function ProjectCard({ project, index, wide = false }: ProjectCardProps) {
  const chips = project.techStack.flatMap((group) => group.items).slice(0, 4);
  const hasLive = project.links.some((link) => link.kind === 'live');
  const hasCode = project.links.some((link) => link.kind === 'github');

  return (
    <TiltCard>
      <DetailLink
        to={`/projects/${project.slug}`}
        className={cn(
          'group flex h-full flex-col overflow-hidden rounded-card bg-surface shadow-card transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-card-hover',
          wide && 'lg:flex-row',
        )}
      >
        <div
          className={cn(
            'relative aspect-[16/9] shrink-0 overflow-hidden border-b border-line bg-surface-2',
            wide && 'lg:aspect-auto lg:w-[58%] lg:border-b-0 lg:border-r',
          )}
        >
          {project.cover ? (
            <ResponsiveImage
              image={project.cover}
              sizes={wide ? '(min-width: 1024px) 700px, 100vw' : '(min-width: 768px) 600px, 100vw'}
              className="size-full object-cover object-left-top transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            />
          ) : (
            <ProjectCoverFallback className="size-full" />
          )}
        </div>

        <div className={cn('flex flex-1 flex-col p-5 md:p-6', wide && 'lg:p-8')}>
          <div className="flex items-center justify-between gap-3">
            <span className="font-mono text-[13px] text-muted">{formatIndex(index)}</span>
            <Badge>{project.category}</Badge>
          </div>
          <h2
            className={cn(
              'mt-4 text-xl font-bold tracking-[-0.01em] text-ink',
              wide && 'lg:text-[28px]',
            )}
          >
            {project.title}
          </h2>
          <p className="mt-1 text-sm text-muted">{project.tagline}</p>
          {wide && (
            <p className="mt-4 hidden text-[15px] text-ink/80 lg:block">{project.summary}</p>
          )}

          <ul className="mt-4 flex flex-wrap gap-1.5">
            {chips.map((chip) => (
              <li key={chip}>
                <Chip>{chip}</Chip>
              </li>
            ))}
          </ul>

          <div className="mt-auto flex items-center gap-4 pt-6 text-xs font-medium text-muted">
            {hasLive && (
              <span className="inline-flex items-center gap-1">
                <Globe aria-hidden className="size-3.5" /> Live demo
              </span>
            )}
            {hasCode && (
              <span className="inline-flex items-center gap-1">
                <Github aria-hidden className="size-3.5" /> Code
              </span>
            )}
            {project.confidentialNote && (
              <span className="inline-flex items-center gap-1">
                <Lock aria-hidden className="size-3.5" /> Client work
              </span>
            )}
            <span className="ml-auto inline-flex items-center gap-1 text-sm font-semibold text-accent-ink">
              View project
              <ArrowRight
                aria-hidden
                className="size-4 transition-transform group-hover:translate-x-1"
              />
            </span>
          </div>
        </div>
      </DetailLink>
    </TiltCard>
  );
}
