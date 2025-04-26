import React from 'react';

import styles from './ProfilCard.module.scss';

interface ProfilCardProps {
  pseudo: string;
  nbrGame: number;
  nbrReview: number;
  profilPictureId: number;
  bannerPictureId?: number;
  //isConnectedUser: boolean;
  //nbrFollower: number;
  //isFollowed: boolean;
}

const ProfilCard: React.FC<ProfilCardProps> = ({
  pseudo,
  nbrGame,
  nbrReview,
  profilPictureId,
  bannerPictureId
}) => {
  
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
        <div className={styles['profil-card__pseudo']}>{pseudo}</div>

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
