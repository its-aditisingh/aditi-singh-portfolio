import { TiltCard } from '@/components/animations/TiltCard';
import { DetailLink } from '@/components/detail/DetailLink';
import { Badge } from '@/components/ui/Badge';
import { ResponsiveImage } from '@/components/ui/ResponsiveImage';
import { formatDate } from '@/lib/format';
import type { Certificate } from '@/types';

interface CertificateCardProps {
  certificate: Certificate;
  /** Current list query (?category=…) so the list keeps its filter behind the modal. */
  search?: string;
}

export function CertificateCard({ certificate, search = '' }: CertificateCardProps) {
  return (
    <TiltCard>
      <DetailLink
        to={`/certificates/${certificate.slug}${search}`}
        className="group flex h-full flex-col overflow-hidden rounded-card bg-surface shadow-card transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-card-hover"
      >
        <div className="aspect-[4/3] overflow-hidden border-b border-line bg-surface-2 p-3">
          <ResponsiveImage
            image={certificate.image}
            sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
            className="size-full rounded-md object-contain transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        </div>
        <div className="flex flex-1 flex-col p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.06em] text-muted">
            {certificate.issuer}
          </p>
          <h2 className="mt-1.5 line-clamp-2 font-bold leading-snug text-ink">
            {certificate.title}
          </h2>
          <div className="mt-auto flex items-center justify-between gap-3 pt-4">
            <Badge>{certificate.category}</Badge>
            {certificate.issueDate && (
              <span className="font-mono text-xs text-muted">
                {formatDate(certificate.issueDate)}
              </span>
            )}
          </div>
        </div>
      </DetailLink>
    </TiltCard>
  );
}
