import { useEffect, useState } from 'react';

import { getLikedGames } from '@api/game';
import { getMyReview } from '@api/review';
import { getUserDetails } from '@api/user';
import Navbar from '@components/layout/Nav';
import GameDetails from '@components/shared/Game/GameDetails';
import List from '@components/shared/List/List';
import ProfilCard from '@components/shared/ProfilCard/ProfilCard';
import { ReviewCard } from '@components/shared/Review/ReviewCard';
import { ReviewData } from '@interfaces/api/Review';
import { UserDetailsData } from '@interfaces/api/User';

import styles from './Profile.module.scss';

const Profile = () => {
  const [userDetails, setUserDetails] = useState<UserDetailsData | null>(null);
  const [gameReviews, setGameReviews] = useState<ReviewData[] | null>(null);
  const [selectedGame, setSelectedGame] = useState<number | null>(null);
  const [games, setGames] = useState([]);
  const [tabSelected, setTabSelected] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchReview = async () => {
    setLoading(true);
    try {
      const { data } = await getMyReview();
      if (data?.success) {
        setGameReviews(data.data);
      }
    } catch (error) {
      console.error('Error fetching game reviews:', error);
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
    } finally {
      setLoading(false);
    }
  };

  const fetchUserDetails = async () => {
    setLoading(true);
    try {
      const { data } = await getUserDetails();
      setUserDetails(data);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    document.title = 'The Game Review - Profile';

    fetchUserDetails();
    fetchGames();
  }, []);

  useEffect(() => {
    if (tabSelected === 2) {
      fetchReview();
    }
  }, [tabSelected]);

  return (
    <div className={styles['profile']}>
      <Navbar />
      <div className={styles['profile-container']}>
        {loading && (
          <div className={styles['loading']}>
            <span>Loading profile ...</span>
            <div className={styles['spinner']} />
          </div>
        )}
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
              <br />
              <List title="Liked games" games={games} setGamePopup={setSelectedGame} />
              {typeof selectedGame === 'number' && (
                <GameDetails id={selectedGame} setGamePopup={setSelectedGame}></GameDetails>
              )}
            </div>
          )}
          {tabSelected === 2 && (
            <div>
              <h2 className={styles['reviews-title']}>Reviews</h2>
              {gameReviews == null || gameReviews.length === 0 ? (
                <p className={styles['no-reviews']}>There is no reviews yet...</p>
              ) : (
                <div className={styles['reviews']}>
                  {gameReviews?.map((review) => (
                    <ReviewCard
                      key={review.id}
                      id={review.id}
                      description={review.review ?? ''}
                      rating={review.rating}
                      likes={review.likes}
                      date={review.createdAt}
                      owner_pseudo={review.owner_pseudo}
                      owner_picture={review.owner_picture}
                      currentHasLiked={review.has_liked ?? false}
                    ></ReviewCard>
                  ))}
                </div>
              )}
            </div>
          )}
        </section>
        <div className={styles['bottom-space']}></div>
      </div>
    </div>
  );
};

export default Profile;
