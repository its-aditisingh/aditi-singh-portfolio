import type { CertCategory } from '@/types';

/** URL-safe slugs for certificate categories (`/certificates?category=ai-ml`). */
export const certCategorySlugs: Record<CertCategory, string> = {
  'AI & ML': 'ai-ml',
  'Data Science': 'data-science',
  Cloud: 'cloud',
  'Programming & Web': 'programming-web',
  Workshops: 'workshops',
  Other: 'other',
};

export const certCategories = Object.keys(certCategorySlugs) as CertCategory[];

export function categoryFromSlug(slug: string | null): CertCategory | null {
  if (!slug) return null;
  return certCategories.find((category) => certCategorySlugs[category] === slug) ?? null;
}

export type SortOrder = 'newest' | 'oldest';

/** Sorts by an ISO date (string compare works for YYYY[-MM[-DD]]); undated items always last. */
export function sortByDate<T>(
  items: T[],
  getDate: (item: T) => string | undefined,
  order: SortOrder,
) {
  return [...items].sort((a, b) => {
    const da = getDate(a);
    const db = getDate(b);
    if (!da || !db) return da ? -1 : db ? 1 : 0;
    return order === 'newest' ? db.localeCompare(da) : da.localeCompare(db);
  });
}

/**
 * Previous/next items for detail navigation, wrapping around (test plan).
 * With exactly two items prev and next would be the same item, so only `next` is returned.
 */
export function neighbours<T extends { slug: string }>(items: T[], slug: string) {
  const index = items.findIndex((item) => item.slug === slug);
  if (index < 0 || items.length < 2) return { prev: undefined, next: undefined };
  if (items.length === 2) return { prev: undefined, next: items[1 - index] };
  return {
    prev: items[(index - 1 + items.length) % items.length],
    next: items[(index + 1) % items.length],
  };
}
