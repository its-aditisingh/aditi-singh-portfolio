import type { JourneyItem } from '@/types';

// Source: docs/05-content/journey.md (built only from dates in the resume and certificates)
export const journey: JourneyItem[] = [
  {
    when: '2021',
    title: 'Started BCA',
    detail: 'Makhanlal Chaturvedi National University, Bhopal',
    href: '/about#education',
  },
  {
    when: '2024',
    title: 'BCA completed — 94.8%',
    detail: 'Began MCA (AI/ML & Data Science) at AKS University, Satna',
    href: '/achievements/bca-94-8-percent',
  },
  {
    when: 'Mar 2025',
    title: 'AWS training — Grade A1',
    detail: '332-hour Advanced Program on Amazon Web Services (Anudip Foundation × Accenture)',
    href: '/experience/anudip-aws-training',
  },
  {
    when: 'Jul 2025',
    title: 'National GOER 2025 Finalist',
    detail: "Led AKS University's team to the national finals as Team Leader",
    href: '/achievements/goer-2025-national-finalist',
  },
  {
    when: 'Jan 2026',
    title: 'Joined Shanti Infosoft LLP',
    detail: 'AI/ML Intern (Industry Immersion) at a CMMI Level 5 company · completed 5 Udemy courses',
    href: '/experience/shanti-infosoft-ai-ml-intern',
  },
  {
    when: 'Jun 2026',
    title: 'Internship completed',
    detail: 'Python ML models, feature engineering, predictive analytics and reports',
    href: '/projects/shanti-infosoft-ml-internship-work',
  },
  {
    when: '2026',
    title: 'MCA completed — 95%',
    detail: 'Final-year project: Mind Scan Analyzer (EEG-based mental disorder prediction)',
    href: '/projects/mind-scan-analyzer',
  },
  {
    when: 'Jul 2026',
    title: 'Kaggle ML/DL track + ISRO workshop',
    detail:
      '5 Kaggle courses (ML, Intermediate ML, Deep Learning, Feature Engineering, Time Series) · IIRS-ISRO cyclone forecasting workshop',
    href: '/certificates?category=ai-ml',
  },
  {
    when: 'Oct 2026',
    title: 'Saylor CS207 — 96%',
    detail: 'Fundamentals of Machine Learning (IACET accredited)',
    href: '/certificates/saylor-cs207-fundamentals-of-ml',
  },
  {
    when: 'Next →',
    title: 'Assistant Professor / AI-ML roles',
    detail: 'Bringing industry-aligned AI/ML to the classroom',
    href: '/contact',
    upcoming: true,
  },
];
