import { Link } from 'react-router-dom';
import { profile } from '@/data/profile';

// No aria-label: the link's name comes from the visible text, so voice-control users can say
// what they see (WCAG 2.5.3 "label in name"). Below xl the name is screen-reader only.
export function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link to="/" onClick={onClick} className="flex shrink-0 items-center gap-2.5 rounded-xl">
      <span
        aria-hidden
        className="grid size-9 place-items-center rounded-xl bg-accent-btn text-sm font-extrabold tracking-tight text-on-accent"
      >
        AS
      </span>
      <span className="sr-only text-[15px] font-bold tracking-tight text-ink xl:not-sr-only">
        {profile.name}
      </span>
      <span className="sr-only"> — home</span>
    </Link>
  );
}
