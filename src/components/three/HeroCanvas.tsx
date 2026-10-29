import { lazy, Suspense, useEffect, useMemo, useRef, useState, type RefObject } from 'react';
import { supportsWebGL, useSceneCapability } from '@/hooks/useSceneCapability';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/cn';
import { HeroFallback } from './HeroFallback';
import type { PointerState, SceneColors } from './NeuralBrain';
import { SceneErrorBoundary } from './SceneErrorBoundary';

// three.js + R3F only load through this dynamic import, after first paint (NFR-P3/P4)
const NeuralScene = lazy(() => import('./NeuralScene').then((m) => ({ default: m.NeuralScene })));

const IDLE_TIMEOUT_MS = 1500;
const DESKTOP_DELAY_MS = 1500;

function cssColor(name: string): [number, number, number] {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const [r = 0, g = 0, b = 0] = raw.split(/\s+/).map(Number);
  return [r / 255, g / 255, b / 255];
}

interface HeroCanvasProps {
  className?: string;
  /** Element whose clicks fire the ripple (the photo frame — the canvas itself sits behind it). */
  interactionRef: RefObject<HTMLElement>;
}

/**
 * Hero visual (docs/04-design/3d-scene.md). Always renders the static SVG first; when the
 * device can handle it, mounts the WebGL network after the browser goes idle and crossfades.
 */
export function HeroCanvas({ className, interactionRef }: HeroCanvasProps) {
  const tier = useSceneCapability();
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const pointer = useRef<PointerState>({ x: 0, y: 0, inside: false });
  const ripple = useRef(0);

  const [mount, setMount] = useState(false);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(true);

  // When to load three.js (Phase 8, measured with Lighthouse): idle alone fired ~300 ms into load
  // and the scene's ~1.5 s of CPU then competed with the page.
  // - any interaction (pointer, touch, scroll, key) mounts it right away
  // - large screens: otherwise after `load` + DESKTOP_DELAY_MS + an idle moment
  // - small screens: interaction only — there it's a faint backdrop and the SVG looks the same
  useEffect(() => {
    if (!tier) return;
    let cancelled = false;
    const cleanups: (() => void)[] = [];
    const start = () => {
      if (!cancelled && supportsWebGL()) setMount(true);
    };

    const events = ['pointermove', 'pointerdown', 'touchstart', 'scroll', 'keydown'] as const;
    for (const type of events) window.addEventListener(type, start, { once: true, passive: true });
    cleanups.push(() => events.forEach((type) => window.removeEventListener(type, start)));

    if (!window.matchMedia('(max-width: 767px)').matches) {
      const afterLoad = () => {
        const timer = window.setTimeout(() => {
          // Safari has no requestIdleCallback (TS's DOM lib assumes it always exists)
          if (typeof window.requestIdleCallback === 'function') {
            const id = window.requestIdleCallback(start, { timeout: IDLE_TIMEOUT_MS });
            cleanups.push(() => window.cancelIdleCallback(id));
          } else start();
        }, DESKTOP_DELAY_MS);
        cleanups.push(() => window.clearTimeout(timer));
      };
      if (document.readyState === 'complete') afterLoad();
      else {
        window.addEventListener('load', afterLoad, { once: true });
        cleanups.push(() => window.removeEventListener('load', afterLoad));
      }
    }

    return () => {
      cancelled = true;
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [tier]);

  // Pause when scrolled away or the tab is hidden
  useEffect(() => {
    const node = containerRef.current;
    if (!mount || !node) return;
    let onScreen = true;
    const update = () => setVisible(onScreen && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => {
      onScreen = Boolean(entry?.isIntersecting);
      update();
    });
    observer.observe(node);
    document.addEventListener('visibilitychange', update);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', update);
    };
  }, [mount]);

  // Track the pointer over the visual (window-level: the photo covers the canvas)
  useEffect(() => {
    if (!mount) return;
    const onMove = (event: PointerEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
      pointer.current = { x, y, inside: Math.abs(x) <= 1 && Math.abs(y) <= 1 };
    };
    const onLeave = () => (pointer.current = { ...pointer.current, inside: false });
    const onClick = () => (ripple.current += 1);
    const target = interactionRef.current;
    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    target?.addEventListener('pointerdown', onClick);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      target?.removeEventListener('pointerdown', onClick);
    };
  }, [mount, interactionRef]);

  const colors = useMemo<SceneColors>(() => {
    const dark = theme === 'dark';
    return {
      node: cssColor('--accent'),
      glow: dark ? [1, 0.93, 0.88] : cssColor('--accent-ink'),
      pulse: dark ? [1, 0.89, 0.84] : cssColor('--accent-ink'),
      dark,
    };
  }, [theme]);

  const fallback = <HeroFallback className="size-full" />;

  return (
    <div ref={containerRef} aria-hidden className={cn('pointer-events-none', className)}>
      <div
        className={cn(
          'absolute inset-0 transition-opacity duration-700',
          ready ? 'opacity-0' : 'opacity-100',
        )}
      >
        {fallback}
      </div>
      {tier && mount && (
        <div
          className={cn(
            'absolute inset-0 transition-opacity duration-700',
            ready ? 'opacity-100' : 'opacity-0',
          )}
        >
          <SceneErrorBoundary fallback={null}>
            <Suspense fallback={null}>
              <NeuralScene
                nodeCount={tier.nodes}
                pulseCount={tier.pulses}
                colors={colors}
                active={visible}
                pointer={pointer}
                ripple={ripple}
                onReady={() => setReady(true)}
              />
            </Suspense>
          </SceneErrorBoundary>
        </div>
      )}
    </div>
  );
}
