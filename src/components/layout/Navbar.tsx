import { useCallback, useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, useMotionValueEvent } from 'framer-motion';
import { Download, Menu } from 'lucide-react';
import { navItems } from '@/data/navigation';
import { profile } from '@/data/profile';
import { useScrollY } from '@/hooks/useScrollMotion';
import { useSlidingIndicator } from '@/hooks/useSlidingIndicator';
import { cn } from '@/lib/cn';
import { ease } from '@/lib/motion';
import { Button } from '@/components/ui/Button';
import { Logo } from './Logo';
import { MobileMenu } from './MobileMenu';
import { ThemeToggle } from './ThemeToggle';

const SOLID_AFTER = 24;
const HIDE_AFTER = 120;

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);
  const section = '/' + (useLocation().pathname.split('/')[1] ?? '');
  const pill = useSlidingIndicator(listRef, section);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(() => window.scrollY > SOLID_AFTER);
  const scrollY = useScrollY();

  useMotionValueEvent(scrollY, 'change', (y) => {
    setScrolled(y > SOLID_AFTER);
    if (menuOpen) return setHidden(false);
    const previous = scrollY.getPrevious() ?? 0;
    setHidden(y > previous && y > HIDE_AFTER);
  });

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  // The overlay is mobile-only; close it if the viewport grows to desktop
  useEffect(() => {
    if (!menuOpen) return;
    const desktop = window.matchMedia('(min-width: 1024px)');
    const onChange = () => desktop.matches && setMenuOpen(false);
    desktop.addEventListener('change', onChange);
    return () => desktop.removeEventListener('change', onChange);
  }, [menuOpen]);

  return (
    <>
      <motion.header
        animate={{ y: hidden ? '-100%' : '0%' }}
        transition={{ duration: 0.25, ease: ease.out }}
        onFocusCapture={() => setHidden(false)}
        className={cn(
          'fixed inset-x-0 top-0 z-40 h-[var(--nav-h)] border-b transition-[background-color,border-color] duration-300',
          scrolled ? 'border-line bg-surface/80 backdrop-blur-md' : 'border-transparent',
        )}
      >
        <div className="container-page flex h-full items-center justify-between gap-4">
          <Logo />

          <nav aria-label="Main" className="hidden lg:block">
            <ul ref={listRef} className="relative flex items-center gap-0.5">
              <span
                aria-hidden
                style={pill}
                className="pointer-events-none absolute left-0 top-0 rounded-full bg-accent-soft duration-300 ease-out"
              />
              {navItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className="relative block rounded-full px-3 py-2 text-sm font-medium"
                    data-active={section === item.to}
                  >
                    {({ isActive }) => (
                      <>
                        <span
                          className={cn(
                            'relative transition-colors',
                            isActive ? 'text-accent-ink' : 'text-muted hover:text-ink',
                          )}
                        >
                          {item.label}
                        </span>
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button
              href={profile.resumeUrl}
              download
              variant="secondary"
              size="sm"
              icon={Download}
              iconPosition="start"
              className="hidden lg:inline-flex"
            >
              Resume
            </Button>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="grid size-11 place-items-center rounded-full border border-line bg-surface text-ink lg:hidden"
            >
              <Menu aria-hidden className="size-5" />
            </button>
          </div>
        </div>
      </motion.header>

      <MobileMenu open={menuOpen} onClose={closeMenu} />
    </>
  );
}
