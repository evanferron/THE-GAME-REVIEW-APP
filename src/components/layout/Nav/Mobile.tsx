import { useState } from 'react';

import useAuth from '@hooks/useAuth';
import { handleLogout } from '@utils/api/auth';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { authLinks, navLinks } from '../../../constants/routes';

const MobileNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isAuthenticated } = useAuth();

  return (
    <nav>
      {isAuthenticated ? (
        <>
          <span>Bienvenue, {user?.email} !</span>
          <button onClick={handleLogout}>Déconnexion</button>
        </>
      ) : (
        <button onClick={() => navigate(authLinks.login.href)}>Connexion</button>
      )}
    </nav>
  );
};

export default MobileNavbar;
