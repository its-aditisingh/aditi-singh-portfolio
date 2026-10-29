import { ScrollRestoration } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { useScrollToHash } from '@/hooks/useScrollToHash';
import { Footer } from './Footer';
import { Navbar } from './Navbar';
import { NavigationProgress } from './NavigationProgress';
import { AnimatedOutlet } from './PageTransition';
import { ScrollProgress } from './ScrollProgress';

export function RootLayout() {
  useScrollToHash();

  return (
    // reducedMotion="user": Framer skips transform animations when the OS asks for less motion
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="sr-only z-[70] rounded-full bg-accent-btn px-4 py-2 font-semibold text-on-accent focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <div aria-hidden className="page-backdrop" />
      <ScrollProgress />
      <NavigationProgress />
      <Navbar />
      <main id="main" tabIndex={-1} className="min-h-[70vh] pt-[var(--nav-h)] outline-none">
        <AnimatedOutlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </MotionConfig>
  );
}
