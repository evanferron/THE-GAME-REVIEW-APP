import { NavItem } from '../interfaces/ui/Nav';

// ### Liens pages ### //
export const navLinks: Record<string, NavItem> = {
  home: {
    label: 'home',
    href: '/',
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
