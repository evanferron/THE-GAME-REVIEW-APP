import { useEffect, useState } from 'react';

import { getGameDetails } from '@api/game';
import useAuth from '@hooks/useAuth';
import { GameDetailsData } from '@interfaces/api/Game';
import { FaHeart } from 'react-icons/fa';

const GameDetails = (id: number) => {
  const defaultCoverUrl = require('@assets/images/others/default_game.png');
  const [gameDetails, setGameDetails] = useState<GameDetailsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tabSelected, setTabSelected] = useState(1);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    document.title = 'Tash | 404';
    const fetchGameDetails = async () => {
      setLoading(true);
      try {
        const { data } = await getGameDetails(id);
        setGameDetails(data);
      } catch (error) {
        setError('Failed to fetch game details. Please try again later.');
        console.error('Error fetching game details:', error);
      }
      setLoading(false);
    };
    fetchGameDetails();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <main>
      <button>
        <img src="" alt="" />
      </button>
      <header>
        <div>
          <img src={gameDetails?.cover_url ?? defaultCoverUrl} alt="game cover" />
        </div>
        <div>
          <h1>{gameDetails?.name}</h1>
          <p>{gameDetails?.franchises}</p>
          <div>
            <div>
              <p>{gameDetails?.aggregated_rating}</p>
            </div>
            {gameDetails?.userRate && (
              <div>
                <p>{gameDetails.userRate}</p>
              </div>
            )}
            <button>
              <FaHeart />
            </button>
          </div>
        </div>
      </header>
      <nav>
        <button onClick={() => setTabSelected(1)}>Présentation</button>
        <button onClick={() => setTabSelected(2)}>Critiques</button>
        {isAuthenticated && <button onClick={() => setTabSelected(3)}>Ajouter une critique</button>}
      </nav>
      <section>
        {tabSelected === 1 && (
          <div>
            <p>Type of games: {gameDetails?.genres.map((genre) => genre)}</p>
            <p>Platforms: {gameDetails?.platforms.map((platform) => platform)}</p>
            <p>Involved companies: {gameDetails?.involved_companies.map((company) => company)}</p>
            <p>{gameDetails?.summary}</p>
          </div>
        )}
        {tabSelected === 2 && (
          <div>
            <h2>Critiques</h2>
          </div>
        )}
        {tabSelected === 3 && (
          <div>
            <h2>Ma critique</h2>
          </div>
        )}
      </section>
    </main>
  );
};

export default GameDetails;
