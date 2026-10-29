import type { ReactNode } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, FileText, ShieldCheck } from 'lucide-react';
import { NumberRoll } from '@/components/animations/NumberRoll';
import { Seo } from '@/components/layout/Seo';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Chip } from '@/components/ui/Chip';
import { CopyButton } from '@/components/ui/CopyButton';
import { ZoomableImage } from '@/components/ui/ZoomableImage';
import { certificates } from '@/data/certificates';
import { neighbours } from '@/lib/collections';
import { ease } from '@/lib/motion';
import { formatDate } from '@/lib/format';
import { DetailShell } from './DetailShell';
import { DetailTitle } from './DetailTitle';
import { NotFoundDetail } from './NotFoundDetail';

// docs/03-features/04-certificates.md — rows without data are omitted
export function CertificateDetail() {
  const { slug = '' } = useParams();
  const cert = certificates.find((c) => c.slug === slug);
  if (!cert) return <NotFoundDetail basePath="/certificates" collection="Certificates" />;

  const { prev, next } = neighbours(certificates, slug);
  const isPdf = cert.fileUrl.endsWith('.pdf');

  return (
    <DetailShell
      basePath="/certificates"
      collection="Certificates"
      prev={prev && { slug: prev.slug, title: prev.title }}
      next={next && { slug: next.slug, title: next.title }}
    >
      <Seo
        title={cert.title}
        description={`${cert.title} — ${cert.issuer}. ${cert.description}`}
        path={`/certificates/${cert.slug}`}
        image={cert.image}
      />

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        {/* Certificate flips in on open (animation-spec micro-interactions); fade only under reduced motion */}
        <motion.div
          key={cert.slug}
          initial={{ rotateY: 70, opacity: 0 }}
          animate={{ rotateY: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: ease.out }}
          style={{ transformPerspective: 1200 }}
        >
          <ZoomableImage
            image={cert.image}
            sizes="(min-width: 1024px) 520px, 100vw"
            imageClassName="bg-surface"
            caption={cert.title}
          />
        </motion.div>

        <div>
          <Badge>{cert.category}</Badge>
          <DetailTitle className="mt-3 text-[24px] md:text-[32px]">{cert.title}</DetailTitle>
          <p className="mt-2 font-semibold text-ink/85">{cert.issuer}</p>
          {cert.platform && <p className="text-sm text-muted">{cert.platform}</p>}

          <dl className="mt-6 divide-y divide-line border-y border-line">
            {cert.issueDate && <MetaRow label="Issued">{formatDate(cert.issueDate)}</MetaRow>}
            {cert.eventDate && <MetaRow label="Workshop on">{formatDate(cert.eventDate)}</MetaRow>}
            {cert.duration && (
              <MetaRow label="Duration">
                <NumberRoll value={cert.duration} />
              </MetaRow>
            )}
            {cert.grade && (
              <MetaRow label="Grade">
                <NumberRoll value={cert.grade} />
              </MetaRow>
            )}
            {cert.instructors && (
              <MetaRow label={cert.instructors.length > 1 ? 'Instructors' : 'Instructor'}>
                {cert.instructors.join(', ')}
              </MetaRow>
            )}
            {cert.credentialId && (
              <MetaRow label="Credential ID">
                <span className="flex flex-wrap items-center justify-end gap-2">
                  <code className="break-all font-mono text-[13px]">{cert.credentialId}</code>
                  <CopyButton text={cert.credentialId} />
                </span>
              </MetaRow>
            )}
          </dl>

          <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Skills covered">
            {cert.skills.map((skill) => (
              <li key={skill}>
                <Chip>{skill}</Chip>
              </li>
            ))}
          </ul>

          <p className="mt-6 text-ink/80">{cert.description}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            {cert.verifyUrl && (
              <Button
                href={cert.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                icon={ShieldCheck}
                iconPosition="start"
              >
                Verify
              </Button>
            )}
            <Button
              href={cert.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              icon={isPdf ? FileText : ArrowUpRight}
              iconPosition={isPdf ? 'start' : 'end'}
            >
              {isPdf ? 'View PDF' : 'View original'}
            </Button>
          </div>
        </div>
      </div>
    </DetailShell>
  );
}

function MetaRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 py-3 text-sm">
      <dt className="shrink-0 text-muted">{label}</dt>
      <dd className="text-right font-medium text-ink">{children}</dd>
    </div>
  );
}
