import { ArrowLeft } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/Button';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>Page not found · Aditi Singh</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <section className="container-page py-24 md:py-36">
        <SectionHeading
          as="h1"
          eyebrow="404"
          title="Page not found"
          description="The page you're looking for doesn't exist or has moved."
        />
        <div className="mt-8">
          <Button to="/" icon={ArrowLeft} iconPosition="start">
            Back to home
          </Button>
        </div>
      </section>
    </>
  );
}
