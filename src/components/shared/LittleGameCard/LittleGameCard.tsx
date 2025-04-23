import React from 'react';

import styles from './LittleGameCard.module.scss';

interface LittleGameCardProps {
  title: string;
  developer: string;
  imageSrc: string;
}

const LittleGameCard: React.FC<LittleGameCardProps> = ({ title, developer, imageSrc }) => {
  return (
    <div className={styles['little-game-card']}>
      <div className={styles['little-game-card__image-wrapper']}>
        <img src={imageSrc} alt={title} className={styles['little-game-card__image']} />
      </div>
      <div className={styles['little-game-card__info']}>
        <h2 className={styles['little-game-card__title']}>{title}</h2>
        <p className={styles['little-game-card__developer']}>{developer}</p>
      </div>
    </div>
  );
};

export default LittleGameCard;
