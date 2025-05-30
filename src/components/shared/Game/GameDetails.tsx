import { useEffect, useRef, useState } from 'react';

import { getGameDetails, getGameReviews } from '@api/game';
import useAuth from '@hooks/useAuth';
import { GameDetailsData } from '@interfaces/api/Game';
import { ReviewData } from '@interfaces/api/Review';
import { FaHeart } from 'react-icons/fa';
import { MdOutlineClose } from 'react-icons/md';

import { ReviewCard } from '../Review/ReviewCard';
import styles from './GameDetails.module.scss';
import UserReview from './UserReview';
import defaultCoverUrl from '/assets/images/others/default_game.png';

interface GameDetailsProps {
  id: number;
  setGamePopup: React.Dispatch<React.SetStateAction<number | null>>;
}

const GameDetails = ({ id, setGamePopup }: GameDetailsProps) => {
  const [gameDetails, setGameDetails] = useState<GameDetailsData | null>(null);
  const [gameReviews, setGameReviews] = useState<ReviewData[] | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tabSelected, setTabSelected] = useState(1);
  const { isAuthenticated } = useAuth();
  const modalRef = useRef<HTMLDivElement>(null);

  const fetchGameReviews = async () => {
    setLoading(true);
    try {
      const { data } = await getGameReviews(id);
      if (data?.success) {
        setGameReviews(data.data);
      }
    } catch (error) {
      setError('Failed to fetch game reviews. Please try again later.');
      console.error('Error fetching game reviews:', error);
    }
    setLoading(false);
  };

  const fetchGameDetails = async () => {
    setLoading(true);
    try {
      const { data } = await getGameDetails(id);
      setGameDetails(data);
    } catch (error) {
      setError('Failed to fetch game details. Please try again later.');
      console.error('Error fetching game details:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGameDetails();
  }, []);

  useEffect(() => {
    if (tabSelected === 2) {
      fetchGameReviews();
    }
  }, [tabSelected]);

  const handleClose = () => {
    setGamePopup(null);
  };

  const handleClickOutside = (event: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      handleClose();
    }
  };

  const roundRating = (rating: number | undefined) => {
    if (rating === null || rating === undefined) {
      return 'N/A';
    }
    const roundedRating = Math.round(rating * 10) / 10;
    return roundedRating.toFixed(1);
  };

  if (loading) {
    return <div className={`${styles['modal-overlay']} ${styles['loading']}`}>Loading...</div>;
  }

  if (error) {
    return <div className={`${styles['modal-overlay']} ${styles['error']}`}>{error}</div>;
  }

  return (
    <div
      className={styles['modal-overlay']}
      onClick={handleClickOutside}
      onKeyDown={(e) => {
        if (e.key === 'Escape') handleClose();
      }}
    >
      <div className={styles['modal-content']} ref={modalRef}>
        <button className={styles['modal-close']} onClick={handleClose}>
          <MdOutlineClose />
        </button>
        <header>
          <div>
            <img src={gameDetails?.cover_url ?? defaultCoverUrl} alt="game cover" />
          </div>
          <div id={styles['right-header']}>
            <h1>{gameDetails?.name}</h1>
            <p>{gameDetails?.franchises}</p>
            <div>
              <div>
                <p>{roundRating((gameDetails?.aggregated_rating as number) / 10)}</p>
              </div>
              {gameDetails?.userRate && (
                <div className={styles['user-rate']}>
                  <p>{roundRating(gameDetails.userRate)}</p>
                </div>
              )}
              <button>
                <FaHeart color="#fff" size={22} />
              </button>
            </div>
          </div>
        </header>
        <nav className={styles['tabs']}>
          <button
            onClick={() => setTabSelected(1)}
            id={tabSelected == 1 ? styles['underline-tab'] : styles['no-underline-tab']}
          >
            Présentation
          </button>

          <button
            onClick={() => {
              fetchGameReviews();
              setTabSelected(2);
            }}
            id={tabSelected == 2 ? styles['underline-tab'] : styles['no-underline-tab']}
          >
            Critiques
          </button>
          {isAuthenticated && (
            <button
              onClick={() => setTabSelected(3)}
              id={tabSelected == 3 ? styles['underline-tab'] : styles['no-underline-tab']}
            >
              Ajouter une critique
            </button>
          )}
        </nav>
        <section>
          {tabSelected === 1 && (
            <div className={styles['tab-content']}>
              <p>Type of games: {gameDetails?.genres.map((genre) => genre).join(', ')}</p>
              <p>Platforms: {gameDetails?.platforms.map((platform) => platform).join(', ')}</p>
              <p>
                Involved companies:
                {gameDetails?.involved_companies.map((company) => company).join(', ')}
              </p>
              <p>{gameDetails?.summary}</p>
            </div>
          )}
          {tabSelected === 2 && (
            <div>
              <h2>Critiques</h2>
              {gameReviews == null || gameReviews.length === 0 ? (
                <p>Aucune critique disponible pour ce jeu.</p>
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
                    ></ReviewCard>
                  ))}
                </div>
              )}
            </div>
          )}
          {tabSelected === 3 && (
            <div>
              <h2>Ma critique</h2>
              <UserReview gameId={id} />
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default GameDetails;
