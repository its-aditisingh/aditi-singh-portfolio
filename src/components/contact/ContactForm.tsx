import { useEffect, useId, useRef, useState, type FormEvent } from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { SuccessButton, type SubmitStatus } from '@/components/animations/SuccessButton';
import { profile } from '@/data/profile';
import {
  CONTACT_FIELDS,
  LIMITS,
  sendContactMessage,
  validateContact,
  validateField,
  type ContactErrors,
  type ContactField,
  type ContactValues,
} from '@/lib/contact';
import { FormField } from './FormField';

const EMPTY: ContactValues = { name: '', email: '', subject: '', message: '' };
const RESET_AFTER_MS = 2000;
const TIMEOUT_MS = 15000;

/** docs/03-features/07-contact.md — posts to Web3Forms; no backend of our own. */
export function ContactForm({ accessKey }: { accessKey: string }) {
  const baseId = useId();
  const fieldId = (field: ContactField) => `${baseId}-${field}`;

  const [values, setValues] = useState<ContactValues>(EMPTY);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [touched, setTouched] = useState<Partial<Record<ContactField, boolean>>>({});
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [sentOnce, setSentOnce] = useState(false);
  const honeypot = useRef<HTMLInputElement>(null);
  const resetTimer = useRef<number>();

  useEffect(() => () => window.clearTimeout(resetTimer.current), []);

  const update = (field: ContactField, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    if (touched[field]) setErrors((current) => ({ ...current, [field]: validateField(field, value) }));
    if (status === 'error') setStatus('idle');
  };

  const blur = (field: ContactField) => {
    setTouched((current) => ({ ...current, [field]: true }));
    setErrors((current) => ({ ...current, [field]: validateField(field, values[field]) }));
  };

  const succeed = () => {
    setStatus('success');
    setSentOnce(true);
    resetTimer.current = window.setTimeout(() => {
      setValues(EMPTY);
      setErrors({});
      setTouched({});
      setStatus('idle');
    }, RESET_AFTER_MS);
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === 'sending' || status === 'success') return;

    const found = validateContact(values);
    setErrors(found);
    setTouched({ name: true, email: true, subject: true, message: true });
    const firstInvalid = CONTACT_FIELDS.find((field) => found[field]);
    if (firstInvalid) {
      document.getElementById(fieldId(firstInvalid))?.focus();
      return;
    }

    // Honeypot filled → a bot. Pretend it worked and send nothing (FR-CT3).
    if (honeypot.current?.checked) {
      succeed();
      return;
    }

    setStatus('sending');
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), TIMEOUT_MS);
    try {
      await sendContactMessage(values, accessKey, controller.signal);
      succeed();
    } catch {
      setStatus('error');
    } finally {
      window.clearTimeout(timeout);
    }
  }

  const error = (field: ContactField) => (touched[field] ? errors[field] : undefined);

  return (
    <form noValidate onSubmit={handleSubmit} aria-label="Contact form" className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField
          id={fieldId('name')}
          name="name"
          label="Name"
          value={values.name}
          error={error('name')}
          onChange={(v) => update('name', v)}
          onBlur={() => blur('name')}
          required
          maxLength={LIMITS.name.max}
          autoComplete="name"
        />
        <FormField
          id={fieldId('email')}
          name="email"
          type="email"
          label="Email"
          value={values.email}
          error={error('email')}
          onChange={(v) => update('email', v)}
          onBlur={() => blur('email')}
          required
          autoComplete="email"
        />
      </div>
      <FormField
        id={fieldId('subject')}
        name="subject"
        label="Subject"
        value={values.subject}
        error={error('subject')}
        onChange={(v) => update('subject', v)}
        onBlur={() => blur('subject')}
        maxLength={LIMITS.subject.max}
      />
      <FormField
        id={fieldId('message')}
        name="message"
        label="Message"
        multiline
        value={values.message}
        error={error('message')}
        onChange={(v) => update('message', v)}
        onBlur={() => blur('message')}
        required
        maxLength={LIMITS.message.max}
        hint={`${values.message.trim().length} / ${LIMITS.message.max}`}
      />

      {/* Honeypot: invisible to people, tempting to bots */}
      <input
        ref={honeypot}
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        aria-hidden
        autoComplete="off"
        className="hidden"
      />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <SuccessButton status={status}>Send message</SuccessButton>

        <div role="status" aria-live="polite" className="text-sm">
          {status === 'error' && (
            <p className="flex items-start gap-2 font-medium text-danger">
              <AlertCircle aria-hidden className="mt-0.5 size-4 shrink-0" />
              <span>
                Couldn&apos;t send right now. Email me directly at{' '}
                <a href={`mailto:${profile.email}`} className="underline">
                  {profile.email}
                </a>
                .
              </span>
            </p>
          )}
          {status !== 'error' && sentOnce && (
            <p className="flex items-center gap-2 font-medium text-success">
              <CheckCircle2 aria-hidden className="size-4 shrink-0" />
              Thanks! Your message has been sent — I&apos;ll get back to you soon.
            </p>
          )}
        </div>
      </div>
    </form>
  );
}
