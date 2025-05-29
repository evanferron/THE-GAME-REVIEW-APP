import { UUID } from 'crypto';
import { FcLike } from 'react-icons/fc';

import styles from './Review.module.scss';

interface ReviewProps {
  id: UUID;
  description: string;
  rating: number;
  likes: number;
  date: string;
  creatorName: string;
  creatorPictureId: number;
}

export const ReviewCard = ({
  id,
  description,
  rating,
  likes,
  date,
  creatorName,
  creatorPictureId,
}: ReviewProps) => {
  // Définir la longueur max d'affichage
  const MAX_LENGTH = 180;
  const isLong = description.length > MAX_LENGTH;
  const shortDescription = isLong ? description.slice(0, MAX_LENGTH) + '…' : description;

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

  return (
    <div className={styles.review} key={id}>
      <div className={styles.left_container}>
        <img
          src={`/assets/pictures/profil_picture_${creatorPictureId}.jpg`}
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
          Critique de <span>@{creatorName}</span>
          <span className={styles.review_date}>
            le {formattedDate} à {formattedTime}
          </span>
        </div>
        <p className={styles.review_description}>{shortDescription}</p>
        <div className={styles.review_details}>
          <span className={styles.like_container}>
            <button>
              <FcLike />
            </button>
            <p>{likes}</p>
          </span>
          <button className={styles.review_button}>Lire la critique</button>
        </div>
      </div>
    </div>
  );
};
