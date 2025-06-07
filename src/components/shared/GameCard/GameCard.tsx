import React from 'react';

import styles from './GameCard.module.scss';

interface GameCardProps {
  id: number;
  title: string;
  developer: string;
  imageSrc: string;
  score: number;
  userScore?: number | null;
  status?: string | null;
  setGamePopup: React.Dispatch<React.SetStateAction<number | null>>;
}

const GameCard: React.FC<GameCardProps> = ({
  id,
  title,
  developer,
  imageSrc,
  score,
  userScore,
  status,
  setGamePopup,
}) => {
  return (
    <div className={styles['game-card']} onClick={() => setGamePopup(id)} role="button">
      <div
        className={styles['game-card__image-wrapper']}
        style={{ backgroundImage: `url(${imageSrc})` }}
      >
        <div className={styles['game-card__overlay']}>
          <div className={styles['game-card__score']}>
            {isNaN(score) ? 'X' : (score / 100).toFixed(2).replace('.', ',')}
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
