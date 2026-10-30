import { education } from './education';
import { experience } from './experience';
import { profile } from './profile';

// JSON-LD Person for the Home page (NFR-S4) — built from the same data the page shows
export function personJsonLd(siteUrl: string) {
  const current = experience.find((e) => e.type === 'Internship');
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    url: `${siteUrl}/`,
    image: `${siteUrl}/og-image.png`,
    jobTitle: profile.roles[0] ?? profile.headline,
    description: profile.objectiveShort,
    email: `mailto:${profile.email}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Indore',
      addressRegion: 'Madhya Pradesh',
      addressCountry: 'IN',
    },
    alumniOf: education.map((edu) => ({ '@type': 'CollegeOrUniversity', name: edu.institution })),
    ...(current && { worksFor: { '@type': 'Organization', name: current.organisation } }),
    knowsAbout: ['Machine Learning', 'Data Science', 'Python', 'Power BI', 'Deep Learning'],
    sameAs: profile.socials.filter((s) => s.kind !== 'email').map((s) => s.href),
  };
}
