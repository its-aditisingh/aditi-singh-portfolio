import type { ChangeEvent } from 'react';
import { cn } from '@/lib/cn';

interface FormFieldProps {
  id: string;
  name: string;
  label: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  type?: 'text' | 'email';
  multiline?: boolean;
  required?: boolean;
  maxLength?: number;
  autoComplete?: string;
  /** Shown under the field when there is no error, e.g. a character counter. */
  hint?: string;
}

/** Labelled input/textarea with an inline error wired up via aria-describedby (FR-CT1). */
export function FormField({
  id,
  name,
  label,
  value,
  error,
  onChange,
  onBlur,
  type = 'text',
  multiline = false,
  required = false,
  maxLength,
  autoComplete,
  hint,
}: FormFieldProps) {
  const messageId = `${id}-message`;
  const shared = {
    id,
    name,
    value,
    required,
    maxLength,
    autoComplete,
    onBlur,
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      onChange(event.target.value),
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error || hint ? messageId : undefined,
    className: cn(
      'w-full rounded-[14px] border bg-surface px-4 text-[15px] text-ink placeholder:text-muted/70',
      'transition-[border-color,box-shadow] focus:outline-none focus-visible:outline-none',
      'focus:border-accent focus:shadow-[0_0_0_3px_rgb(var(--accent)/0.18)]',
      error ? 'border-danger' : 'border-line hover:border-accent/40',
      multiline ? 'min-h-[160px] resize-y py-3 leading-relaxed' : 'h-12',
    ),
  };

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-ink">
        {label}
        {!required && <span className="ml-1 font-normal text-muted">(optional)</span>}
      </label>
      {multiline ? <textarea {...shared} /> : <input type={type} {...shared} />}
      {(error || hint) && (
        <p
          id={messageId}
          className={cn('mt-1.5 text-[13px]', error ? 'font-medium text-danger' : 'text-muted')}
        >
          {error ?? hint}
        </p>
      )}
    </div>
  );
}
