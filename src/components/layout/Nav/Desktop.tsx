import useAuth from '@hooks/useAuth';
import { handleLogout } from '@utils/api/auth';
import { useNavigate } from 'react-router-dom';

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
