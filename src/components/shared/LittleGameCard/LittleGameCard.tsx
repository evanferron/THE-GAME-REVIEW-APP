import React from 'react';

import styles from './LittleGameCard.module.scss';

interface LittleGameCardProps {
  id: number;
  title: string;
  developer: string;
  imageSrc: string;
  setGamePopup: React.Dispatch<React.SetStateAction<number | null>>;
}

const LittleGameCard: React.FC<LittleGameCardProps> = ({
  id,
  title,
  developer,
  imageSrc,
  setGamePopup,
}) => {
  return (
    <div className={styles['little-game-card']} onClick={() => setGamePopup(id)} role="button">
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
