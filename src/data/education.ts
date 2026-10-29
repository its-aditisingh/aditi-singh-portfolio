import type { Education } from '@/types';

// Source: docs/05-content/education-and-skills.md
export const education: Education[] = [
  {
    id: 'mca',
    degree: 'MCA',
    degreeFull: 'Master of Computer Applications (AI/ML & Data Science focus)',
    institution: 'AKS University',
    location: 'Satna, Madhya Pradesh',
    start: 2024,
    end: 2026,
    score: { value: 95, unit: '%' },
    status: 'Completed',
    highlights: [
      'Final-year project: Mind Scan Analyzer (EEG-based mental disorder prediction)',
      'National GOER 2025 Finalist — Team Leader for AKS University',
    ],
  },
  {
    id: 'bca',
    degree: 'BCA',
    degreeFull: 'Bachelor of Computer Applications',
    institution: 'Makhanlal Chaturvedi National University',
    location: 'Bhopal, Madhya Pradesh',
    start: 2021,
    end: 2024,
    score: { value: 94.8, unit: '%' },
    status: 'Completed',
  },
];
