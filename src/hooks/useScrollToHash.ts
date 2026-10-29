import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const MAX_FRAMES = 90; // ~1.5s — covers the page-exit animation before the target mounts

/**
 * Scrolls to `#id` after navigation. React Router's ScrollRestoration tries this too, but the
 * target isn't mounted yet while the previous page animates out, so we retry for a few frames.
 */
export function useScrollToHash() {
  const { hash, key } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const id = decodeURIComponent(hash.slice(1));
    let frame = 0;
    let tries = 0;

    const attempt = () => {
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ block: 'start' });
        return;
      }
      if (tries++ < MAX_FRAMES) frame = requestAnimationFrame(attempt);
    };

    attempt();
    return () => cancelAnimationFrame(frame);
  }, [hash, key]);
}
