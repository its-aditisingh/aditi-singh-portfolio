import { useLayoutEffect, useState, type CSSProperties, type RefObject } from 'react';

/**
 * Position for a pill that slides under the active item of a nav / tab list.
 *
 * Replaces Framer `layoutId` pills (Phase 8 profiling): a layout-projection node inside the
 * animating navbar made Framer re-measure the page every frame (~9 s of main thread at 4× CPU).
 * This measures only when the active item changes or the window resizes; CSS does the slide.
 *
 * @param activeKey changes whenever the active item changes (e.g. pathname or tab value)
 */
export function useSlidingIndicator(
  containerRef: RefObject<HTMLElement>,
  activeKey: string,
): CSSProperties {
  const [style, setStyle] = useState<CSSProperties>({ opacity: 0 });

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let animate = false;

    const measure = () => {
      const active = container.querySelector<HTMLElement>('[data-active="true"]');
      if (!active) return setStyle({ opacity: 0 });
      setStyle({
        opacity: 1,
        width: active.offsetWidth,
        height: active.offsetHeight,
        transform: `translate(${active.offsetLeft}px, ${active.offsetTop}px)`,
        // no slide on first paint or resize — only when the active item changes
        transitionProperty: animate ? 'transform, width, opacity' : 'none',
      });
    };

    measure();
    animate = true;
    const observer = new ResizeObserver(() => {
      animate = false;
      measure();
      animate = true;
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, [containerRef, activeKey]);

  return style;
}
