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
        'achievements/goer-2025-finalists',
        'Large group of student finalists in formal clothes, standing and kneeling in front of an IRM India backdrop',
        'Finalists at the IRM India venue — 5 July 2025',
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
    slug: 'anchor-speaker-mentor',
    title: 'Anchor, Speaker & Peer Mentor',
    organisation: 'AKS University, Satna',
    category: 'Speaking',
    icon: 'Mic',
    summary:
      'Anchored university-level events and technical programmes — including the TCS Internship Program organised by final-year MCA students — and delivered seminars on AI/ML.',
    story: [
      'Anchored university-level events and technical programs at AKS University, Satna — among them the TCS Internship Program held in September 2025 at the Central Hall (A-Block), organised by final-year MCA students of the Department of Computer Science in association with MPOnline Limited.',
      'Delivered technical seminars and project presentations on AI/ML topics.',
      'Assisted peers in understanding programming and machine learning concepts, and took part actively in academic and student engagement activities — anchoring stages since BCA.',
    ],
    skills: [
      'Public Speaking',
      'Event Anchoring',
      'Mentoring',
      'Communication',
      'Event Management',
    ],
    cover: image(
      'achievements/anchor-mca-podium',
      'Aditi Singh speaking into a microphone at the AKS University lectern',
    ),
    photos: [
      captioned(
        'achievements/anchor-mca-podium',
        'Aditi Singh speaking into a microphone at the AKS University lectern',
        'Addressing the audience at AKS University',
      ),
      captioned(
        'achievements/anchor-mca-tcs-stage',
        'Anchor at the lectern during the TCS Internship Program, with guests seated on stage',
        'Anchoring the TCS Internship Program — September 2025',
      ),
      captioned(
        'achievements/anchor-mca-tcs-hall',
        'Wide view of the Central Hall with guests on stage and a full student audience',
        'TCS Internship Program, Central Hall (A-Block)',
      ),
      captioned(
        'achievements/anchor-mca-lectern',
        'Aditi Singh reading from notes at a lectern',
        'Compering an MCA department event',
      ),
      captioned(
        'achievements/anchor-mca-group',
        'MCA students in uniform with two faculty members holding bouquets in the AKS University auditorium',
        'MCA students with faculty after a department event',
      ),
      captioned(
        'achievements/anchor-bca-stage',
        'Two anchors at a lectern on a decorated stage',
        'Anchoring a stage programme during BCA',
      ),
    ],
  },
];
