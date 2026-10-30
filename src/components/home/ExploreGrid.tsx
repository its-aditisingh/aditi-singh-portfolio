import { motion } from 'framer-motion';
import { IndexCard } from '@/components/ui/IndexCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { navItems } from '@/data/navigation';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { bentoItem, inViewOnce, staggerParent } from '@/lib/motion';

const descriptions: Record<string, string> = {
  '/about': 'Education, skills & what I’m learning',
  '/research': 'Interests, write-ups & paper notes',
  '/projects': 'AI/ML and data analytics work',
  '/certificates': 'Kaggle, Saylor, ISRO-IIRS & more',
  '/achievements': 'GOER 2025 finalist & anchoring',
  '/experience': 'Industry internship & training',
  '/contact': 'Let’s work together',
};

export function ExploreGrid() {
  const reduce = useReducedMotion();
  const items = navItems.filter((item) => item.to !== '/');

  return (
    <section aria-labelledby="explore-heading" className="container-page mt-20 md:mt-28">
      <SectionHeading
        id="explore-heading"
        eyebrow="Explore"
        title="Find your way around"
        className="mb-8"
      />
      <motion.ul
        variants={staggerParent()}
        initial={reduce ? false : 'hidden'}
        whileInView="show"
        viewport={inViewOnce}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {items.map((item, i) => (
          <motion.li key={item.to} variants={bentoItem}>
            <IndexCard
              index={i + 1}
              title={item.label}
              icon={item.icon}
              to={item.to}
              description={descriptions[item.to]}
            />
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}
