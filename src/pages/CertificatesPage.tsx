import { useId } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { ShuffleDeck } from '@/components/animations/ShuffleDeck';
import { CertificateCard } from '@/components/cards/CertificateCard';
import { CollectionRoute } from '@/components/detail/CollectionRoute';
import { Seo } from '@/components/layout/Seo';
import { FilterTabs, type FilterTabItem } from '@/components/ui/FilterTabs';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { certificates } from '@/data/certificates';
import {
  categoryFromSlug,
  certCategories,
  certCategorySlugs,
  sortByDate,
  type SortOrder,
} from '@/lib/collections';

// The five featured certificates feed the shuffle deck (#04)
const featured = certificates.filter((c) => c.featured);

// Sum of the hours stated on certificates ("19 hours · 1.9 CEUs" → 19); some don't state any, hence "+"
const statedHours = certificates.reduce((sum, c) => {
  const match = c.duration?.match(/([\d.]+)\s*hours/);
  return sum + (match ? Number(match[1]) : 0);
}, 0);

// docs/03-features/04-certificates.md — filter + sort live in the URL so views are shareable
export function CertificatesPage() {
  const [params, setParams] = useSearchParams();
  const sortId = useId();

  const category = categoryFromSlug(params.get('category'));
  const order: SortOrder = params.get('sort') === 'oldest' ? 'oldest' : 'newest';

  const update = (key: 'category' | 'sort', value: string | null) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true, preventScrollReset: true });
  };

  const tabs: FilterTabItem<string>[] = [
    { value: 'all', label: 'All', count: certificates.length },
    ...certCategories.map((cat) => ({
      value: certCategorySlugs[cat],
      label: cat,
      count: certificates.filter((c) => c.category === cat).length,
    })),
  ];

  const visible = sortByDate(
    category ? certificates.filter((c) => c.category === category) : certificates,
    (c) => c.issueDate,
    order,
  );
  const search = params.toString() ? `?${params.toString()}` : '';

  return (
    <CollectionRoute>
      <Seo
        title="Certificates"
        description="Certificates earned by Aditi Singh from Kaggle, Saylor University, ISRO-IIRS, GeeksforGeeks, Anudip Foundation (AWS) and Udemy."
        path="/certificates"
      />
      <section className="container-page pt-10 md:pt-16">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_380px] lg:gap-16">
          <SectionHeading
            as="h1"
            index={5}
            eyebrow="Certificates"
            title="Certificates"
            description={`${certificates.length} certificates · ${Math.round(statedHours)}+ learning hours — from Kaggle and Saylor to ISRO-IIRS.`}
          />
          <div className="mx-auto w-full max-w-[380px]">
            <ShuffleDeck items={featured} />
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <FilterTabs
            label="Filter certificates by category"
            items={tabs}
            value={category ? certCategorySlugs[category] : 'all'}
            onChange={(value) => update('category', value === 'all' ? null : value)}
          />
          <div className="flex shrink-0 items-center gap-2 text-sm">
            <label htmlFor={sortId} className="text-muted">
              Sort
            </label>
            <select
              id={sortId}
              value={order}
              onChange={(event) =>
                update('sort', event.target.value === 'oldest' ? 'oldest' : null)
              }
              className="h-10 rounded-full border border-line bg-surface px-4 font-medium text-ink"
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
            </select>
          </div>
        </div>

        <p className="sr-only" role="status" aria-live="polite">
          Showing {visible.length} of {certificates.length} certificates
        </p>

        <ul aria-label="All certificates" className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((certificate) => (
              <motion.li
                key={certificate.slug}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
              >
                <CertificateCard certificate={certificate} search={search} />
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </section>
    </CollectionRoute>
  );
}
