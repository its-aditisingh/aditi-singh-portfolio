import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ProjectCard } from '@/components/cards/ProjectCard';
import { CollectionRoute } from '@/components/detail/CollectionRoute';
import { Seo } from '@/components/layout/Seo';
import { FilterTabs, type FilterTabItem } from '@/components/ui/FilterTabs';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { projects } from '@/data/projects';
import { cn } from '@/lib/cn';
import type { Project } from '@/types';

type Filter = 'all' | Project['category'];

// docs/03-features/03-projects.md
export function ProjectsPage() {
  const [filter, setFilter] = useState<Filter>('all');

  const categories = [...new Set(projects.map((p) => p.category))];
  const tabs: FilterTabItem<Filter>[] = [
    { value: 'all', label: 'All', count: projects.length },
    ...categories.map((category) => ({
      value: category,
      label: category,
      count: projects.filter((p) => p.category === category).length,
    })),
  ];
  const visible = filter === 'all' ? projects : projects.filter((p) => p.category === filter);

  return (
    <CollectionRoute>
      <Seo
        title="Projects"
        description="AI/ML and data analytics projects by Aditi Singh — EEG-based mental disorder prediction, Power BI healthcare dashboards and industry ML work."
        path="/projects"
      />
      <section className="container-page pt-10 md:pt-16">
        <SectionHeading
          as="h1"
          index={3}
          eyebrow="Projects"
          title="Projects"
          description="From an EEG-based prediction platform to Power BI healthcare dashboards — open any project for the full story."
        />

        {categories.length > 1 && (
          <FilterTabs
            label="Filter projects by category"
            items={tabs}
            value={filter}
            onChange={setFilter}
            className="mt-8"
          />
        )}

        <ul aria-label="Projects" className="mt-6 grid gap-5 md:grid-cols-2">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((project) => (
              <motion.li
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
                key={project.slug}
                className={cn(project.featured && filter === 'all' && 'md:col-span-2')}
              >
                <ProjectCard
                  project={project}
                  index={projects.indexOf(project) + 1}
                  wide={project.featured && filter === 'all'}
                />
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </section>
    </CollectionRoute>
  );
}
