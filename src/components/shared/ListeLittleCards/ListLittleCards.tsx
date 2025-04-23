import LittleGameCard from '@components/shared/LittleGameCard/LittleGameCard';

import styles from './ListLittleCards.module.scss';

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
    <div className={styles['list-little-cards']}>
      <h2 className={styles['list-little-cards__title']}>
        <span className={styles['list-little-cards__title-hashtag']}>#</span>
        {title}
      </h2>
      <div className={styles['list-little-cards__list']}>
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
