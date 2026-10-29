import { Github, Linkedin, Mail, type LucideIcon } from 'lucide-react';
import { profile } from '@/data/profile';
import { cn } from '@/lib/cn';
import type { LinkRef } from '@/types';

const socialIcons: Partial<Record<LinkRef['kind'], LucideIcon>> = {
  linkedin: Linkedin,
  github: Github,
  email: Mail,
};

export function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={cn('flex gap-2', className)} aria-label="Social links">
      {profile.socials.map((social) => {
        const Icon = socialIcons[social.kind];
        if (!Icon) return null;
        const external = social.kind !== 'email';
        return (
          <li key={social.href}>
            <a
              href={social.href}
              aria-label={social.label}
              {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
              className="grid size-11 place-items-center rounded-full border border-line bg-surface text-ink transition-colors hover:border-accent/40 hover:text-accent-ink"
            >
              <Icon aria-hidden className="size-[18px]" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
