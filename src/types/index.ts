import type { LucideIcon } from 'lucide-react';
import type { IconName } from '@/lib/icons';

// Content model — docs/02-architecture/data-model.md

export type ISODate = string; // "2026-07-29", or "2026-07" when the day is unknown

export interface LinkRef {
  label: string;
  href: string;
  kind: 'live' | 'github' | 'verify' | 'pdf' | 'linkedin' | 'email' | 'other';
}

export interface InternalLink {
  label: string;
  to: string;
}

export interface ImageRef {
  src: string;
  srcSet?: string;
  width: number;
  height: number;
  alt: string;
}

export type CaptionedImage = ImageRef & { caption: string };

export interface NavItem {
  label: string;
  to: string;
  icon: LucideIcon;
}

export interface SiteMeta {
  name: string;
  defaultTitle: string;
  description: string;
}

/* ---------- Profile ---------- */
export interface Profile {
  name: string;
  headline: string;
  roles: string[];
  objectiveShort: string;
  objectiveLong: string;
  location: string;
  email: string;
  showPhone: boolean;
  /** Masked only — the full number is never stored (Q3). */
  phoneMasked?: string;
  photo: ImageRef;
  avatar: ImageRef;
  availability: string;
  openTo: string[];
  teachingPhilosophy?: string;
  socials: LinkRef[];
  resumeUrl: string;
  motto?: string;
  languages: { name: string; level: string }[];
}

/* ---------- About ---------- */
export interface Education {
  id: string;
  degree: string;
  degreeFull: string;
  institution: string;
  location: string;
  start: number;
  end: number;
  score: { value: number; unit: '%' | 'CGPA' };
  status: 'Completed' | 'Pursuing';
  highlights?: string[];
}

export type SkillCategory = 'AI / ML' | 'Programming' | 'Web' | 'Database' | 'BI & Tools' | 'Cloud';

export interface SkillGroup {
  category: SkillCategory;
  icon: IconName;
  skills: string[];
}

export interface LearningItem {
  topic: string;
  note: string;
  evidence?: string;
  href?: string;
}

export interface CompetencyGroup {
  title: string;
  items: string[];
}

export interface CompareBlock {
  left: string;
  right: string;
  rows: [string, string][];
}

export interface JourneyItem {
  when: string;
  title: string;
  detail: string;
  href?: string;
  upcoming?: boolean;
}

/* ---------- Projects ---------- */
export interface Metric {
  value: string;
  label: string;
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  category: 'AI / ML' | 'Data Analytics' | 'Web';
  context: string;
  period?: string;
  appName?: string;
  cover?: ImageRef;
  summary: string;
  problem: string;
  solution: string;
  features: string[];
  pipeline?: string[];
  dataset?: string;
  techStack: { label: string; items: string[] }[];
  screenshots: CaptionedImage[];
  /** Hotspots on the cover image, in % of width/height. */
  cursorTour?: { x: number; y: number; label: string }[];
  beforeAfter?: { before: ImageRef; after: ImageRef; beforeLabel: string; afterLabel: string };
  metrics?: Metric[];
  results?: string[];
  futureScope?: string[];
  links: LinkRef[];
  relatedExperience?: string;
  confidentialNote?: string;
  featured: boolean;
}

/* ---------- Certificates ---------- */
export type CertCategory =
  | 'AI & ML'
  | 'Data Science'
  | 'Cloud'
  | 'Programming & Web'
  | 'Workshops'
  | 'Other';

export interface Certificate {
  slug: string;
  title: string;
  issuer: string;
  platform?: string;
  instructors?: string[];
  category: CertCategory;
  issueDate?: ISODate;
  eventDate?: ISODate;
  duration?: string;
  grade?: string;
  credentialId?: string;
  verifyUrl?: string;
  image: ImageRef;
  fileUrl: string;
  skills: string[];
  description: string;
  featured: boolean;
}

/* ---------- Achievements ---------- */
export interface Proof {
  image: ImageRef;
  fileUrl: string;
  credentialId?: string;
}

export interface Achievement {
  slug: string;
  title: string;
  organisation: string;
  date?: ISODate;
  role?: string;
  category: 'Competition' | 'Academic' | 'Leadership' | 'Speaking';
  icon: IconName;
  summary: string;
  story: string[];
  metric?: Metric;
  skills: string[];
  proof?: Proof;
  related?: InternalLink;
  cover?: ImageRef;
  photos?: CaptionedImage[];
}

/* ---------- Experience ---------- */
export interface Experience {
  slug: string;
  role: string;
  organisation: string;
  type: 'Internship' | 'Training' | 'Academic';
  location: string;
  start?: ISODate;
  end?: ISODate;
  summary: string;
  /** Short chips: org certifications, hours, grade… */
  facts?: string[];
  responsibilities: string[];
  skills: string[];
  learnings?: string[];
  testimonial?: string;
  compare?: CompareBlock;
  related?: InternalLink;
  proof?: Proof;
}

/* ---------- Home ---------- */
export interface Stat {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
}

export interface Ping {
  icon: IconName;
  text: string;
  href: string;
}
