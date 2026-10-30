import { image } from '@/lib/images';
import type { Profile } from '@/types';

// Source: docs/05-content/profile.md. The full phone number is intentionally not stored (Q3).
export const profile: Profile = {
  name: 'Aditi Singh',
  headline: 'MCA · AI/ML & Data Science',
  // Owner (31 Oct): purely focused on the Assistant Professor role — one role, no rotation
  roles: ['Aspiring Assistant Professor'],
  objectiveShort:
    'MCA postgraduate specialising in Artificial Intelligence, Machine Learning and Data Science, with hands-on industry experience from an AI/ML internship at a CMMI Level 5 company. I aim to teach Computer Science the way industry practises it — and keep building AI that matters.',
  objectiveLong:
    'MCA postgraduate specializing in Artificial Intelligence, Machine Learning, and Data Science with outstanding academic performance and hands-on industry experience through an AI/ML internship at Shanti Infosoft LLP (CMMI Level 5 Company). Proficient in Python, machine learning, predictive analytics, and AI-driven application development. Passionate about higher education, student mentoring, and outcome-based education, with a strong interest in research and practical learning. Seeking to contribute as an Assistant Professor by fostering academic excellence, innovation, and industry-aligned Computer Science education.',
  location: 'Indore, Madhya Pradesh, India',
  email: 'adytisingh@gmail.com',
  showPhone: false,
  phoneMasked: '+91 738 •••• 858',
  photo: image('profile/aditi-portrait', 'Portrait of Aditi Singh in a white shirt and glasses'),
  avatar: image('profile/aditi-avatar', 'Aditi Singh'),
  availability: 'Open to Assistant Professor roles in Computer Science',
  openTo: [
    'Assistant Professor roles — Computer Science / AI & ML / Data Science',
    'AI/ML and Data Science roles',
    'Guest lectures & workshops on Python, ML and Data Science',
    'Research collaborations in Healthcare Analytics & Educational Technology',
  ],
  teachingPhilosophy:
    "I believe Computer Science is learned best when theory meets a real problem. I pair every concept — from data structures to machine learning — with a small hands-on build, set clear learning outcomes for each class, and bring in what I've seen in industry so students leave ready to work, not just ready for exams.",
  socials: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/adyti', kind: 'linkedin' },
    { label: 'GitHub', href: 'https://github.com/its-aditisingh', kind: 'github' },
    { label: 'Email', href: 'mailto:adytisingh@gmail.com', kind: 'email' },
  ],
  resumeUrl: '/resume/Aditi-Singh-Resume.pdf',
  motto: 'Learning never exhausts the mind; it only expands the possibilities.',
  languages: [
    { name: 'English', level: 'Professional proficiency' },
    { name: 'Hindi', level: 'Native' },
  ],
};
