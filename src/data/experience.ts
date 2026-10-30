import { image } from '@/lib/images';
import type { Experience } from '@/types';
import { classroomVsIndustry } from './skills';

// Source: docs/05-content/experience.md — newest first
export const experience: Experience[] = [
  {
    slug: 'shanti-infosoft-ai-ml-intern',
    role: 'AI/ML Intern (Industry Immersion)',
    organisation: 'Shanti Infosoft LLP',
    type: 'Internship',
    location: 'Indore, Madhya Pradesh',
    start: '2026-01-25',
    end: '2026-06-30',
    summary:
      'Industry-immersion internship in AI/ML at a CMMI Level 5 software company, building Python-based machine learning and predictive analytics solutions.',
    facts: ['CMMI Maturity Level 5', 'ISO 9001:2015 certified'],
    responsibilities: [
      'Worked on machine learning model development and predictive analytics.',
      'Applied data preprocessing, feature engineering, and model evaluation techniques.',
      'Developed Python-based ML solutions using Scikit-Learn and Pandas.',
      'Created visualizations and analytical reports for decision-making.',
    ],
    skills: [
      'Python',
      'Scikit-Learn',
      'Pandas',
      'NumPy',
      'Feature Engineering',
      'Model Evaluation',
      'Data Visualization',
      'Predictive Analytics',
    ],
    testimonial:
      'Demonstrated excellent skills in AI/ML. Their contributions to given project were highly valuable to our team. We commend them for their dedication and professionalism throughout the internship.',
    compare: classroomVsIndustry,
    proof: {
      image: image(
        'certificates/shanti-infosoft-internship',
        'Certificate of Internship from Shanti Infosoft LLP awarded to Aditi Singh, 25/1/26 to 30/6/26, AI/ML',
      ),
      fileUrl: '/certificates/shanti-infosoft-internship.jpeg',
      credentialId: 'SHACT2025-073',
    },
  },
  {
    slug: 'anudip-aws-training',
    role: 'Advanced Program on Amazon Web Services',
    organisation: 'Anudip Foundation for Social Welfare',
    type: 'Training',
    location: 'Indore, Madhya Pradesh',
    // Owner (31 Oct 2026): February – May 2025
    start: '2025-02',
    end: '2025-05',
    summary:
      'Completed 332 hours of structured training on Amazon Web Services at the Anudip Foundation Skill and Career Development Center (supported by Accenture) and received a Certificate of Merit with Grade A1.',
    facts: ['332 hours', 'Grade A1', 'Supported by Accenture'],
    responsibilities: [],
    skills: ['AWS', 'Cloud Computing'],
    related: { label: 'View certificate', to: '/certificates/anudip-aws-advanced-program' },
    proof: {
      image: image(
        'certificates/anudip-aws-advanced-program',
        'Certificate of Merit from Anudip Foundation awarded to Aditi Singh for 332 hours of AWS training',
      ),
      fileUrl: '/certificates/anudip-aws-advanced-program.jpeg',
    },
  },
];
