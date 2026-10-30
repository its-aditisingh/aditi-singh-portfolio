import { achievements } from './achievements';
import { certificates } from './certificates';
import { education } from './education';
import { experience } from './experience';
import { pings, stats } from './highlights';
import { journey } from './journey';
import { profile } from './profile';
import { projects } from './projects';
import { paperNotes, workingPapers } from './research';
import { currentlyLearning, skillGroups } from './skills';
import type { CertCategory, ImageRef } from '@/types';

// Data rules: docs/02-architecture/data-model.md · test plan: docs/07-testing/test-plan.md

const publicFiles = new Set(
  Object.keys(import.meta.glob('/public/**/*')).map((path) => path.replace(/^\/public/, '')),
);
const sourceFiles = import.meta.glob<string>('/src/**/*.{ts,tsx,css}', {
  query: '?raw',
  import: 'default',
  eager: true,
});

const collections = {
  projects: projects.map((p) => p.slug),
  certificates: certificates.map((c) => c.slug),
  achievements: achievements.map((a) => a.slug),
  experience: experience.map((e) => e.slug),
};

const KEBAB = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const ISO = /^\d{4}(-\d{2}(-\d{2})?)?$/;
const PAGES = [
  '/',
  '/about',
  '/research',
  '/projects',
  '/certificates',
  '/achievements',
  '/experience',
  '/contact',
];

