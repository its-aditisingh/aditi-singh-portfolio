import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, FolderGit2, Lightbulb } from 'lucide-react';
import { HighlightPings } from '@/components/animations/HighlightPings';
import { Magnetic } from '@/components/animations/Magnetic';
import { RevealText } from '@/components/animations/RevealText';
import { SocialLinks } from '@/components/layout/SocialLinks';
import { HeroCanvas } from '@/components/three/HeroCanvas';
import { Button } from '@/components/ui/Button';
import { ResponsiveImage } from '@/components/ui/ResponsiveImage';
import { profile } from '@/data/profile';
import { researchInterests } from '@/data/skills';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { ease, fadeUp, staggerParent } from '@/lib/motion';

// The lines under the name start once the letters have mostly risen (#01 total ≤ 1.2s)
const lines = staggerParent(0.08, 0.45);

// docs/03-features/01-home.md §1
export function Hero() {
  const reduce = useReducedMotion();
  const photoRef = useRef<HTMLDivElement>(null);
  const initial = reduce ? false : 'hidden';

  return (
    <section
      aria-labelledby="hero-name"
      // overflow-x-clip: the decorative network is wider than the photo and must never cause sideways scroll
      className="container-page grid items-center gap-12 overflow-x-clip pb-16 pt-10 md:pt-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8 lg:pb-24"
    >
      <motion.div variants={lines} initial={initial} animate="show" className="order-2 lg:order-1">
        <motion.p
          variants={fadeUp}
          className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-[13px] font-medium text-ink"
        >
          <span aria-hidden className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-success" />
          </span>
          {profile.availability}
        </motion.p>

        <p className="mt-6 font-mono text-[13px] uppercase tracking-[0.08em] text-muted">
          Hi, I&apos;m
        </p>
        <h1
          id="hero-name"
          className="mt-2 text-[44px] font-extrabold leading-[0.95] tracking-[-0.03em] text-ink sm:text-[64px] lg:text-[88px]"
        >
          <RevealText text={profile.name} />
        </h1>

        <motion.p
          variants={fadeUp}
          className="mt-5 text-xl font-bold tracking-[-0.01em] text-accent-ink md:text-2xl"
        >
          {profile.roles[0]}
        </motion.p>
        <motion.p
          variants={fadeUp}
          className="mt-1 text-[15px] font-medium text-muted md:text-base"
        >
          {profile.headline}
        </motion.p>

        <motion.p variants={fadeUp} className="mt-6 max-w-xl text-ink/85">
          {profile.objectiveShort}
        </motion.p>

        {/* Research interests sit right above the actions (owner request, 31 Oct) */}
        <motion.div variants={fadeUp} className="mt-7">
          <h2
            id="hero-research"
            className="flex items-center gap-1.5 font-mono text-[12px] font-medium uppercase tracking-[0.08em] text-muted"
          >
            <Lightbulb aria-hidden strokeWidth={1.75} className="size-4 text-accent" />
            Research interests
          </h2>
          <ul aria-labelledby="hero-research" className="mt-2.5 flex max-w-xl flex-wrap gap-1.5">
            {researchInterests.map((interest) => (
              <li
                key={interest}
                className="rounded-full border border-accent/25 bg-accent-soft px-3 py-1 text-[13px] font-medium text-accent-ink"
              >
                {interest}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div variants={fadeUp} className="mt-6 flex flex-wrap items-center gap-3">
          <Magnetic>
            <Button to="/contact" icon={ArrowRight}>
              Get In Touch
            </Button>
          </Magnetic>
          <Button to="/projects" variant="secondary" icon={FolderGit2} iconPosition="start">
            Projects
          </Button>
          <Button
            href={profile.resumeUrl}
            download
            variant="secondary"
            icon={Download}
            iconPosition="start"
          >
            Resume
          </Button>
        </motion.div>

        <motion.div variants={fadeUp}>
          <SocialLinks className="mt-6" />
        </motion.div>
      </motion.div>

      {/* isolate: keeps the -z-10 network above the page backdrop */}
      <div className="relative isolate order-1 mx-auto w-[240px] sm:w-[300px] lg:order-2 lg:w-[400px]">
        <HeroCanvas
          interactionRef={photoRef}
          className="absolute left-1/2 top-1/2 -z-10 aspect-square w-[210%] -translate-x-1/2 -translate-y-1/2 opacity-60 [mask-image:radial-gradient(closest-side,black_55%,transparent)] lg:opacity-90"
        />
        <motion.div
          ref={photoRef}
          // Starts visible (opacity 0.6, not 0) — the photo is part of the LCP
          initial={reduce ? false : { opacity: 0.6, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1, y: reduce ? 0 : [0, -6, 0] }}
          transition={{
            opacity: { duration: 0.6, ease: ease.out },
            scale: { duration: 0.6, ease: ease.out },
            y: { duration: 6, ease: 'easeInOut', repeat: Infinity, delay: 1 },
          }}
          className="relative overflow-hidden rounded-b-[28px] rounded-t-full border border-line bg-surface-2 shadow-card"
        >
          <ResponsiveImage
            image={profile.photo}
            sizes="(min-width: 1024px) 400px, (min-width: 640px) 300px, 240px"
            priority
            className="aspect-[4/5] w-full object-cover"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-accent/25 to-transparent"
          />
        </motion.div>

        <HighlightPings className="absolute -bottom-6 left-1/2 -translate-x-1/2 lg:-left-24 lg:bottom-14 lg:translate-x-0" />
      </div>
    </section>
  );
}
