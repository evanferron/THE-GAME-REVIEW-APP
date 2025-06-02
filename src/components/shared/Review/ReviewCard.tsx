import { useState } from 'react';

import { getReviewById, likeReview } from '@api/review';
import useAuth from '@hooks/useAuth';
import { UUID } from 'crypto';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

import styles from './Review.module.scss';

interface ReviewProps {
  id: UUID;
  description: string;
  rating: number;
  likes: number;
  date: string;
  owner_pseudo: string;
  owner_picture: number;
}

export const ReviewCard = ({
  id,
  description,
  rating,
  likes,
  date,
  owner_pseudo,
  owner_picture,
}: ReviewProps) => {
  const [currentLikes, setCurrentLikes] = useState<number>(Number(likes));
  const [hasLiked, setHasLiked] = useState(false);
  const [likeDisabled, setLikeDisabled] = useState(false);

  const { isAuthenticated } = useAuth();

  const MAX_LENGTH = 180;
  const isLong = description.length > MAX_LENGTH;
  const shortDescription = isLong ? description?.slice(0, MAX_LENGTH) + '…' : description;

  // Formater la date et l'heure en français
  const dateObj = new Date(date);
  const formattedDate = dateObj.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const formattedTime = dateObj.toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const handleLike = async () => {
    if (likeDisabled) return;
    setLikeDisabled(true);
    setHasLiked(!hasLiked);
    try {
      setCurrentLikes((prevLikes) => (hasLiked ? prevLikes - 1 : prevLikes + 1));
      const response = await likeReview(id);
      if (response.status === 201) {
        const updatedReview = await getReviewById(id);
        setCurrentLikes(Number(updatedReview.data.data.likes));
      }
    } catch (error) {
      console.error('Error liking the review:', error);
    } finally {
      setTimeout(() => setLikeDisabled(false), 1000); // 1 seconde de délai
    }
  };

  return (
    <div className={styles.review} key={id}>
      <div className={styles.left_container}>
        <img
          src={`/assets/pictures/profil_picture_${owner_picture}.jpg`}
          alt="profile banner"
          className={styles['profile_picture']}
        />
        <div
          className={
            rating >= 7 ? styles.rating_circle : `${styles.rating_circle} ${styles.yellow}`
          }
        >
          {rating}
        </div>
      </div>
      <div className={styles.right_container}>
        <div className={styles.review_header}>
          Critique de <span>@{owner_pseudo}</span>
          <span className={styles.review_date}>
            le {formattedDate} à {formattedTime}
          </span>
        </div>
        <p className={styles.review_description}>{shortDescription}</p>
        <div className={styles.review_details}>
          <span className={styles.like_container}>
            <button onClick={handleLike} disabled={!isAuthenticated || likeDisabled}>
              {hasLiked ? (
                <AiFillHeart color="#e74c3c" size={24} />
              ) : (
                <AiOutlineHeart color="#fff" size={24} />
              )}
            </button>
            <p>{currentLikes}</p>
          </span>
          <button className={styles.review_button}>Lire la critique</button>
        </div>
      </div>
    </div>
  );
};
