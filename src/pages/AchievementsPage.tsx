import { Camera } from 'lucide-react';
import { AchievementCard } from '@/components/cards/AchievementCard';
import { CollectionRoute } from '@/components/detail/CollectionRoute';
import { DetailLink } from '@/components/detail/DetailLink';
import { Seo } from '@/components/layout/Seo';
import { ResponsiveImage } from '@/components/ui/ResponsiveImage';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { achievements } from '@/data/achievements';
import { formatDate } from '@/lib/format';

// docs/03-features/05-achievements.md — the first achievement is the full-width hero tile
export function AchievementsPage() {
  const [top, ...rest] = achievements;

  return (
    <CollectionRoute>
      <Seo
        title="Achievements"
        description="Achievements of Aditi Singh — National GOER 2025 finalist and team leader, MCA 95%, BCA 94.8% and more."
        path="/achievements"
      />
      <section className="container-page pt-10 md:pt-16">
        <SectionHeading
          as="h1"
          index={5}
          eyebrow="Achievements"
          title="Achievements"
          description="Competitions, academic results and leadership."
        />

        {top && (
          <DetailLink
            to={`/achievements/${top.slug}`}
            className="group relative mt-10 block min-h-[340px] overflow-hidden rounded-card shadow-card md:min-h-[420px]"
          >
            {top.cover && (
              <ResponsiveImage
                image={top.cover}
                sizes="(min-width: 1280px) 1200px, 100vw"
                className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            )}
            {/* Two gradients: the stage photo has its own banner text, which must not compete with ours */}
            <div
              aria-hidden
              className="absolute inset-0 bg-[linear-gradient(to_top,rgb(0_0_0/0.92),rgb(0_0_0/0.55)_55%,rgb(0_0_0/0.2)),linear-gradient(to_right,rgb(0_0_0/0.65),transparent_75%)]"
            />
            {top.proof && (
              <ResponsiveImage
                image={top.proof.image}
                sizes="160px"
                className="absolute right-8 top-8 hidden w-36 rotate-3 rounded-lg border-4 border-white shadow-2xl transition-transform duration-500 group-hover:rotate-0 md:block lg:w-44"
              />
            )}
            <div className="relative flex min-h-[inherit] flex-col justify-end p-6 text-white md:p-10">
              <p className="font-mono text-xs uppercase tracking-[0.08em] text-white/75">
                {top.category}
                {top.date && ` · ${formatDate(top.date)}`}
              </p>
              <h2 className="mt-2 max-w-2xl text-[26px] font-extrabold leading-tight tracking-[-0.02em] md:text-[40px]">
                {top.title}
              </h2>
              <p className="mt-2 text-white/85">
                {[top.role, top.metric?.label, top.organisation].filter(Boolean).join(' · ')}
              </p>
              {top.photos && (
                <span className="mt-5 inline-flex w-fit items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-sm font-medium backdrop-blur">
                  <Camera aria-hidden className="size-4" />
                  {top.photos.length} photos
                </span>
              )}
            </div>
          </DetailLink>
        )}

        <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((achievement, i) => (
            <li key={achievement.slug}>
              <AchievementCard achievement={achievement} index={i + 2} />
            </li>
          ))}
        </ul>
      </section>
    </CollectionRoute>
  );
}
