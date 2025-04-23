import React from 'react';

import styles from './ProfilCard.module.scss';

interface ProfilCardProps {
  pseudo: string;
  nbrGame: number;
  nbrReview: number;
  profilPictureId: number;
  //isConnectedUser: boolean;
  //nbrFollower: number;
  //isFollowed: boolean;
}

const ProfilCard: React.FC<ProfilCardProps> = ({
  pseudo,
  nbrGame,
  nbrReview,
  //profilPictureId
}) => {
  return (
    <div className={styles['profil-card']}>
      <img src="/assets/pictures/profil_picture_1.jpg" alt={"profil picture"} className={styles['profil-card__picture']} />
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
  );
};

export default ProfilCard;
