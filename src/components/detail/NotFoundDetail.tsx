import { ArrowLeft } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/Button';
import { SectionHeading } from '@/components/ui/SectionHeading';

/** FR-C5: unknown slug inside a collection. */
export function NotFoundDetail({ basePath, collection }: { basePath: string; collection: string }) {
  return (
    <section className="container-page py-24 md:py-32">
      <Helmet>
        <title>Not found · Aditi Singh</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <SectionHeading
        as="h1"
        eyebrow={collection}
        title="We couldn't find that one"
        description="It may have been renamed or removed."
      />
      <div className="mt-8">
        <Button to={basePath} icon={ArrowLeft} iconPosition="start">
          All {collection.toLowerCase()}
        </Button>
      </div>
    </section>
  );
}
