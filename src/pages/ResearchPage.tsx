import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, FileText, Lightbulb, NotebookPen } from 'lucide-react';
import { Seo } from '@/components/layout/Seo';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Chip } from '@/components/ui/Chip';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { projects } from '@/data/projects';
import { paperNotes, workingPapers } from '@/data/research';
import { researchInterests } from '@/data/skills';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { formatDate } from '@/lib/format';
import { bentoItem, inViewOnce, staggerParent } from '@/lib/motion';

const subheading = 'font-mono text-[12px] font-medium uppercase tracking-[0.08em] text-muted';

// docs/03-features/08-research.md — interests, Aditi's own write-ups (PDF) and reading notes
export function ResearchPage() {
  const reduce = useReducedMotion();
  const reveal = {
    variants: staggerParent(),
    initial: reduce ? false : ('hidden' as const),
    whileInView: 'show',
    viewport: inViewOnce,
  };

  return (
    <>
      <Seo
        title="Research"
        description="Research interests and write-ups by Aditi Singh — machine learning for healthcare data, EEG-based classification and educational technology."
        path="/research"
      />
      <section className="container-page pt-10 md:pt-16">
        <SectionHeading
          as="h1"
          index={3}
          eyebrow="Research"
          title="Research"
          description="Machine learning on health data and how it is taught — write-ups of my own work and notes on papers I read."
        />

        <motion.section
          aria-labelledby="research-interests"
          {...reveal}
          className="mt-10 rounded-card bg-surface p-5 shadow-card md:p-6"
        >
          <h2 id="research-interests" className={`flex items-center gap-2 ${subheading}`}>
            <Lightbulb aria-hidden strokeWidth={1.75} className="size-4 text-accent" />
            Research interests
          </h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {researchInterests.map((interest) => (
              <motion.li key={interest} variants={bentoItem}>
                <Chip className="bg-accent-soft text-[14px] text-accent-ink">{interest}</Chip>
              </motion.li>
            ))}
          </ul>
        </motion.section>

        <section aria-labelledby="write-ups" className="mt-14">
          <h2 id="write-ups" className={subheading}>
            Write-ups
          </h2>
          <motion.ul {...reveal} className="mt-4 grid gap-5">
            {workingPapers.map((paper) => {
              const project = projects.find((p) => p.slug === paper.relatedProject);
              return (
                <motion.li
                  key={paper.slug}
                  variants={bentoItem}
                  className="rounded-card bg-surface p-5 shadow-card md:flex md:gap-6 md:p-7"
                >
                  <span className="hidden size-14 shrink-0 place-items-center rounded-2xl bg-accent-soft text-accent md:grid">
                    <FileText aria-hidden strokeWidth={1.75} className="size-7" />
                  </span>
                  <article className="min-w-0">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                      <Badge>{paper.kind}</Badge>
                      <span className="font-mono text-xs text-muted">
                        {formatDate(paper.date)} · {paper.pages} pages · PDF
                      </span>
                    </div>
                    <h3 className="mt-3 text-xl font-bold leading-snug tracking-[-0.01em] text-ink md:text-2xl">
                      {paper.title}
                    </h3>
                    <p className="mt-3 max-w-3xl text-ink/80">{paper.abstract}</p>
                    <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Topics">
                      {paper.topics.map((topic) => (
                        <li key={topic}>
                          <Chip>{topic}</Chip>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <Button
                        href={paper.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        icon={FileText}
                        iconPosition="start"
                      >
                        Read the PDF
                      </Button>
                      {project && (
                        <Button to={`/projects/${project.slug}`} variant="secondary" icon={ArrowRight}>
                          {project.title}
                        </Button>
                      )}
                    </div>
                  </article>
                </motion.li>
              );
            })}
          </motion.ul>
        </section>

        {paperNotes.length > 0 && (
          <section aria-labelledby="reading-notes" className="mt-14">
            <h2 id="reading-notes" className={`flex items-center gap-2 ${subheading}`}>
              <NotebookPen aria-hidden strokeWidth={1.75} className="size-4 text-accent" />
              Reading notes
            </h2>
            <motion.ul {...reveal} className="mt-4 grid gap-5 md:grid-cols-2">
              {paperNotes.map((note) => (
                <motion.li
                  key={note.title}
                  variants={bentoItem}
                  className="flex flex-col rounded-card bg-surface p-5 shadow-card md:p-6"
                >
                  <article>
                    <p className="font-mono text-xs text-muted">
                      {note.venue} · {note.year}
                    </p>
                    <h3 className="mt-2 font-bold leading-snug text-ink">
                      {note.url ? (
                        <a
                          href={note.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-accent-ink hover:underline"
                        >
                          {note.title}
                          <ArrowUpRight aria-hidden className="ml-1 inline size-4" />
                        </a>
                      ) : (
                        note.title
                      )}
                    </h3>
                    <p className="mt-1 text-sm text-muted">{note.authors}</p>
                    <p className="mt-3 text-[15px] text-ink/85">{note.summary}</p>
                    {note.takeaways.length > 0 && (
                      <ul className="mt-3 space-y-1.5 text-sm text-ink/85">
                        {note.takeaways.map((takeaway) => (
                          <li key={takeaway} className="flex gap-2">
                            <span
                              aria-hidden
                              className="mt-2 size-1.5 shrink-0 rounded-full bg-accent"
                            />
                            {takeaway}
                          </li>
                        ))}
                      </ul>
                    )}
                  </article>
                </motion.li>
              ))}
            </motion.ul>
          </section>
        )}

        <p className="mt-14 text-sm text-muted">
          Interested in collaborating on healthcare analytics or educational technology?{' '}
          <Link to="/contact" className="font-semibold text-accent-ink hover:underline">
            Get in touch
          </Link>
          .
        </p>
      </section>
    </>
  );
}
