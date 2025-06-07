import { useEffect, useState } from 'react';

import { getDiscoveryGames, getTendanceGames } from '@api/game';
import Footer from '@components/layout/Footer/Footer';
import Navbar from '@components/layout/Nav';
import GameDetails from '@components/shared/Game/GameDetails';
import List from '@components/shared/List/List';

import styles from './Discover.module.scss';

const Discover = () => {
  const [games, setGames] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedGame, setSelectedGame] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'The Game Review - Discover';
    const fetchGames = async () => {
      setLoading(true);
      try {
        const discoverGames = await getDiscoveryGames();
        const formattedGames = discoverGames.map((game: any) => ({
          id: game.id,
          title: game.name,
          developer: game.involved_companies?.[0]?.company?.name ?? '',
          imageSrc: `https:${game.cover}`,
          score: (game.aggregated_rating / 10).toFixed(1),
        }));

        setGames(formattedGames);
      } catch (err) {
        console.error('Error fetching games:', err);
        setError('Failed to load games. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  if (error) {
    return <div className={styles['error']}>{error}</div>;
  }

  return (
    <div className={styles['discover']}>
      <Navbar />
      {loading ? (
        <div className={styles['loading']}>
          <span>Loading games ...</span>
          <div className={styles['spinner']} />
        </div>
      ) : (
        <>
          <List title="Discover" games={games} setGamePopup={setSelectedGame} />
          {selectedGame && (
            <GameDetails id={selectedGame} setGamePopup={setSelectedGame}></GameDetails>
          )}
        </>
      )}
      <Footer />
    </div>
  );
};

export default Discover;
