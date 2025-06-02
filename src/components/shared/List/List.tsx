import React, { useState } from 'react';

import GameCard from '@components/shared/GameCard/GameCard';
import { FaSearch } from 'react-icons/fa';

import styles from './List.module.scss';

interface Game {
  id: number;
  title: string;
  developer: string;
  imageSrc: string;
  score: number;
  userScore?: number | null;
  status?: string | null;
}

interface ListProps {
  title: string;
  games: Game[];
  setGamePopup: React.Dispatch<React.SetStateAction<number | null>>;
}

const List = ({ title, games, setGamePopup }: ListProps) => {
  const [search, setSearch] = useState('');

  const filteredGames = games.filter((game) =>
    Object.values(game)
      .filter((value) => typeof value === 'string' || typeof value === 'number')
      .some((value) => value?.toString().toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className={styles['list']}>
      <section className={styles['list__header']}>
        <h2 className={styles['list__title']}>
          <span className={styles['list__title-hashtag']}>#</span>
          {title}
        </h2>
        <div className={styles['list__search-wrapper']}>
          <FaSearch className={styles['list__search-icon']} />
          <input
            type="text"
            placeholder="Search something..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles['list__search']}
          />
        </div>
      </section>
      <section className={styles['list__cards']}>
        {filteredGames.map((game, index) => (
          <GameCard
            id={game.id}
            key={index}
            title={game.title}
            developer={game.developer}
            imageSrc={game.imageSrc}
            score={game.score}
            userScore={game.userScore}
            setGamePopup={setGamePopup}
          />
        ))}
      </section>
    </div>
  );
};

export default List;
