import type { Ping, Stat } from '@/types';

// Source: docs/05-content/profile.md (stats strip + highlight pings)
export const stats: Stat[] = [
  { value: 95, suffix: '%', label: 'MCA score' },
  { value: 94.8, suffix: '%', decimals: 1, label: 'BCA score' },
  { value: 14, label: 'Certifications' },
  { value: 5, suffix: '+ months', label: 'AI/ML internship' },
];

export const pings: Ping[] = [
  { icon: 'GraduationCap', text: 'MCA completed · 95%', href: '/about' },
  {
    icon: 'Trophy',
    text: 'National GOER 2025 Finalist · Team Leader',
    href: '/achievements/goer-2025-national-finalist',
  },
  {
    icon: 'BriefcaseBusiness',
    text: 'AI/ML Intern @ Shanti Infosoft (CMMI L5)',
    href: '/experience/shanti-infosoft-ai-ml-intern',
  },
  {
    icon: 'BadgeCheck',
    text: 'Saylor · Fundamentals of ML · 96%',
    href: '/certificates/saylor-cs207-fundamentals-of-ml',
  },
  {
    icon: 'Satellite',
    text: 'ISRO IIRS workshop · Cyclone forecasting',
    href: '/certificates/isro-iirs-tropical-cyclone-workshop',
  },
  {
    icon: 'Brain',
    text: 'Kaggle · Intro to Deep Learning',
    href: '/certificates/kaggle-intro-to-deep-learning',
  },
];
