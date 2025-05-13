import { useEffect, useState } from 'react';

import { getTendanceGames } from '@api/game';
import Navbar from '@components/layout/Nav';
import GameCarousel from '@components/shared/Carousel/Carousel';
import GameDetails from '@components/shared/Game/GameDetails';
import LittleGameList from '@components/shared/ListeLittleCards/ListLittleCards';

import styles from './Home.module.scss';

const Home = () => {
  const [games, setGames] = useState([]);
  const [bestRatedGames, setBestRatedGames] = useState([]);
  const [mostPlayedGames, setMostPlayedGames] = useState([]);
  const [mostReviewedGames, setMostReviewedGames] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedGame, setSelectedGame] = useState<number | null>(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        // Fetch trending games
        const trendingGames = await getTendanceGames();

        // Adapter les données au format attendu
        const formattedGames = trendingGames.map((game: any) => ({
          id: game.id,
          title: game.name,
          developer: 'Unknown',
          imageSrc: `https:${game.cover}`,
          score: (game.aggregated_rating / 10).toFixed(1),
        }));

        setGames(formattedGames);
        setBestRatedGames(formattedGames.slice(0, 5));
        setMostPlayedGames(formattedGames.slice(5, 10));
        setMostReviewedGames(formattedGames.slice(6, 11));
      } catch (err) {
        console.error('Error fetching games:', err);
        setError('Failed to load games. Please try again later.');
      }
    };

    fetchGames();
  }, []);

  if (error) {
    return <div className={styles['error']}>{error}</div>;
  }

  return (
    <div className={styles['home']}>
      <Navbar />
      <GameCarousel title="Les jeux" games={games} setGamePopup={setSelectedGame} />
      <div className={styles['home__lists']}>
        <LittleGameList title="Les mieux notés" games={bestRatedGames} />
        <LittleGameList title="Les plus joués" games={mostPlayedGames} />
        <LittleGameList title="Les plus critiqués" games={mostReviewedGames} />
      </div>
      {selectedGame && <GameDetails id={selectedGame} setGamePopup={setSelectedGame}></GameDetails>}
    </div>
  );
};

export default Home;
