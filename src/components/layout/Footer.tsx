import { profile } from '@/data/profile';
import { SocialLinks } from './SocialLinks';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-line bg-surface/60">
      <div className="container-page flex flex-col gap-8 py-10 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-lg font-bold tracking-tight">{profile.name}</p>
          {profile.motto && (
            <p className="mt-1 max-w-md text-sm text-muted">“{profile.motto}”</p>
          )}
        </div>
        <SocialLinks />
      </div>

      <div className="container-page border-t border-line py-5 text-xs text-muted">
        © {year} {profile.name} · Built with React &amp; TypeScript
      </div>
    </footer>
  );
}
