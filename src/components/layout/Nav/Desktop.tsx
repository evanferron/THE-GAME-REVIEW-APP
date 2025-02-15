import useAuth from '@hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { handleLogout } from 'utils/auth';

import { authLinks } from '../../../constants/routes';

const DesktopNavbar = () => {
  const navigate = useNavigate();

  const { user, isAuthenticated } = useAuth();

  return (
    <nav>
      {isAuthenticated ? (
        <>
          <span>Bienvenue, {user?.username} !</span>
          <button onClick={handleLogout}>Déconnexion</button>
        </>
      ) : (
        <button onClick={() => navigate(authLinks.login.href)}>Connexion</button>
      )}
    </nav>
  );
};

export default DesktopNavbar;
