import { useState } from 'react';
import { cn } from '@/lib/cn';
import type { CaptionedImage } from '@/types';
import { Lightbox } from './Lightbox';
import { ResponsiveImage } from './ResponsiveImage';

interface GalleryProps {
  images: CaptionedImage[];
  /** masonry keeps each photo's own aspect ratio (event photos); grid suits same-size screenshots. */
  layout?: 'grid' | 'masonry';
  className?: string;
}

export function Gallery({ images, layout = 'grid', className }: GalleryProps) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <>
      <ul
        className={cn(
          layout === 'masonry'
            ? 'columns-1 gap-3 sm:columns-2 [&>li]:mb-3'
            : 'grid gap-4 sm:grid-cols-2',
          className,
        )}
      >
        {images.map((image, i) => (
          <li key={`${image.src}-${i}`} className="break-inside-avoid">
            <figure>
              <button
                type="button"
                onClick={() => setOpen(i)}
                aria-label={`View larger: ${image.caption}`}
                className="group block w-full overflow-hidden rounded-xl border border-line bg-surface-2"
              >
                <ResponsiveImage
                  image={image}
                  sizes="(min-width: 640px) 480px, 100vw"
                  className="w-full transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                />
              </button>
              <figcaption className="mt-2 text-xs text-muted">{image.caption}</figcaption>
            </figure>
          </li>
        ))}
      </ul>
      <Lightbox
        images={images}
        index={open}
        onClose={() => setOpen(null)}
        onIndexChange={setOpen}
      />
    </>
  );
}
