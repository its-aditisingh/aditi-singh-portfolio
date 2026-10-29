import { useCallback, useId, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, X } from 'lucide-react';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { useIsModalRoute } from '@/hooks/useIsModalRoute';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { readModalOrigin } from '@/lib/modalOrigin';
import { ease } from '@/lib/motion';
import { DetailContext } from './detailContext';
import { DetailNav, type DetailNavItem } from './DetailNav';

interface DetailShellProps {
  /** List route, e.g. "/projects". */
  basePath: string;
  /** Collection name, e.g. "Projects". */
  collection: string;
  prev?: DetailNavItem;
  next?: DetailNavItem;
  children: ReactNode;
}

/**
 * Frame for every detail view (FR-C3/C4, NFR-A2).
 * modal: opened from the list — dialog over the list, focus trapped, Esc / ✕ / backdrop / Back close it.
 * page:  direct visit, refresh or shared link — normal page with a back link.
 */
export function DetailShell({ basePath, collection, prev, next, children }: DetailShellProps) {
  const isModal = useIsModalRoute();
  const titleId = useId();
  const context = { mode: isModal ? ('modal' as const) : ('page' as const), titleId };

  return (
    <DetailContext.Provider value={context}>
      {isModal ? (
        <ModalFrame collection={collection} titleId={titleId}>
          {children}
          <DetailNav basePath={basePath} prev={prev} next={next} />
        </ModalFrame>
      ) : (
        <article aria-labelledby={titleId} className="container-page pt-8 md:pt-12">
          <Link
            to={basePath}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-ink hover:underline"
          >
            <ArrowLeft aria-hidden className="size-4" />
            All {collection.toLowerCase()}
          </Link>
          <div className="mt-6">{children}</div>
          <DetailNav basePath={basePath} prev={prev} next={next} />
        </article>
      )}
    </DetailContext.Provider>
  );
}

interface ModalFrameProps {
  collection: string;
  titleId: string;
  children: ReactNode;
}

function ModalFrame({ collection, titleId, children }: ModalFrameProps) {
  const navigate = useNavigate();
  const panelRef = useRef<HTMLDivElement>(null);
  // Opened from the list, so the previous history entry is the list itself
  const close = useCallback(() => navigate(-1), [navigate]);
  const reduce = useReducedMotion();

  // Container transform: grow out of the card that was clicked. The panel is centred from sm up,
  // so its final centre is the viewport centre; on the mobile bottom sheet use the default open.
  const [from] = useState(() => {
    const rect = readModalOrigin();
    if (!rect || reduce || window.innerWidth < 640) return null;
    const finalWidth = Math.min(window.innerWidth - 48, 1024);
    return {
      x: rect.left + rect.width / 2 - window.innerWidth / 2,
      y: rect.top + rect.height / 2 - window.innerHeight / 2,
      scale: Math.max(rect.width / finalWidth, 0.2),
    };
  });

  useLockBodyScroll(true);
  useFocusTrap(panelRef, true, close);

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6">
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={close}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        initial={from ? { opacity: 0.4, ...from } : { opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: from ? 0.4 : 0.25, ease: ease.out }}
        className="relative flex max-h-[94dvh] w-full max-w-5xl flex-col overflow-hidden rounded-t-modal bg-canvas shadow-2xl sm:max-h-[calc(100dvh-3rem)] sm:rounded-modal"
      >
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-line bg-surface px-4 py-3 sm:px-6">
          <span className="font-mono text-xs uppercase tracking-[0.08em] text-muted">
            {collection}
          </span>
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="grid size-10 place-items-center rounded-full border border-line bg-surface text-ink transition-colors hover:bg-surface-2"
          >
            <X aria-hidden className="size-5" />
          </button>
        </div>
        {/* article: keeps detail content from becoming page-level landmarks inside the portal */}
        <article
          aria-labelledby={titleId}
          className="overflow-y-auto overscroll-contain px-4 py-6 sm:px-8 sm:py-8"
        >
          {children}
        </article>
      </motion.div>
    </div>,
    document.body,
  );
}
