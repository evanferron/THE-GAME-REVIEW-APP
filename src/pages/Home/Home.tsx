import { useEffect, useState } from 'react';

import { getTendanceGames } from '@api/game';
import Footer from '@components/layout/Footer/Footer';
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'The Game Review - Home';
    const fetchGames = async () => {
      setLoading(true);
      try {
        // Fetch trending games
        const trendingGames = await getTendanceGames();
        // Adapter les données au format attendu
        const formattedGames = trendingGames.map((game: any) => ({
          id: game.id,
          title: game.name,
          developer: game.involved_companies?.[0]?.company?.name ?? '',
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
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  if (error) {
    return (
      <div className={styles['error']} data-testid="home-error">
        {error}
      </div>
    );
  }

  return (
    <div className={styles['home']}>
      <Navbar />
      {loading ? (
        <div className={styles['loading']}>
          <span>Loading games ...</span>
          <div className={styles['spinner']} />
        </div>
      ) : (
        <>
          <GameCarousel title="The games" games={games} setGamePopup={setSelectedGame} />
          <div className={styles['home__lists']}>
            <LittleGameList
              title="Top rated"
              games={bestRatedGames}
              setGamePopup={setSelectedGame}
            />
            <LittleGameList
              title="Most played"
              games={mostPlayedGames}
              setGamePopup={setSelectedGame}
            />
            <LittleGameList
              title="The most criticised"
              games={mostReviewedGames}
              setGamePopup={setSelectedGame}
            />
          </div>
          {selectedGame && (
            <GameDetails id={selectedGame} setGamePopup={setSelectedGame}></GameDetails>
          )}
        </>
      )}
      <Footer />
    </div>
  );
};

export default Home;
