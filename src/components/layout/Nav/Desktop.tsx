import useAuth from '@hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { authLinks } from '../../../constants/routes';

import styles from './Nav.module.scss';
import '../../../styles/_mixins.scss';

const DesktopNavbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <nav className={styles['navbar']}>
      {/* navbar-left */}
      <div onClick={() => navigate('/')} className={styles['navbar-left']}>
        <img src="../../../public/assets/icons/logo.svg" alt="logo" />
        <h1>The Game Review</h1>
      </div>

      {/* navbar-center */}
      <div className={styles['navbar-center']}>
        <button onClick={() => navigate('/')}>Accueil</button>
        <div>
          <button>
            <img src="../../../public/assets/icons/search.svg" alt="search" />
          </button>
        </div>
      </div>

      {/* navbar-right */}
      {isAuthenticated ? (
        <div className={styles['navbar-right']}>
          <button onClick={() => navigate('/recherche')}>
            <img src="../../../public/assets/icons/search.svg" alt="search" />
          </button>
          <img src='../../../public/assets/pictures/profile-photo-test.svg' alt="profil" onClick={() => navigate('/profil')}/>
        </div>
      ) : (
        <div>
          {authLinks.map(link => (
            <button
              key={link.path}
              onClick={() => navigate(link.path)}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default DesktopNavbar;
