import { useEffect } from 'react';
import { Check, Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { ContactForm } from '@/components/contact/ContactForm';
import { Seo } from '@/components/layout/Seo';
import { Button } from '@/components/ui/Button';
import { CopyButton } from '@/components/ui/CopyButton';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { profile } from '@/data/profile';
import { getContactKey } from '@/lib/contact';

const linkedin = profile.socials.find((s) => s.kind === 'linkedin');
const github = profile.socials.find((s) => s.kind === 'github');

const rowClass = 'flex items-center gap-3 text-[15px]';
const iconClass =
  'grid size-10 shrink-0 place-items-center rounded-full bg-accent-soft text-accent';

// docs/03-features/07-contact.md
export function ContactPage() {
  const accessKey = getContactKey();

  useEffect(() => {
    if (!accessKey && import.meta.env.DEV) {
      console.warn(
        '[contact] VITE_WEB3FORMS_KEY is not set — the form is hidden. See .env.example.',
      );
    }
  }, [accessKey]);

  return (
    <>
      <Seo
        title="Contact"
        description="Get in touch with Aditi Singh — open to Assistant Professor roles, AI/ML and data science opportunities, guest lectures and research collaborations."
        path="/contact"
      />
      <section className="container-page pt-10 md:pt-16">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-x-16">
          <div className="lg:col-start-1 lg:row-start-1">
            <SectionHeading
              as="h1"
              index={8}
              eyebrow="Contact"
              title="Let's talk."
              description="Open to Assistant Professor roles, AI/ML & data opportunities and collaborations."
            />

            <ul className="mt-8 space-y-4" aria-label="Contact details">
              <li className={rowClass}>
                <span className={iconClass}>
                  <Mail aria-hidden className="size-[18px]" />
                </span>
                <a
                  href={`mailto:${profile.email}`}
                  className="font-semibold text-ink hover:text-accent-ink"
                >
                  {profile.email}
                </a>
                <CopyButton text={profile.email} label="Copy" />
              </li>
              {linkedin && (
                <li className={rowClass}>
                  <span className={iconClass}>
                    <Linkedin aria-hidden className="size-[18px]" />
                  </span>
                  <a
                    href={linkedin.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-ink hover:text-accent-ink"
                  >
                    {linkedin.href.replace(/^https:\/\/(www\.)?/, '')}
                  </a>
                </li>
              )}
              {github && (
                <li className={rowClass}>
                  <span className={iconClass}>
                    <Github aria-hidden className="size-[18px]" />
                  </span>
                  <a
                    href={github.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-ink hover:text-accent-ink"
                  >
                    {github.href.replace(/^https:\/\//, '')}
                  </a>
                </li>
              )}
              {/* Masked only, and off by default (Q3 / NFR-C1) — never a tel: link */}
              {profile.showPhone && profile.phoneMasked && (
                <li className={rowClass}>
                  <span className={iconClass}>
                    <Phone aria-hidden className="size-[18px]" />
                  </span>
                  <span className="font-medium text-ink">{profile.phoneMasked}</span>
                </li>
              )}
              <li className={rowClass}>
                <span className={iconClass}>
                  <MapPin aria-hidden className="size-[18px]" />
                </span>
                <span className="text-muted">{profile.location}</span>
              </li>
            </ul>
          </div>

          {/* Form comes right after the contact details on mobile; on desktop it spans the right column */}
          <div className="rounded-card bg-surface p-5 shadow-card md:p-8 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-start">
            {accessKey ? (
              <>
                <h2 className="text-xl font-bold tracking-[-0.01em] text-ink">Send a message</h2>
                <p className="mb-6 mt-1 text-sm text-muted">
                  I usually reply within a couple of days.
                </p>
                <ContactForm accessKey={accessKey} />
              </>
            ) : (
              <div className="flex flex-col items-start gap-4">
                <h2 className="text-xl font-bold tracking-[-0.01em] text-ink">Write to me</h2>
                <p className="text-muted">The quickest way to reach me is email.</p>
                <Button href={`mailto:${profile.email}`} icon={Mail} iconPosition="start">
                  Email {profile.name.split(' ')[0]}
                </Button>
              </div>
            )}
          </div>

          <div className="rounded-card bg-surface p-5 shadow-card md:p-6 lg:col-start-1 lg:row-start-2 lg:self-start">
            <h2 className="font-mono text-[12px] font-medium uppercase tracking-[0.08em] text-muted">
              Open to
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-ink/85">
              {profile.openTo.map((item) => (
                <li key={item} className="flex gap-2">
                  <Check
                    aria-hidden
                    strokeWidth={2.5}
                    className="mt-0.5 size-4 shrink-0 text-accent"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
