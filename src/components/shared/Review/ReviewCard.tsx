import { FcLike } from 'react-icons/fc';

import styles from './Review.module.scss';

interface ReviewProps {
  id: number;
  title: string;
  description: string;
  rating: number;
  likes: number;
  date: string;
  creatorName: string;
  creatorPictureId: number;
}

const ReviewCard = ({
  id,
  title,
  description,
  rating,
  likes,
  date,
  creatorName,
  creatorPictureId,
}: ReviewProps) => {
  return (
    <div className={styles.review}>
      <div className={styles.left_container}>
        <img src={`/assets/pictures/banner_picture_${creatorPictureId}.jpg`} alt="profile banner" />
        <p>{rating}</p>
      </div>
      <div className={styles.right_container}>
        <p>
          Critique de {creatorName} le {date}
        </p>
        <h2 className={styles.review_title}>{title}</h2>
        <p className={styles.review_description}>{description}</p>
        <button
        // todo : add a link to the review details page
        >
          Lire la critique
        </button>
        <div className={styles.review_details}>
          <span className={styles.like_container}>
            <button>
              <FcLike
              // todo : show the hear icon red if already like by the current user
              />
            </button>
            <p>{likes}</p>
          </span>
        </div>
      </div>
    </div>
  );
};
