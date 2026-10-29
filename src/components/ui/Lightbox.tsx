import { useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import type { ImageRef } from '@/types';

export type LightboxImage = ImageRef & { caption?: string };

interface LightboxProps {
  images: LightboxImage[];
  /** Open image index, or null when closed. */
  index: number | null;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

/** Full-screen image viewer: ←/→ to step, Esc to close (FR-C7 zoom, project/achievement galleries). */
export function Lightbox({ images, index, onClose, onIndexChange }: LightboxProps) {
  const open = index !== null && images[index] !== undefined;
  return createPortal(
    <AnimatePresence>
      {open && (
        <LightboxView
          images={images}
          index={index}
          onClose={onClose}
          onIndexChange={onIndexChange}
        />
      )}
    </AnimatePresence>,
    document.body,
  );
}

function LightboxView({
  images,
  index,
  onClose,
  onIndexChange,
}: LightboxProps & { index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  // Callers often pass inline functions; keep the focus trap from re-initialising on every render
  const latest = useRef({ onClose, onIndexChange });
  latest.current = { onClose, onIndexChange };
  const close = useCallback(() => latest.current.onClose(), []);

  const count = images.length;
  const go = useCallback(
    (step: number) => latest.current.onIndexChange((index + step + count) % count),
    [index, count],
  );

  useLockBodyScroll(true);
  useFocusTrap(ref, true, close);

  useEffect(() => {
    if (count < 2) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') go(1);
      if (event.key === 'ArrowLeft') go(-1);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [go, count]);

  const image = images[index];
  if (!image) return null;

  const navButton =
    'grid size-11 shrink-0 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20';

  return (
    <motion.div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[60] flex flex-col bg-black/90 p-3 sm:p-6"
    >
      <div className="flex items-center justify-between text-white">
        <span className="font-mono text-xs tracking-[0.06em] text-white/70">
          {count > 1 ? `${index + 1} / ${count}` : ''}
        </span>
        <button type="button" onClick={close} aria-label="Close image viewer" className={navButton}>
          <X aria-hidden className="size-5" />
        </button>
      </div>

      <div className="flex min-h-0 flex-1 items-center justify-center gap-3 py-3">
        {count > 1 && (
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous image"
            className={`${navButton} hidden sm:grid`}
          >
            <ChevronLeft aria-hidden className="size-5" />
          </button>
        )}
        <figure className="flex h-full min-w-0 flex-1 flex-col items-center justify-center">
          <img
            key={image.src}
            src={image.src}
            srcSet={image.srcSet}
            sizes="100vw"
            alt={image.alt}
            className="max-h-full min-h-0 max-w-full rounded-lg object-contain"
          />
          {image.caption && (
            <figcaption className="mt-3 text-center text-sm text-white/80">
              {image.caption}
            </figcaption>
          )}
        </figure>
        {count > 1 && (
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next image"
            className={`${navButton} hidden sm:grid`}
          >
            <ChevronRight aria-hidden className="size-5" />
          </button>
        )}
      </div>

      {count > 1 && (
        <div className="flex justify-center gap-3 sm:hidden">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous image"
            className={navButton}
          >
            <ChevronLeft aria-hidden className="size-5" />
          </button>
          <button type="button" onClick={() => go(1)} aria-label="Next image" className={navButton}>
            <ChevronRight aria-hidden className="size-5" />
          </button>
        </div>
      )}
    </motion.div>
  );
}
