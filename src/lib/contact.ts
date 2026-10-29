// Contact form rules and submission — docs/03-features/07-contact.md

export const CONTACT_FIELDS = ['name', 'email', 'subject', 'message'] as const;
export type ContactField = (typeof CONTACT_FIELDS)[number];
export type ContactValues = Record<ContactField, string>;
export type ContactErrors = Partial<Record<ContactField, string>>;

export const LIMITS = {
  name: { min: 2, max: 80 },
  subject: { max: 120 },
  message: { min: 10, max: 2000 },
} as const;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateField(field: ContactField, raw: string): string | undefined {
  const value = raw.trim();
  switch (field) {
    case 'name':
      if (value.length < LIMITS.name.min) return 'Please enter your name.';
      if (value.length > LIMITS.name.max)
        return `Please keep your name under ${LIMITS.name.max} characters.`;
      return undefined;
    case 'email':
      return EMAIL.test(value) ? undefined : 'Please enter a valid email address.';
    case 'subject':
      return value.length > LIMITS.subject.max
        ? `Please keep the subject under ${LIMITS.subject.max} characters.`
        : undefined;
    case 'message':
      if (value.length < LIMITS.message.min) return 'Message should be at least 10 characters.';
      if (value.length > LIMITS.message.max)
        return `Please keep your message under ${LIMITS.message.max} characters.`;
      return undefined;
  }
}

export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {};
  for (const field of CONTACT_FIELDS) {
    const error = validateField(field, values[field]);
    if (error) errors[field] = error;
  }
  return errors;
}

export const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

/** Public Web3Forms access key from `.env` — read at call time so tests can stub it. */
export function getContactKey(): string | undefined {
  return import.meta.env.VITE_WEB3FORMS_KEY?.trim() || undefined;
}

/** Sends the message through Web3Forms; throws with a readable reason on failure. */
export async function sendContactMessage(
  values: ContactValues,
  accessKey: string,
  signal?: AbortSignal,
): Promise<void> {
  const name = values.name.trim();
  const response = await fetch(WEB3FORMS_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      access_key: accessKey,
      name,
      email: values.email.trim(),
      subject: values.subject.trim() || `New message from ${name} via portfolio`,
      message: values.message.trim(),
      from_name: 'Portfolio contact form',
    }),
    signal,
  });

  const data = (await response.json().catch(() => null)) as {
    success?: boolean;
    message?: string;
  } | null;
  if (!response.ok || !data?.success) {
    throw new Error(data?.message ?? `Request failed (${response.status})`);
  }
}
