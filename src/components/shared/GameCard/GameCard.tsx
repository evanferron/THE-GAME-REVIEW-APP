import React from 'react';

import styles from './GameCard.module.scss';

interface GameCardProps {
  title: string;
  developer: string;
  imageSrc: string;
  score: number;
  userScore?: number | null;
  status?: string | null;
}

const GameCard: React.FC<GameCardProps> = ({
  title,
  developer,
  imageSrc,
  score,
  userScore,
  status,
}) => {
  return (
    <div className={styles['game-card']}>
      <div
        className={styles['game-card__image-wrapper']}
        style={{ backgroundImage: `url(${imageSrc})` }}
      >
        <div className={styles['game-card__overlay']}>
          <div className={styles['game-card__score']}>
            {(score / 100).toFixed(2).replace('.', ',')}
          </div>
          {userScore && <div className={styles['game-card__user-score']}>{userScore}</div>}
        </div>
      </div>
      <div className={styles['game-card__info']}>
        <h2 className={styles['game-card__title']}>{title}</h2>
        <p className={styles['game-card__developer']}>{developer}</p>
        {status && <p className={styles['game-card__status']}>{status}</p>}
      </div>
    </div>
  );
};

export default GameCard;
