import { useRef } from 'react';
import { createPortal } from 'react-dom';
import { NavLink } from 'react-router-dom';
import { AnimatePresence, motion, type Variants } from 'framer-motion';
import { Download, X } from 'lucide-react';
import { navItems } from '@/data/navigation';
import { profile } from '@/data/profile';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { cn } from '@/lib/cn';
import { formatIndex } from '@/lib/format';
import { ease } from '@/lib/motion';
import { Button } from '@/components/ui/Button';
import { Logo } from './Logo';

const list: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: ease.out } },
};

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

/** Full-screen menu below 1024px (layout spec). Portalled so the navbar's hide transform can't clip it. */
export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  useLockBodyScroll(open);
  useFocusTrap(panelRef, open, onClose);

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panelRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-surface lg:hidden"
        >
          <div className="container-page flex h-[var(--nav-h)] shrink-0 items-center justify-between">
            <Logo onClick={onClose} />
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="grid size-11 place-items-center rounded-full border border-line bg-surface text-ink"
            >
              <X aria-hidden className="size-5" />
            </button>
          </div>

          <nav aria-label="Mobile" className="container-page mt-4">
            <motion.ul variants={list} initial="hidden" animate="show" className="flex flex-col">
              {navItems.map((navItem, i) => (
                <motion.li key={navItem.to} variants={item}>
                  <NavLink
                    to={navItem.to}
                    end={navItem.to === '/'}
                    onClick={onClose}
                    className="group flex items-center gap-4 border-b border-line py-4"
                  >
                    {({ isActive }) => (
                      <>
                        <span className="w-6 font-mono text-[13px] text-muted">
                          {formatIndex(i + 1)}
                        </span>
                        <span
                          className={cn(
                            'flex-1 text-[28px] font-extrabold tracking-[-0.02em]',
                            isActive ? 'text-accent-ink' : 'text-ink',
                          )}
                        >
                          {navItem.label}
                        </span>
                        <navItem.icon
                          aria-hidden
                          strokeWidth={1.75}
                          className="size-[22px] text-accent transition-transform group-hover:-rotate-[8deg]"
                        />
                      </>
                    )}
                  </NavLink>
                </motion.li>
              ))}
            </motion.ul>
          </nav>

          <div className="container-page mt-auto pb-8 pt-8">
            <Button
              href={profile.resumeUrl}
              download
              icon={Download}
              iconPosition="start"
              className="w-full"
            >
              Download Resume
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
