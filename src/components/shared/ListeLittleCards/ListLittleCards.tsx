import LittleGameCard from '@components/shared/LittleGameCard/LittleGameCard';

import './ListLittleCards.scss';

interface Game {
  title: string;
  developer: string;
  imageSrc: string;
}

interface LittleGameListProps {
  title: string;
  games: Game[];
}

const LittleGameList = ({ title, games }: LittleGameListProps) => {
  return (
    <div className="list-little-cards">
      <h2 className="list-little-cards-title">
        <span className="list-little-cards-title-hashtag">#</span>
        {title}
      </h2>
      <div className="list-little-cards-list">
        {games.map((game, index) => (
          <LittleGameCard
            key={index}
            title={game.title}
            developer={game.developer}
            imageSrc={game.imageSrc}
          />
        ))}
      </div>
    </div>
  );
};

export default LittleGameList;
