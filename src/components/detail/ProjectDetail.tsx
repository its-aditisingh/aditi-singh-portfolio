import { Link, useParams } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Check, Database, Github, Lock } from 'lucide-react';
import { BeforeAfter } from '@/components/animations/BeforeAfter';
import { CursorTour } from '@/components/animations/CursorTour';
import { NumberRoll } from '@/components/animations/NumberRoll';
import { PipelineSteps } from '@/components/animations/PipelineSteps';
import { Seo } from '@/components/layout/Seo';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Chip } from '@/components/ui/Chip';
import { Gallery } from '@/components/ui/Gallery';
import { ResponsiveImage } from '@/components/ui/ResponsiveImage';
import { projects } from '@/data/projects';
import { neighbours } from '@/lib/collections';
import { DetailSection } from './DetailSection';
import { DetailShell } from './DetailShell';
import { useSubheading } from './detailContext';
import { DetailTitle } from './DetailTitle';
import { NotFoundDetail } from './NotFoundDetail';

// docs/03-features/03-projects.md — sections without data are omitted
export function ProjectDetail() {
  const { slug = '' } = useParams();
  const Subheading = useSubheading(2);
  const project = projects.find((p) => p.slug === slug);
  if (!project) return <NotFoundDetail basePath="/projects" collection="Projects" />;

  const { prev, next } = neighbours(projects, slug);
  const live = project.links.find((link) => link.kind === 'live');
  const code = project.links.find((link) => link.kind === 'github');

  return (
    <DetailShell
      basePath="/projects"
      collection="Projects"
      prev={prev && { slug: prev.slug, title: prev.title }}
      next={next && { slug: next.slug, title: next.title }}
    >
      <Seo
        title={project.title}
        description={project.summary}
        path={`/projects/${project.slug}`}
        image={project.cover}
      />

      {/* 1. Header */}
      <div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <Badge>{project.category}</Badge>
          <span className="text-sm text-muted">
            {project.context}
            {project.period && ` · ${project.period}`}
          </span>
        </div>
        <DetailTitle className="mt-3">{project.title}</DetailTitle>
        <p className="mt-2 text-lg text-muted">{project.tagline}</p>
        {project.appName && (
          <p className="mt-1 text-sm text-muted">
            Shown in the app as <span className="font-semibold text-ink">{project.appName}</span>
          </p>
        )}

        {(live || code) && (
          <div className="mt-6 flex flex-wrap gap-3">
            {live && (
              <Button
                href={live.href}
                target="_blank"
                rel="noopener noreferrer"
                icon={ArrowUpRight}
              >
                {live.label}
              </Button>
            )}
            {code && (
              <Button
                href={code.href}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                icon={Github}
                iconPosition="start"
              >
                {code.label}
              </Button>
            )}
          </div>
        )}

        {project.confidentialNote && (
          <p className="mt-6 inline-flex flex-wrap items-center gap-2 rounded-xl border border-line bg-surface px-4 py-3 text-sm text-muted">
            <Lock aria-hidden className="size-4 text-accent" />
            {project.confidentialNote}
            {project.relatedExperience && (
              <Link
                to={`/experience/${project.relatedExperience}`}
                className="inline-flex items-center gap-1 font-semibold text-accent-ink hover:underline"
              >
                See the internship <ArrowRight aria-hidden className="size-3.5" />
              </Link>
            )}
          </p>
        )}
      </div>

      {/* 2. Cover + cursor tour — notebook projects have no screenshot, so nothing is shown */}
      {project.cover && (
        <div className="mt-8">
          {project.cursorTour ? (
            <CursorTour image={project.cover} stops={project.cursorTour} priority />
          ) : (
            <ResponsiveImage
              image={project.cover}
              sizes="(min-width: 1024px) 900px, 100vw"
              priority
              className="w-full rounded-card border border-line"
            />
          )}
        </div>
      )}

      {project.metrics && (
        <dl className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {project.metrics.map((metric) => (
            <div
              key={metric.label}
              className="flex flex-col-reverse rounded-card bg-surface p-4 shadow-card"
            >
              <dt className="mt-1 text-xs text-muted">{metric.label}</dt>
              <dd className="font-mono text-2xl font-semibold tracking-tight text-accent-ink md:text-3xl">
                <NumberRoll value={metric.value} />
              </dd>
            </div>
          ))}
        </dl>
      )}

      {/* 3. Overview */}
      <DetailSection title="Overview">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <Subheading className="font-bold text-ink">The problem</Subheading>
            <p className="mt-1.5 text-ink/80">{project.problem}</p>
          </div>
          <div>
            <Subheading className="font-bold text-ink">The solution</Subheading>
            <p className="mt-1.5 text-ink/80">{project.solution}</p>
          </div>
        </div>
      </DetailSection>

      {/* 3b. Dataset — required on every project */}
      <DetailSection title="Dataset & source">
        <div className="rounded-card border border-line bg-surface p-5 md:p-6">
          <div className="flex items-start gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
              <Database aria-hidden className="size-[18px]" />
            </span>
            <div className="min-w-0">
              <Subheading className="font-bold leading-snug text-ink">
                {project.dataset.name}
              </Subheading>
              <p className="mt-1.5 text-sm text-ink/80">{project.dataset.description}</p>
            </div>
          </div>
          <dl className="mt-5 space-y-3 border-t border-line pt-4 text-sm">
            <div className="sm:flex sm:gap-4">
              <dt className="w-24 shrink-0 font-semibold text-ink">Source</dt>
              <dd className="mt-0.5 text-ink/80 sm:mt-0">{project.dataset.source}</dd>
            </div>
            {project.dataset.citation && (
              <div className="sm:flex sm:gap-4">
                <dt className="w-24 shrink-0 font-semibold text-ink">Cite as</dt>
                <dd className="mt-0.5 text-ink/80 sm:mt-0">{project.dataset.citation}</dd>
              </div>
            )}
          </dl>
          {project.dataset.links.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-2">
              {project.dataset.links.map((link) => (
                <li key={link.href}>
                  <Button
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="secondary"
                    size="sm"
                    icon={ArrowUpRight}
                  >
                    {link.label}
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </DetailSection>

      {/* 4. Pipeline */}
      {project.pipeline && (
        <DetailSection title="Pipeline">
          <PipelineSteps steps={project.pipeline} />
        </DetailSection>
      )}

      {/* 5. Features */}
      <DetailSection title="Key features">
        <ul className="grid gap-3 sm:grid-cols-2">
          {project.features.map((feature) => (
            <li key={feature} className="flex gap-2.5 text-ink/85">
              <Check aria-hidden strokeWidth={2.5} className="mt-1 size-4 shrink-0 text-accent" />
              {feature}
            </li>
          ))}
        </ul>
      </DetailSection>

      {/* 6. Before / after */}
      {project.beforeAfter && (
        <DetailSection title="Before / after">
          <BeforeAfter {...project.beforeAfter} />
        </DetailSection>
      )}

      {/* 7. Tech stack */}
      <DetailSection title="Tech stack">
        <dl className="space-y-4">
          {project.techStack.map((group) => (
            <div key={group.label} className="sm:flex sm:gap-4">
              <dt className="w-28 shrink-0 pt-1.5 text-sm font-semibold text-ink">{group.label}</dt>
              <dd className="mt-2 flex flex-wrap gap-1.5 sm:mt-0">
                {group.items.map((item) => (
                  <Chip key={item}>{item}</Chip>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </DetailSection>

      {/* 8. Screenshots */}
      {project.screenshots.length > 0 && (
        <DetailSection title="Screenshots">
          <Gallery images={project.screenshots} />
        </DetailSection>
      )}

      {/* 9. Results */}
      {project.results && (
        <DetailSection title="Results">
          <ul className="space-y-2 text-ink/85">
            {project.results.map((result) => (
              <li key={result} className="flex gap-2.5">
                <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" />
                {result}
              </li>
            ))}
          </ul>
        </DetailSection>
      )}

      {/* 10. Future scope */}
      {project.futureScope && (
        <DetailSection title="Future scope">
          <ul className="flex flex-wrap gap-1.5">
            {project.futureScope.map((item) => (
              <li key={item}>
                <Chip>{item}</Chip>
              </li>
            ))}
          </ul>
        </DetailSection>
      )}
    </DetailShell>
  );
}
