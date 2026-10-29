import type { ImageRef } from '@/types';

interface ResponsiveImageProps {
  image: ImageRef;
  /** `sizes` attribute for the srcSet, e.g. "(min-width: 1024px) 400px, 240px". */
  sizes: string;
  /** Above-the-fold images: eager + high fetch priority (LCP). */
  priority?: boolean;
  className?: string;
}

export function ResponsiveImage({
  image,
  sizes,
  priority = false,
  className,
}: ResponsiveImageProps) {
  return (
    <img
      src={image.src}
      srcSet={image.srcSet}
      sizes={image.srcSet ? sizes : undefined}
      width={image.width}
      height={image.height}
      alt={image.alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      // React 18 doesn't know the camelCase prop yet; the lowercase attribute passes through
      {...(priority ? { fetchpriority: 'high' } : {})}
      className={className}
    />
  );
}
