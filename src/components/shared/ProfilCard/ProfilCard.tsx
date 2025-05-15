import React from 'react';

import styles from './ProfilCard.module.scss';
import { useNavigate } from 'react-router-dom';
import { FaEdit  } from 'react-icons/fa';
import { store } from '../../../services/store/store';
import { logout } from '../../../services/store/slices/auth';



interface ProfilCardProps {
  pseudo: string;
  email: string;
  nbrGame: number;
  nbrReview: number;
  profilPictureId: number;
  bannerPictureId?: number;
}

const ProfilCard: React.FC<ProfilCardProps> = ({
  pseudo,
  email,
  nbrGame,
  nbrReview,
  profilPictureId,
  bannerPictureId
}) => {
  
  const navigate = useNavigate();

  const handleEditProfile = () => {
    // Navigation vers la page de paramètres du compte avec les données nécessaires
    navigate('/account-settings', { 
      state: { 
        pseudo, 
        email,
      } 
    });
  };

  const disconnect = () => {
    store.dispatch(logout());
    navigate('/');
  };
  
  return (
  <div className={styles['profil-card']}>
    <div className={styles['profil-card__banner']}>
      <img 
        src={`/assets/pictures/banner_picture_${bannerPictureId}.jpg`}
        alt="profile banner" 
        className={styles['profil-card__banner-image']} 
      />
    </div>

    <div className={styles['profil-card__informations']}>
      <img 
        src={`/assets/pictures/profil_picture_${profilPictureId}.jpg`}
        alt="profil picture" 
        className={styles['profil-card__picture']} 
      />
      <div className={styles['profil-card__info']}>
        <div className={styles['profil-card__pseudo-container']}>
          <div className={styles['profil-card__pseudo']}>{pseudo}</div>
          <button 
            className={styles['profil-card__edit-button']}
            onClick={handleEditProfile}
            aria-label="Modifier le profil"
          >
            <FaEdit  
              className={styles['profil-card__edit-icon']} 
              onClick={handleEditProfile} 
              aria-label="Modifier le profil"
            />
          </button>

          <button
            type="submit"
            className={styles.updateButton}
            onClick={disconnect}
          >
            Disconnect
          </button>
        </div>
        
        <div className={styles['profil-card__data']}>
          <div className={styles['profil-card__adress_pseudo']}>@{pseudo}</div>

          <div className={styles['profil-card__game']}>
            ●
            <div className={styles['profil-card__nbr_game']}>{nbrGame}</div>
            games
          </div>

          <div className={styles['profil-card__review']}>
            ● 
            <div className={styles['profil-card__nbr_game']}>{nbrReview}</div>
            reviews
          </div>
        </div>
      </div>
    </div>
  </div>
  );

};

export default ProfilCard;
