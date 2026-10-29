// Where a detail modal should grow from: the rect of the card that was just clicked.
// Read-only in render (safe under StrictMode's double initialisers); expires quickly so
// Prev/Next or later navigations fall back to the default open animation.

const FRESH_MS = 800;
let origin: { rect: DOMRect; at: number } | null = null;

export function setModalOrigin(rect: DOMRect) {
  origin = { rect, at: performance.now() };
}

export function readModalOrigin(): DOMRect | null {
  return origin && performance.now() - origin.at < FRESH_MS ? origin.rect : null;
}
