import useAuth from '@hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { authLinks } from '../../../constants/routes';
import { useState } from 'react';

import styles from './Nav.module.scss';
import '../../../styles/_mixins.scss';

const DesktopNavbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [activeButton, setActiveButton] = useState<string | null>(null);  // Initialise l'état avec null, aucun bouton n'est actif par défaut

  const handleButtonClick = (path: string) => {
    setActiveButton(path);  // Mettez à jour l'état avec le chemin du bouton cliqué
    navigate(path);  // Navigue vers le chemin du bouton
  };

  return (
    <nav className={styles['navbar']}>
      {/* navbar-left */}
      <div className={styles['navbar-left']}>
        <button onClick={() => navigate('/')}>
          <img src="../../../public/assets/icons/logo.svg" alt="logo" />
          <h1>The Game Review</h1>
        </button>
      </div>

      {/* navbar-center */}
      <div className={styles['navbar-center']}>
        <button 
          onClick={() => handleButtonClick('/')} 
          className={activeButton === '/' ? styles['active'] : ''}  // Le bouton "Accueil" est actif si le chemin est '/'
        >
          Accueil
        </button>
        <button 
          onClick={() => handleButtonClick('/discovery')}  // Chemin unique pour "Découvrir"
          className={activeButton === '/discovery' ? styles['active'] : ''}  // Le bouton "Découvrir" est actif si le chemin est '/discovery'
        >
          Découvrir
        </button>
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
