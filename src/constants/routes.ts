import { NavItem } from '../interfaces/ui/Nav';

// ### Liens pages ### //
export const navLinks: Record<string, NavItem> = {
  home: { label: 'home', href: '/' },
  discover: { label: 'discovery', href: '/discover' },
  profile: { label: 'profile', href: '/profile' },
};

// ### Liens authentification ### //
export const authLinks: Record<string, NavItem> = {
  login: { label: 'Login', href: '/login' },
  register: { label: 'Register', href: '/register' },
};
