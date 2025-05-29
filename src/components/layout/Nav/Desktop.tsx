import { useState } from 'react';

import useAuth from '@hooks/useAuth';
import { useNavigate } from 'react-router-dom';

import { authLinks } from '../../../constants/routes';
import '../../../styles/_mixins.scss';
import styles from './Nav.module.scss';

const DesktopNavbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const url = window.location.pathname;
  const [activeButton, setActiveButton] = useState<string | null>(null); // Initialise l'état avec null, aucun bouton n'est actif par défaut

  const handleButtonClick = (path: string) => {
    setActiveButton(path); // Mettez à jour l'état avec le chemin du bouton cliqué
    navigate(path); // Navigue vers le chemin du bouton
  };

  return (
    <nav className={styles['navbar']}>
      <div className={styles['navbar-left']}>
        <button onClick={() => navigate('/')}>
          <img src="/assets/icons/logo.svg" alt="logo" />
          <h1>The Game Review</h1>
        </button>
      </div>

      <div className={styles['navbar-center']}>
        <button
          onClick={() => handleButtonClick('/')}
          className={url === '/' || activeButton == '/' ? styles['active'] : ''} // Le bouton "Accueil" est actif si le chemin est '/'
        >
          Home
        </button>
        <button
          onClick={() => handleButtonClick('/discovery')} // Chemin unique pour "Découvrir"
          className={url === '/discovery' || activeButton == '/discovery' ? styles['active'] : ''} // Le bouton "Découvrir" est actif si le chemin est '/discovery'
        >
          Discover
        </button>
      </div>

      {isAuthenticated ? (
        <div className={styles['navbar-right']}>
          <button onClick={() => navigate('/recherche')}>
            <img src="/assets/icons/search.svg" alt="search" />
          </button>
          <img
            src="/assets/pictures/profile-photo-test.svg"
            alt="profil"
            onClick={() => navigate('/profil')}
          />
        </div>
      ) : (
        <div className={styles['navbar-right']}>
          {Object.values(authLinks).map((link) => (
            <button key={link.label} onClick={() => navigate(link.href)}>
              {link.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default DesktopNavbar;
