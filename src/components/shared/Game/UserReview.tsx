import { useEffect, useState } from 'react';

import { createReview, getMyReviewForAgame } from '@api/review';
import useAuth from '@hooks/useAuth';
import { ReviewData } from '@interfaces/api/Review';
import Spinner from 'react-bootstrap/Spinner';
import { FaRegStar, FaStar } from 'react-icons/fa';

import { ReviewCard } from '../Review/ReviewCard';
import style from './UserReview.module.scss';

const UserReview = ({ gameId }: { gameId: number }) => {
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);

  const [publishLoading, setPublishLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [review, setReview] = useState<ReviewData | null>(null);
  const [rate, setRate] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const MAX_RATE = 10;

  if (!isAuthenticated) {
    setError('You must be logged in to review.');
  }
  const getMyReview = async () => {
    setLoading(true);
    try {
      const { data } = await getMyReviewForAgame(gameId);
      if (!data) setReview(null);
      else setReview(data.data);
    } catch (error) {
      setError('Failed to fetch review. Please try again later.');
      console.error('Error fetching review:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getMyReview();
  }, []);

  if (loading) {
    return (
      <Spinner animation="border">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }
  if (error) {
    return <div>{error}</div>;
  }

  const handlePublish = async () => {
    setPublishLoading(true);
    if (!isAuthenticated) {
      setFormError('You must be logged in to review.');
      setPublishLoading(false);
      return;
    }
    if (reviewText.length < 10) {
      setFormError('Review must be at least 10 characters long.');
      setPublishLoading(false);
      return;
    }
    const response = await createReview(gameId, rate, reviewText);

    if (response.status === 200) {
      setReview(response.data);
      setRate(0);
      setReviewText('');
    }
    await getMyReview();
    setPublishLoading(false);
  };

  if (!review) {
    return (
      <div className={style['form']}>
        <p>Note :</p>
        <div className={style['stars_container']}>
          {[...Array(MAX_RATE).keys()].map((value) => {
            return (
              <button
                key={value + 1}
                onClick={() => {
                  if (value + 1 == rate) {
                    setRate(0);
                  } else {
                    setRate(value + 1);
                  }
                }}
                className={style['star']}
              >
                {rate >= value + 1 ? (
                  <FaStar className={style['yellow']} />
                ) : (
                  <FaRegStar className={style['grey']} />
                )}
              </button>
            );
          })}
          <p>{rate}/10</p>
        </div>

        <label htmlFor="review">Review</label>
        <textarea
          name="review"
          id="review"
          rows={10}
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        ></textarea>
        {formError && <p className={style['error']}>{formError}</p>}
        <button onClick={handlePublish} className={style['publish']}>
          {publishLoading ? (
            <Spinner animation="border">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : (
            <p>Publish</p>
          )}
        </button>
      </div>
    );
  }

  return (
    <ReviewCard
      id={review.id}
      description={review.review ?? ''}
      rating={review.rating ?? 0}
      likes={review.likes ?? 0}
      date={review.createdAt}
      owner_pseudo={review.owner_pseudo}
      owner_picture={review.owner_picture}
      currentHasLiked={review.has_liked ?? false}
    />
  );
};

export default UserReview;
