import { useEffect, useState } from 'react';

import { createReview, getMyReviewForAgame } from '@api/review';
import useAuth from '@hooks/useAuth';
import Spinner from 'react-bootstrap/Spinner';
import { FaRegStar, FaStar } from 'react-icons/fa';

export default function UserReview(gameId: number) {
  const { user, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);
  const [publishLoading, setPublishLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [form, setFormError] = useState<string | null>(null);
  const [review, setReview] = useState(null);
  const [rate, setRate] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const MAX_RATE = 10;

  if (!isAuthenticated) {
    setError('You must be logged in to review.');
  }

  useEffect(() => {
    const getMyReview = async () => {
      setLoading(true);
      try {
        const { data } = await getMyReviewForAgame(gameId);
        setReview(data);
      } catch (error) {
        setError('Failed to fetch review. Please try again later.');
        console.error('Error fetching review:', error);
      }
      setLoading(false);
    };
    getMyReview();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }

  const handlePublish = async () => {
    setPublishLoading(true);
    if (!isAuthenticated) {
      setFormError('You must be logged in to review.');
      return;
    }
    if (rate === 0) {
      setFormError('Please select a rating.');
      return;
    }
    if (reviewText.length < 10) {
      setFormError('Review must be at least 10 characters long.');
      return;
    }
    const response = await createReview(gameId, rate, reviewText);

    if (response.status === 200) {
      setReview(response.data);
      setRate(0);
      setReviewText('');
    }
    setPublishLoading(false);
  };

  if (!review) {
    return (
      <div>
        <p>Note</p>
        <div>
          {[...Array(MAX_RATE)].map((value, index) => {
            return (
              <button
                key={value}
                onClick={() => {
                  setRate(value);
                }}
              >
                {rate >= index + 1 ? (
                  <FaStar className="text-yellow-500" />
                ) : (
                  <FaRegStar className="text-gray-400" />
                )}
              </button>
            );
          })}
        </div>

        <label htmlFor="review">Review</label>
        <textarea
          name="review"
          id="review"
          rows={10}
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        ></textarea>
        <button onClick={handlePublish}>
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
  // TODO : show the review component with the review data
  return <div>UserCritique</div>;
}
