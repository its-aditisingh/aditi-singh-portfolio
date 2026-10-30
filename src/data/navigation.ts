import {
  BadgeCheck,
  BriefcaseBusiness,
  FlaskConical,
  FolderGit2,
  House,
  Send,
  Trophy,
  UserRound,
} from 'lucide-react';
import type { NavItem } from '@/types';

// Order is fixed by docs/02-architecture/routing-and-navigation.md
export const navItems: NavItem[] = [
  { label: 'Home', to: '/', icon: House },
  { label: 'About', to: '/about', icon: UserRound },
  { label: 'Research', to: '/research', icon: FlaskConical },
  { label: 'Projects', to: '/projects', icon: FolderGit2 },
  { label: 'Certificates', to: '/certificates', icon: BadgeCheck },
  { label: 'Achievements', to: '/achievements', icon: Trophy },
  { label: 'Experience', to: '/experience', icon: BriefcaseBusiness },
  { label: 'Contact', to: '/contact', icon: Send },
];
