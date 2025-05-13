import LittleGameCard from '@components/shared/LittleGameCard/LittleGameCard';

import styles from './ListLittleCards.module.scss';

interface Game {
  id: number;
  title: string;
  developer: string;
  imageSrc: string;
}

interface LittleGameListProps {
  title: string;
  games: Game[];
  setGamePopup: React.Dispatch<React.SetStateAction<number | null>>;
}

const LittleGameList = ({ title, games, setGamePopup }: LittleGameListProps) => {
  return (
    <div className={styles['list-little-cards']}>
      <h2 className={styles['list-little-cards__title']}>
        <span className={styles['list-little-cards__title-hashtag']}>#</span>
        {title}
      </h2>
      <div className={styles['list-little-cards__list']}>
        {games.map((game, _) => (
          <LittleGameCard
            id={game.id}
            key={game.id}
            title={game.title}
            developer={game.developer}
            imageSrc={game.imageSrc}
            setGamePopup={setGamePopup}
          />
        ))}
      </div>
    </div>
  );
};

export default LittleGameList;