function isKnownRoute(href: string) {
  const path = href.split(/[?#]/)[0] ?? '';
  if (PAGES.includes(path)) return true;
  const [, collection, slug, extra] = path.split('/');
  if (!collection || !slug || extra !== undefined) return false;
  const slugs = collections[collection as keyof typeof collections];
  return Boolean(slugs?.includes(slug));
}

function isValidDate(value: string) {
  if (!ISO.test(value)) return false;
  const [y, m = '01', d = '01'] = value.split('-');
  const date = new Date(`${y}-${m}-${d}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().startsWith(`${y}-${m}-${d}`);
}

/** Newest first; undated entries last. */
function isSortedNewestFirst(dates: (string | undefined)[]) {
  const key = (d?: string) => d ?? '0000';
  return dates.every((d, i) => i === 0 || key(dates[i - 1]) >= key(d));
}

function allImages(): ImageRef[] {
  return [
    profile.photo,
    profile.avatar,
    ...certificates.map((c) => c.image),
    ...projects.flatMap((p) => [
      ...(p.cover ? [p.cover] : []),
      ...p.screenshots,
      ...(p.beforeAfter ? [p.beforeAfter.before, p.beforeAfter.after] : []),
    ]),
    ...achievements.flatMap((a) => [
      ...(a.proof ? [a.proof.image] : []),
      ...(a.cover ? [a.cover] : []),
      ...(a.photos ?? []),
    ]),
    ...experience.flatMap((e) => (e.proof ? [e.proof.image] : [])),
  ];
}

describe('slugs', () => {
  it.each(Object.entries(collections))('%s: unique kebab-case slugs', (_name, slugs) => {
    expect(new Set(slugs).size).toBe(slugs.length);
    slugs.forEach((slug) => expect(slug).toMatch(KEBAB));
  });
});

describe('counts', () => {
  it('has the expected number of items', () => {
    expect(certificates).toHaveLength(14);
    expect(projects.length).toBeGreaterThanOrEqual(5);
    // Grades live only in About › Education (owner request, 31 Oct)
    expect(achievements.length).toBeGreaterThanOrEqual(2);
    expect(workingPapers.length).toBeGreaterThanOrEqual(1);
    expect(experience.length).toBeGreaterThanOrEqual(2);
    expect(education).toHaveLength(2);
  });

  it('matches the certificate category counts in the content spec', () => {
    const expected: Record<CertCategory, number> = {
      'AI & ML': 6,
      'Data Science': 1,
      Cloud: 1,
      'Programming & Web': 3,
      Workshops: 1,
      Other: 2,
    };
    const actual = certificates.reduce<Record<string, number>>((acc, c) => {
      acc[c.category] = (acc[c.category] ?? 0) + 1;
      return acc;
    }, {});
    expect(actual).toEqual(expected);
  });

  it('keeps the Home "Certifications" stat in sync', () => {
    expect(stats.find((s) => s.label === 'Certifications')?.value).toBe(certificates.length);
  });

  it('has 5 featured certificates for the shuffle deck', () => {
    expect(certificates.filter((c) => c.featured)).toHaveLength(5);
  });

  it('has 4 GOER event photos', () => {
    const goer = achievements.find((a) => a.slug === 'goer-2025-national-finalist');
    expect(goer?.photos).toHaveLength(4);
  });
});

describe('required fields', () => {
  it('every project names its dataset and source (owner request)', () => {
    for (const p of projects) {
      expect(p.dataset.name.length, p.slug).toBeGreaterThan(5);
      expect(p.dataset.description.length, p.slug).toBeGreaterThan(20);
      expect(p.dataset.source.length, p.slug).toBeGreaterThan(10);
      p.dataset.links.forEach((link) => expect(link.href).toMatch(/^https:\/\//));
    }
  });

  it('no achievement repeats a grade or score', () => {
    for (const a of achievements) expect(a.metric?.value ?? '', a.slug).not.toMatch(/%|\bA1\b/);
  });

  it('reading notes are complete when present', () => {
    for (const note of paperNotes) {
      expect(note.title && note.authors && note.venue && note.summary).toBeTruthy();
    }
  });

  it('every image has alt text and dimensions', () => {
    for (const img of allImages()) {
      expect(img.alt.trim().length, img.src).toBeGreaterThan(3);
      expect(img.width).toBeGreaterThan(0);
      expect(img.height).toBeGreaterThan(0);
    }
  });

  it('collections have titles and summaries', () => {
    projects.forEach((p) => expect(p.title && p.summary && p.techStack.length).toBeTruthy());
    certificates.forEach((c) => expect(c.title && c.issuer && c.description).toBeTruthy());
    achievements.forEach((a) => expect(a.title && a.summary && a.story.length).toBeTruthy());
    experience.forEach((e) => expect(e.role && e.organisation && e.summary).toBeTruthy());
    skillGroups.forEach((g) => expect(g.skills.length).toBeGreaterThan(0));
  });

  it('project live/GitHub links use https', () => {
    projects.flatMap((p) => p.links).forEach((link) => expect(link.href).toMatch(/^https:\/\//));
  });
});

describe('files', () => {
  it('every downloadable file exists in public/', () => {
    const urls = [
      profile.resumeUrl,
      ...workingPapers.map((paper) => paper.fileUrl),
      ...certificates.map((c) => c.fileUrl),
      ...achievements.flatMap((a) => (a.proof ? [a.proof.fileUrl] : [])),
      ...experience.flatMap((e) => (e.proof ? [e.proof.fileUrl] : [])),
    ];
    for (const url of urls) expect(publicFiles.has(url), url).toBe(true);
  });

  it('ships the share image', () => {
    expect(publicFiles.has('/og-image.png')).toBe(true);
  });
});

describe('content hygiene', () => {
  it('contains no placeholders', () => {
    const all = JSON.stringify({
      profile,
      education,
      skillGroups,
      currentlyLearning,
      projects,
      certificates,
      achievements,
      experience,
      journey,
      stats,
      pings,
    });
    expect(all).not.toMatch(/\bTBD\b|\bCONFIRM\b|lorem ipsum|\bTODO\b/i);
  });

  it('uses valid ISO dates', () => {
    const dates = [
      ...certificates.flatMap((c) => [c.issueDate, c.eventDate]),
      ...achievements.map((a) => a.date),
      ...experience.flatMap((e) => [e.start, e.end]),
    ].filter((d): d is string => d !== undefined);
    dates.forEach((d) => expect(isValidDate(d), d).toBe(true));
  });

  it('lists certificates and experience newest first', () => {
    expect(isSortedNewestFirst(certificates.map((c) => c.issueDate))).toBe(true);
    expect(isSortedNewestFirst(experience.map((e) => e.end ?? e.start))).toBe(true);
  });
});

describe('cross-links', () => {
  it('every internal link points to an existing page or item', () => {
    const hrefs = [
      ...pings.map((p) => p.href),
      ...journey.flatMap((j) => (j.href ? [j.href] : [])),
      ...currentlyLearning.flatMap((l) => (l.href ? [l.href] : [])),
      ...achievements.flatMap((a) => (a.related ? [a.related.to] : [])),
      ...experience.flatMap((e) => (e.related ? [e.related.to] : [])),
      ...projects.flatMap((p) =>
        p.relatedExperience ? [`/experience/${p.relatedExperience}`] : [],
      ),
      ...workingPapers.flatMap((w) => (w.relatedProject ? [`/projects/${w.relatedProject}`] : [])),
    ];
    for (const href of hrefs) expect(isKnownRoute(href), href).toBe(true);
  });
});

describe('privacy (NFR-C1)', () => {
  // The owner's number, split so it never appears as one string in this public repo.
  // Matches it with any spaces/dashes between the digits.
  const PHONE = new RegExp(['738', '918', '3858'].join('').split('').join('[\\s-]?'));

  it('never contains the phone number in source', () => {
    // Guard against a vacuous pass if the glob stops matching
    expect(Object.keys(sourceFiles).length).toBeGreaterThan(30);
    for (const [path, source] of Object.entries(sourceFiles)) {
      expect(source, path).not.toMatch(PHONE);
      if (path.endsWith('.test.ts') || path.endsWith('.test.tsx')) continue;
      expect(source, path).not.toMatch(/\b\d{10}\b/);
    }
  });

  it('keeps the phone hidden by default', () => {
    expect(profile.showPhone).toBe(false);
  });
});

describe('sitemap source (vite.config.ts readSlugs)', () => {
  // The build reads slugs with this exact pattern; if formatting changes, the sitemap would
  // silently miss pages — this keeps the two in step.
  const SLUG_LINE = /^\s{4}slug: '([a-z0-9-]+)',$/gm;
  it.each(Object.entries(collections))(
    '%s: every slug is found by the sitemap reader',
    (name, slugs) => {
      const source = sourceFiles[`/src/data/${name}.ts`] ?? '';
      expect([...source.matchAll(SLUG_LINE)].map((m) => m[1])).toEqual(slugs);
    },
  );
});
