import { Link, useParams } from 'react-router-dom';
import { ArrowRight, FileText } from 'lucide-react';
import { NumberRoll } from '@/components/animations/NumberRoll';
import { Seo } from '@/components/layout/Seo';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Chip } from '@/components/ui/Chip';
import { Gallery } from '@/components/ui/Gallery';
import { ZoomableImage } from '@/components/ui/ZoomableImage';
import { achievements } from '@/data/achievements';
import { neighbours } from '@/lib/collections';
import { formatDate } from '@/lib/format';
import { icons } from '@/lib/icons';
import { DetailSection } from './DetailSection';
import { DetailShell } from './DetailShell';
import { DetailTitle } from './DetailTitle';
import { NotFoundDetail } from './NotFoundDetail';

// docs/03-features/05-achievements.md
export function AchievementDetail() {
  const { slug = '' } = useParams();
  const item = achievements.find((a) => a.slug === slug);
  if (!item) return <NotFoundDetail basePath="/achievements" collection="Achievements" />;

  const { prev, next } = neighbours(achievements, slug);
  const Icon = icons[item.icon];

  return (
    <DetailShell
      basePath="/achievements"
      collection="Achievements"
      prev={prev && { slug: prev.slug, title: prev.title }}
      next={next && { slug: next.slug, title: next.title }}
    >
      <Seo
        title={item.title}
        description={item.summary}
        path={`/achievements/${item.slug}`}
        image={item.cover ?? item.proof?.image}
      />

      <div>
        <div className="flex flex-wrap items-center gap-3">
          <span className="grid size-11 place-items-center rounded-2xl bg-accent-soft text-accent">
            <Icon aria-hidden strokeWidth={1.75} className="size-5" />
          </span>
          <Badge>{item.category}</Badge>
          {item.role && <Badge className="bg-surface-2 text-ink">{item.role}</Badge>}
          {item.date && (
            <span className="font-mono text-xs text-muted">{formatDate(item.date)}</span>
          )}
        </div>
        <DetailTitle className="mt-4">{item.title}</DetailTitle>
        <p className="mt-2 font-semibold text-ink/80">{item.organisation}</p>
      </div>

      {item.metric && (
        <div className="mt-8 inline-flex flex-col rounded-card bg-surface px-6 py-5 shadow-card">
          <span className="font-mono text-4xl font-semibold tracking-tight text-accent-ink md:text-5xl">
            <NumberRoll value={item.metric.value} />
          </span>
          <span className="mt-1 text-sm text-muted">{item.metric.label}</span>
        </div>
      )}

      <DetailSection title="The story">
        <div className="max-w-3xl space-y-4 text-ink/85 md:text-lg">
          {item.story.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </DetailSection>

      <DetailSection title="Skills demonstrated">
        <ul className="flex flex-wrap gap-1.5">
          {item.skills.map((skill) => (
            <li key={skill}>
              <Chip>{skill}</Chip>
            </li>
          ))}
        </ul>
      </DetailSection>

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
          <div className="max-w-md">
            <ZoomableImage
              image={item.proof.image}
              sizes="(min-width: 768px) 448px, 100vw"
              caption={item.title}
            />
            <Button
              href={item.proof.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              size="sm"
              icon={FileText}
              iconPosition="start"
              className="mt-4"
            >
              View certificate
            </Button>
          </div>
        </DetailSection>
      )}

      {item.photos && item.photos.length > 0 && (
        <DetailSection title={`Photos (${item.photos.length})`}>
          <Gallery images={item.photos} layout="masonry" />
        </DetailSection>
      )}
    </DetailShell>
  );
}
