import { Link, useParams } from 'react-router-dom';
import { ArrowRight, Check, FileText, MapPin } from 'lucide-react';
import { CompareColumns } from '@/components/animations/CompareColumns';
import { Seo } from '@/components/layout/Seo';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Chip } from '@/components/ui/Chip';
import { CopyButton } from '@/components/ui/CopyButton';
import { ZoomableImage } from '@/components/ui/ZoomableImage';
import { experience } from '@/data/experience';
import { neighbours } from '@/lib/collections';
import { durationLabel, formatRange } from '@/lib/format';
import { DetailSection } from './DetailSection';
import { DetailShell } from './DetailShell';
import { DetailTitle } from './DetailTitle';
import { NotFoundDetail } from './NotFoundDetail';

// docs/03-features/06-experience.md — duration is computed from the dates, never hard-coded
export function ExperienceDetail() {
  const { slug = '' } = useParams();
  const item = experience.find((e) => e.slug === slug);
  if (!item) return <NotFoundDetail basePath="/experience" collection="Experience" />;

  const { prev, next } = neighbours(experience, slug);
  const duration = durationLabel(item.start, item.end);

  return (
    <DetailShell
      basePath="/experience"
      collection="Experience"
      prev={prev && { slug: prev.slug, title: prev.role }}
      next={next && { slug: next.slug, title: next.role }}
    >
      <Seo
        title={`${item.role} at ${item.organisation}`}
        description={item.summary}
        path={`/experience/${item.slug}`}
      />

      <div>
        <div className="flex flex-wrap items-center gap-3">
          <Badge>{item.type}</Badge>
          <span className="font-mono text-xs font-medium uppercase tracking-[0.06em] text-accent-ink">
            {formatRange(item.start, item.end)}
            {duration && <span className="text-muted"> · {duration}</span>}
          </span>
        </div>
        <DetailTitle className="mt-3">{item.role}</DetailTitle>
        <p className="mt-2 text-lg font-semibold text-ink/85">{item.organisation}</p>
        <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-muted">
          <MapPin aria-hidden className="size-4" />
          {item.location}
        </p>
        {item.facts && (
          <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Key facts">
            {item.facts.map((fact) => (
              <li key={fact}>
                <Chip className="bg-accent-soft text-accent-ink">{fact}</Chip>
              </li>
            ))}
          </ul>
        )}
      </div>

      <p className="mt-8 max-w-3xl text-ink/85 md:text-lg">{item.summary}</p>

      {item.responsibilities.length > 0 && (
        <DetailSection title="What I did">
          <ul className="space-y-3">
            {item.responsibilities.map((task) => (
              <li key={task} className="flex gap-3 text-ink/85">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-accent-soft">
                  <Check aria-hidden strokeWidth={3} className="size-3 text-accent-ink" />
                </span>
                {task}
              </li>
            ))}
          </ul>
        </DetailSection>
      )}

      <DetailSection title="Skills & tools">
        <ul className="flex flex-wrap gap-1.5">
          {item.skills.map((skill) => (
            <li key={skill}>
              <Chip>{skill}</Chip>
            </li>
          ))}
        </ul>
      </DetailSection>

      {item.testimonial && (
        <DetailSection title="From the certificate">
          <blockquote className="max-w-3xl border-l-4 border-accent pl-5 text-lg italic text-ink/85">
            “{item.testimonial}”
          </blockquote>
        </DetailSection>
      )}

      {item.compare && (
        <DetailSection title="Classroom ⟷ Industry">
          <div className="rounded-card bg-surface p-5 shadow-card">
            <CompareColumns block={item.compare} />
          </div>
        </DetailSection>
      )}

      {item.related && (
        <Link
          to={item.related.to}
          className="mt-8 inline-flex items-center gap-1.5 font-semibold text-accent-ink hover:underline"
        >
          {item.related.label}
          <ArrowRight aria-hidden className="size-4" />
        </Link>
      )}

      {item.proof && (
        <DetailSection title="Proof">
          <div className="max-w-lg">
            <ZoomableImage
              image={item.proof.image}
              sizes="(min-width: 768px) 512px, 100vw"
              caption={`${item.role} — ${item.organisation}`}
            />
            <div className="mt-4 flex flex-wrap items-center gap-3">
              {item.proof.credentialId && (
                <span className="inline-flex items-center gap-2 text-sm">
                  <span className="text-muted">Certificate ID</span>
                  <code className="font-mono text-[13px] font-medium text-ink">
                    {item.proof.credentialId}
                  </code>
                  <CopyButton text={item.proof.credentialId} />
                </span>
              )}
              <Button
                href={item.proof.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                size="sm"
                icon={FileText}
                iconPosition="start"
              >
                View certificate
              </Button>
            </div>
          </div>
        </DetailSection>
      )}
    </DetailShell>
  );
}
