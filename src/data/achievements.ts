import { captioned, image } from '@/lib/images';
import type { Achievement } from '@/types';

// Source: docs/05-content/achievements.md — photo captions describe the scene, not individuals
export const achievements: Achievement[] = [
  {
    slug: 'goer-2025-national-finalist',
    title: 'National GOER 2025 — Finalist & Team Leader',
    organisation: 'IRM India Affiliate (Institute of Risk Management)',
    date: '2025-07-05',
    role: 'Team Leader',
    category: 'Competition',
    icon: 'Trophy',
    summary:
      "Led AKS University's team to the national finals of IRM India's Game of Enterprise Risk 2025 (PG category).",
    story: [
      'GOER — Game of Enterprise Risk® — is a national enterprise-risk simulation competition run by the IRM India Affiliate, where university teams navigate complex business risk scenarios. 2025 was its third edition.',
      'As Team Leader, Aditi represented AKS University, Satna in the PG category and took the team to the national finals.',
      'The certificate commends the team\'s "enthusiasm, resilience, and teamwork in navigating complex risk scenarios."',
    ],
    metric: { value: 'Finalist', label: 'National level · PG category' },
    skills: ['Leadership', 'Teamwork', 'Risk Analysis', 'Decision-Making'],
    proof: {
      image: image(
        'certificates/goer-2025',
        'Certificate of Participation: Aditi Singh, AKS University, Finalist in National GOER 2025 PG Category',
      ),
      fileUrl: '/certificates/goer-2025.pdf',
    },
    cover: image(
      'achievements/goer-2025-stage',
      'Finalist teams on stage in front of the National GOER Third Edition banner',
    ),
    photos: [
      captioned(
        'achievements/goer-2025-stage',
        'Group of students and faculty standing on stage in front of the National GOER Third Edition banner',
        'Finalist teams on stage at National GOER — Third Edition',
      ),
      captioned(
        'achievements/goer-2025-strategy-1',
        'Two team members discussing strategy over a laptop',
        'Working through risk scenarios during the finals',
      ),
      captioned(
        'achievements/goer-2025-strategy-2',
        'Two team members looking at a laptop during the competition',
        'Team discussion during the competition round',
      ),
      captioned(
        'achievements/goer-2025-venue',
        'Group of participants in formal clothes outside a large building',
        'Participants outside the venue',
      ),
    ],
  },
  {
    slug: 'mca-95-percent',
    title: 'MCA with 95%',
    organisation: 'AKS University, Satna',
    date: '2026',
    category: 'Academic',
    icon: 'GraduationCap',
    summary: 'Completed MCA (AI/ML & Data Science) with 95%.',
    story: [
      'Consistent academic performance across the MCA programme (2024–2026), alongside the Mind Scan Analyzer final-year project and an industry internship.',
    ],
    metric: { value: '95%', label: 'MCA aggregate' },
    skills: ['Artificial Intelligence', 'Machine Learning', 'Data Science'],
    related: { label: 'See education', to: '/about#education' },
  },
  {
    slug: 'bca-94-8-percent',
    title: 'BCA with 94.8%',
    organisation: 'Makhanlal Chaturvedi National University, Bhopal',
    date: '2024',
    category: 'Academic',
    icon: 'Award',
    summary: 'Completed BCA with 94.8%.',
    story: ['Completed the Bachelor of Computer Applications programme (2021–2024) with 94.8%.'],
    metric: { value: '94.8%', label: 'BCA aggregate' },
    skills: ['Programming', 'Computer Science Fundamentals'],
    related: { label: 'See education', to: '/about#education' },
  },
  {
    slug: 'saylor-ml-96-percent',
    title: '96% in Saylor CS207 — Fundamentals of Machine Learning',
    organisation: 'Saylor University (IACET Accredited Provider)',
    date: '2026-10-22',
    category: 'Academic',
    icon: 'Medal',
    summary: 'Scored 96% in an IACET-accredited, 19-hour machine learning course.',
    story: [
      'Completed CS207: Fundamentals of Machine Learning at Saylor University with a 96.00% grade, earning 1.9 Continuing Education Units.',
    ],
    metric: { value: '96.00%', label: 'Final grade' },
    skills: ['Machine Learning', 'Model Evaluation'],
    related: { label: 'View certificate', to: '/certificates/saylor-cs207-fundamentals-of-ml' },
  },
  {
    slug: 'aws-program-grade-a1',
    title: 'Grade A1 — 332-hour AWS Program',
    organisation: 'Anudip Foundation, supported by Accenture',
    date: '2025-03',
    category: 'Academic',
    icon: 'Cloud',
    summary:
      'Awarded a Certificate of Merit with Grade A1 for completing 332 hours of AWS training.',
    story: [
      'Completed the Advanced Program on Amazon Web Services at the Anudip Foundation Skill and Career Development Center, Indore — 332 hours of training — and received a Certificate of Merit with Grade A1.',
    ],
    metric: { value: '332 hrs · A1', label: 'Training hours · grade' },
    skills: ['AWS', 'Cloud Computing'],
    related: { label: 'View certificate', to: '/certificates/anudip-aws-advanced-program' },
  },
  {
    slug: 'anchor-speaker-mentor',
    title: 'Anchor, Speaker & Peer Mentor',
    organisation: 'AKS University, Satna',
    category: 'Speaking',
    icon: 'Mic',
    summary:
      'Anchored university-level events and technical programmes, and delivered seminars on AI/ML.',
    story: [
      'Anchored university-level events and technical programs.',
      'Delivered technical seminars and project presentations on AI/ML topics.',
      'Assisted peers in understanding programming and machine learning concepts, and took part actively in academic and student engagement activities.',
    ],
    skills: ['Public Speaking', 'Mentoring', 'Communication', 'Event Management'],
  },
];
