import {
  Award,
  BadgeCheck,
  BarChart3,
  BookOpen,
  Brain,
  BriefcaseBusiness,
  ChartLine,
  Cloud,
  Code2,
  Database,
  Dna,
  Globe,
  GraduationCap,
  HeartPulse,
  Lightbulb,
  Medal,
  Mic,
  Presentation,
  Satellite,
  Sparkles,
  Target,
  Trophy,
  Wand2,
  type LucideIcon,
} from 'lucide-react';

/**
 * Icons that content data may reference by name. Keeping data as plain strings keeps
 * `src/data` serialisable; the type below still makes a typo a compile error.
 */
export const icons = {
  Award,
  BadgeCheck,
  BarChart3,
  BookOpen,
  Brain,
  BriefcaseBusiness,
  ChartLine,
  Cloud,
  Code2,
  Database,
  Dna,
  Globe,
  GraduationCap,
  HeartPulse,
  Lightbulb,
  Medal,
  Mic,
  Presentation,
  Satellite,
  Sparkles,
  Target,
  Trophy,
  Wand2,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof icons;
