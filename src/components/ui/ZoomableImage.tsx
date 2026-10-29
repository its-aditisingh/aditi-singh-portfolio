import { useState } from 'react';
import { Maximize2 } from 'lucide-react';
import { cn } from '@/lib/cn';
import type { ImageRef } from '@/types';
import { Lightbox } from './Lightbox';
import { ResponsiveImage } from './ResponsiveImage';

interface ZoomableImageProps {
  image: ImageRef;
  sizes: string;
  className?: string;
  imageClassName?: string;
  caption?: string;
}

/** An image that opens full-size in the lightbox (certificate and proof previews). */
export function ZoomableImage({
  image,
  sizes,
  className,
  imageClassName,
  caption,
}: ZoomableImageProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`View larger: ${image.alt}`}
        className={cn(
          'group relative block w-full overflow-hidden rounded-card border border-line bg-surface-2',
          className,
        )}
      >
        <ResponsiveImage image={image} sizes={sizes} className={cn('w-full', imageClassName)} />
        <span
          aria-hidden
          className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-surface/90 text-ink opacity-0 shadow-card transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
        >
          <Maximize2 className="size-4" />
        </span>
      </button>
      <Lightbox
        images={[{ ...image, caption }]}
        index={open ? 0 : null}
        onClose={() => setOpen(false)}
        onIndexChange={() => {}}
      />
    </>
  );
}
