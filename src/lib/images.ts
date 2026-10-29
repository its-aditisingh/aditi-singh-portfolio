import { images, type ImageKey } from '@/data/images.generated';
import type { ImageRef } from '@/types';

/** Looks up a generated image (see scripts/generate-images.mjs) and attaches its alt text. */
export function image(key: ImageKey, alt: string): ImageRef {
  return { ...images[key], alt };
}

/** Same as `image`, plus a visible caption (galleries). */
export function captioned(
  key: ImageKey,
  alt: string,
  caption: string,
): ImageRef & { caption: string } {
  return { ...image(key, alt), caption };
}
