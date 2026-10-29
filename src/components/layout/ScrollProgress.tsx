import { motion } from 'framer-motion';
import { usePageProgress } from '@/hooks/useScrollMotion';

export function ScrollProgress() {
  const scrollYProgress = usePageProgress();

  return (
    <motion.div
      aria-hidden
      style={{ scaleX: scrollYProgress }}
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-accent"
    />
  );
}
