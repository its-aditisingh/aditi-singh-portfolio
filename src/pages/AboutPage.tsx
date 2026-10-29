import { motion } from 'framer-motion';
import { BookOpen, Check, Globe, Lightbulb, Mic, Presentation, Scale, Target } from 'lucide-react';
import { BentoTile } from '@/components/about/BentoTile';
import { EducationTile } from '@/components/about/EducationTile';
import { JourneyTimeline } from '@/components/about/JourneyTimeline';
import { LearningTile } from '@/components/about/LearningTile';
import { SkillsTile } from '@/components/about/SkillsTile';
import { CompareColumns } from '@/components/animations/CompareColumns';
import { Seo } from '@/components/layout/Seo';
import { Chip } from '@/components/ui/Chip';
import { ResponsiveImage } from '@/components/ui/ResponsiveImage';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { education } from '@/data/education';
import { profile } from '@/data/profile';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { bentoItem, inViewOnce, staggerParent } from '@/lib/motion';
import {
  academicEngagements,
  classroomVsIndustry,
  researchInterests,
  teachingCompetencies,
} from '@/data/skills';

// docs/03-features/02-about.md
// DOM order = mobile reading order; lg:* classes place each tile in the 4-column desktop bento.
export function AboutPage() {
  const [mca, bca] = education;
  const reduce = useReducedMotion();

  return (
    <>
      <Seo
        title="About"
        description="Education, technical skills, teaching competencies and what Aditi Singh is learning right now."
        path="/about"
      />

      <section className="container-page pt-10 md:pt-16">
        <SectionHeading
          as="h1"
          index={2}
          eyebrow="About"
          title="About me"
          description="MCA (95%) in AI/ML & Data Science, industry AI/ML intern, and an aspiring Assistant Professor."
        />
      </section>

      {/* #06 Bento build: tiles assemble in reading order on first view */}
      <motion.div
        variants={staggerParent()}
        initial={reduce ? false : 'hidden'}
        whileInView="show"
        viewport={inViewOnce}
        className="container-page mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-5"
      >
        {/* Row 1 */}
        <motion.section
          variants={bentoItem}
          aria-label="Introduction"
          className="flex flex-col gap-5 rounded-card bg-surface p-5 shadow-card sm:flex-row md:col-span-2 md:p-6 lg:col-start-1 lg:row-start-1"
        >
          <ResponsiveImage
            image={profile.photo}
            sizes="160px"
            className="aspect-[4/5] w-32 shrink-0 rounded-[18px] object-cover sm:w-36"
          />
          <p className="text-[15px] leading-relaxed text-ink/85">{profile.objectiveLong}</p>
        </motion.section>

        {mca && (
          <EducationTile education={mca} id="education" className="lg:col-start-3 lg:row-start-1" />
        )}
        {bca && <EducationTile education={bca} className="lg:col-start-4 lg:row-start-1" />}

        {/* Rows 2–3 */}
        <SkillsTile className="md:col-span-2 lg:col-start-1 lg:row-span-2 lg:row-start-2" />
        <LearningTile className="lg:col-start-3 lg:row-span-2 lg:row-start-2" />

        {/* Row 4 (teaching) — placed before research/languages for mobile reading order */}
        <BentoTile
          title="Teaching competencies"
          icon={Presentation}
          className="md:col-span-2 lg:col-start-1 lg:row-start-4"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {teachingCompetencies.map((group) => (
              <div key={group.title}>
                <h3 className="text-sm font-bold text-ink">{group.title}</h3>
                <ul className="mt-1.5 space-y-1 text-sm text-muted">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </BentoTile>

        <BentoTile
          title="Research interests"
          icon={Lightbulb}
          className="lg:col-start-4 lg:row-start-3"
        >
          <ul className="flex flex-wrap gap-1.5">
            {researchInterests.map((interest) => (
              <li key={interest}>
                <Chip>{interest}</Chip>
              </li>
            ))}
          </ul>
        </BentoTile>

        <BentoTile
          title="Academic engagements"
          icon={Mic}
          className="lg:col-start-3 lg:row-start-4"
        >
          <ul className="space-y-2.5 text-sm text-ink/85">
            {academicEngagements.map((item) => (
              <li key={item} className="flex gap-2">
                <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                {item}
              </li>
            ))}
          </ul>
        </BentoTile>

        <BentoTile title="Languages" icon={Globe} className="lg:col-start-4 lg:row-start-2">
          <dl className="space-y-3">
            {profile.languages.map((language) => (
              <div key={language.name} className="flex items-baseline justify-between gap-3">
                <dt className="text-lg font-bold text-ink">{language.name}</dt>
                <dd className="text-sm text-muted">{language.level}</dd>
              </div>
            ))}
          </dl>
        </BentoTile>

        {/* Row 5 */}
        {profile.teachingPhilosophy && (
          <BentoTile
            title="Teaching philosophy"
            icon={BookOpen}
            className="md:col-span-2 lg:col-span-3 lg:col-start-1 lg:row-start-5"
          >
            <blockquote className="relative pl-8 text-lg font-medium leading-relaxed text-ink md:text-xl">
              <span
                aria-hidden
                className="absolute -top-2 left-0 font-serif text-5xl leading-none text-accent"
              >
                “
              </span>
              {profile.teachingPhilosophy}
            </blockquote>
          </BentoTile>
        )}

        <BentoTile
          title="Open to"
          icon={Target}
          className="lg:col-start-4 lg:row-span-2 lg:row-start-4"
        >
          <ul className="space-y-3 text-sm text-ink/85">
            {profile.openTo.map((item) => (
              <li key={item} className="flex gap-2">
                <Check
                  aria-hidden
                  strokeWidth={2.5}
                  className="mt-0.5 size-4 shrink-0 text-accent"
                />
                {item}
              </li>
            ))}
          </ul>
        </BentoTile>

        {/* Row 6 */}
        <BentoTile
          title="Classroom ⟷ Industry"
          icon={Scale}
          className="md:col-span-2 lg:col-span-4 lg:col-start-1 lg:row-start-6"
        >
          <CompareColumns block={classroomVsIndustry} />
        </BentoTile>
      </motion.div>

      <JourneyTimeline />
    </>
  );
}
