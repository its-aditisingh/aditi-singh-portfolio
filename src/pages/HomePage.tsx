import { Seo } from '@/components/layout/Seo';
import { ExploreGrid } from '@/components/home/ExploreGrid';
import { Hero } from '@/components/home/Hero';
import { StatsStrip } from '@/components/home/StatsStrip';
import { personJsonLd } from '@/data/structuredData';

const jsonLd = personJsonLd((import.meta.env.VITE_SITE_URL ?? '').replace(/\/$/, ''));

// docs/03-features/01-home.md
export function HomePage() {
  return (
    <>
      <Seo path="/" jsonLd={jsonLd} />
      <Hero />
      <StatsStrip />
      <ExploreGrid />
    </>
  );
}
