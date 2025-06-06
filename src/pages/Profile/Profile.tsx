import { useEffect, useState } from 'react';

import { getUserDetails } from '@api/user';
import { getLikedGames } from '@api/game';
import Navbar from '@components/layout/Nav';
import ProfilCard from '@components/shared/ProfilCard/ProfilCard';
import { UserDetailsData } from '@interfaces/api/User';
import styles from './Profile.module.scss';
import List from '@components/shared/List/List';
import GameDetails from '@components/shared/Game/GameDetails';


const Profile = () => {
  const [userDetails, setUserDetails] = useState<UserDetailsData | null>(null);
  const [selectedGame, setSelectedGame] = useState<number | null>(null);
  const [games, setGames] = useState([]);
  const [tabSelected, setTabSelected] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'The game review | 404';
    const fetchUserDetails = async () => {
      setLoading(true);
      try {
        const { data } = await getUserDetails();
        setUserDetails(data);
      } catch (error) {
        setError('Failed to fetch user details. Please try again later.');
        console.error('Error fetching user details:', error);
      }
      setLoading(false);
    };

    const fetchGames = async () => {
      setLoading(true);
      try {
        // Fetch liked games
        const likedGames = await getLikedGames();

        // Adapter les données au format attendu
        const formattedGames = likedGames.data.map((game: any) => ({
          id: parseInt(game.gameId),
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

    fetchUserDetails();
    fetchGames();
  }, []);

  return (
    <div className={styles['profile']}>
      <Navbar />
      <div className={styles['profile-container']}>
        {/* mettre la navbar */}
        {/* Profile Card */}
        <header>
          <ProfilCard
            pseudo={userDetails?.pseudo ?? ''}
            email={userDetails?.email ?? ''}
            nbrGame={userDetails?.nbrGame ?? 0}
            nbrReview={userDetails?.nbrReview ?? 0}
            profilPictureId={userDetails?.profilePictureId ?? 1}
            bannerPictureId={userDetails?.bannerId ?? 1}
          />
        </header>

        <section>
          <nav className={styles.tabs}>
            <button
              className={`${styles.tab} ${tabSelected === 1 ? styles.active : ''}`}
              onClick={() => setTabSelected(1)}
            >
              Liked games
            </button>
            <button
              className={`${styles.tab} ${tabSelected === 2 ? styles.active : ''}`}
              onClick={() => setTabSelected(2)}
            >
              Reviews
            </button>
            <button
              className={`${styles.tab} ${tabSelected === 3 ? styles.active : ''}`}
              onClick={() => setTabSelected(3)}
            >
              Lists
            </button>
          </nav>
        </section>
        <section>
          {tabSelected === 1 && (
            <div>
              <br/>
              <List title="Liked games" games={games} setGamePopup={setSelectedGame} />
              {typeof selectedGame === 'number' && (
                <GameDetails id={selectedGame} setGamePopup={setSelectedGame}></GameDetails>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Profile;
