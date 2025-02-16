import { NavItem } from '../types/ui/nav';

// ### Liens pages ### //
export const navLinks: Record<string, NavItem> = {
  projects: {
    label: 'projects',
    href: '/projects',
  },
  dashboard: {
    label: 'dashboard',
    href: '/dashboard',
  },
  team: {
    label: 'team',
    href: '/team',
  },
  profile: {
    label: 'profile',
    href: '/profile',
  },
};

// ### Liens authentification ### //
export const authLinks: Record<string, NavItem> = {
  login: {
    label: 'login',
    href: '/login',
  },
  register: {
    label: 'register',
    href: '/register',
  },
};
