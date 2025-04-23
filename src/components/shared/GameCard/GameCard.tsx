import React from 'react';

import './GameCard.scss';

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
    <div className="game-card">
      <div className="game-card__image-wrapper" style={{ backgroundImage: `url(${imageSrc})` }}>
        <div className="game-card__overlay">
          <div className="game-card__score">{score}</div>
          {userScore && <div className="game-card__user-score">{userScore}</div>}
        </div>
      </div>
      <div className="game-card__info">
        <h2 className="game-card__title">{title}</h2>
        <p className="game-card__developer">{developer}</p>
        {status && <p className="game-card__status">{status}</p>}
      </div>
    </div>
  );
};

export default GameCard;
