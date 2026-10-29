import '@testing-library/jest-dom/vitest';
import { cleanup, configure } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

// Lazy routes make navigation async; under parallel test files a first modal render in jsdom can
// take over the default 1s, so give findBy/waitFor more headroom (real browsers are far faster).
configure({ asyncUtilTimeout: 3000 });

// jsdom lacks these browser APIs
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string): MediaQueryList => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  }),
});

window.scrollTo = vi.fn() as unknown as typeof window.scrollTo;
Element.prototype.scrollIntoView = vi.fn();
// jsdom has no IntersectionObserver: report everything as in view so whileInView/useInView settle
class InViewObserver {
  constructor(private callback: IntersectionObserverCallback) {}
  observe(target: Element) {
    this.callback(
      [{ isIntersecting: true, target, intersectionRatio: 1 } as IntersectionObserverEntry],
      this as unknown as IntersectionObserver,
    );
  }
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}
window.IntersectionObserver = InViewObserver as unknown as typeof IntersectionObserver;
// jsdom has no ResizeObserver either (useSlidingIndicator)
window.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
} as unknown as typeof ResizeObserver;
// No WebGL in jsdom (and its stub logs "not implemented"): report "unsupported" like an old browser
HTMLCanvasElement.prototype.getContext = (() =>
  null) as typeof HTMLCanvasElement.prototype.getContext;

// React Router's data router builds a fetch Request on every navigation. Node's Request rejects
// jsdom's AbortSignal, so drop the signal in tests (we have no loaders to abort).
const NodeRequest = globalThis.Request;
globalThis.Request = class extends NodeRequest {
  constructor(input: RequestInfo | URL, init?: RequestInit) {
    super(input, init && { ...init, signal: undefined });
  }
} as typeof Request;

afterEach(() => {
  cleanup();
});
