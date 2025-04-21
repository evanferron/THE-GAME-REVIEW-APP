import React from 'react';

import './LittleGameCard.scss';

interface LittleGameCardProps {
  title: string;
  developer: string;
  imageSrc: string;
}

const LittleGameCard: React.FC<LittleGameCardProps> = ({ title, developer, imageSrc }) => {
  return (
    <div className="little-game-card">
      <div className="little-game-card__image-wrapper">
        <img src={imageSrc} alt={title} className="little-game-card__image" />
      </div>
      <div className="little-game-card__info">
        <h2 className="little-game-card__title">{title}</h2>
        <p className="little-game-card__developer">{developer}</p>
      </div>
    </div>
  );
};

export default LittleGameCard;
