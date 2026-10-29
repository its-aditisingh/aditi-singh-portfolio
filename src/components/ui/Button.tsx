import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { Link, type LinkProps } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'md' | 'sm';

interface CommonProps {
  variant?: Variant;
  size?: Size;
  icon?: LucideIcon;
  /** `end` icons slide right on hover (arrows); `start` icons stay put (download, mail). */
  iconPosition?: 'start' | 'end';
  className?: string;
  children: ReactNode;
}

type AsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & { to?: never; href?: never };
type AsRouterLink = CommonProps & Omit<LinkProps, keyof CommonProps> & { href?: never };
type AsAnchor = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & { href: string; to?: never };

export type ButtonProps = AsButton | AsRouterLink | AsAnchor;

const variants: Record<Variant, string> = {
  primary: 'bg-accent-btn text-on-accent shadow-sm hover:bg-accent-ink',
  secondary: 'border border-line bg-surface text-ink hover:border-accent/40 hover:bg-surface-2',
  ghost: 'text-accent-ink underline-offset-4 hover:underline',
};

const sizes: Record<Size, string> = {
  md: 'h-12 px-6 text-[15px]',
  sm: 'h-10 px-4 text-sm',
};

function buttonClasses(variant: Variant = 'primary', size: Size = 'md', className?: string) {
  return cn(
    'group inline-flex select-none items-center justify-center gap-2 rounded-full font-semibold',
    'transition-[background-color,border-color,color,box-shadow] duration-200',
    'disabled:pointer-events-none disabled:opacity-50',
    variant === 'ghost' ? 'h-auto px-0' : sizes[size],
    variants[variant],
    className,
  );
}

function splitProps<T extends CommonProps>(props: T) {
  const { variant, size, icon, iconPosition, className, children, ...rest } = props;
  return { common: { variant, size, icon, iconPosition, className, children }, rest };
}

export function Button(props: ButtonProps) {
  const { common, rest } = splitProps(props);
  const { variant, size, icon: Icon, iconPosition = 'end', className, children } = common;
  const classes = buttonClasses(variant, size, className);

  const content = (
    <>
      {Icon && iconPosition === 'start' && <Icon aria-hidden className="size-[18px]" />}
      <span>{children}</span>
      {Icon && iconPosition === 'end' && (
        <Icon
          aria-hidden
          className="size-[18px] transition-transform duration-200 ease-out group-hover:translate-x-1"
        />
      )}
    </>
  );

  if ('to' in rest && rest.to !== undefined) {
    return (
      <Link {...(rest as Omit<LinkProps, 'className'>)} className={classes}>
        {content}
      </Link>
    );
  }

  if ('href' in rest && rest.href !== undefined) {
    return (
      <a {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)} className={classes}>
        {content}
      </a>
    );
  }

  const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button type="button" {...buttonProps} className={classes}>
      {content}
    </button>
  );
}
