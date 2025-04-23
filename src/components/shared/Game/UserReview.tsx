import { useEffect, useState } from 'react';

import { getReviewByUserAndGame } from '@api/review';
import useAuth from '@hooks/useAuth';

export default function UserReview(gameId: number) {
  const { user, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [review, setReview] = useState(null);

  if (!isAuthenticated) {
    setError('You must be logged in to review.');
  }

  // useEffect(() => {
  //   const response = async () => {
  //     setLoading(true);
  //     try {
  //       const { data } = await getReviewByUserAndGame(user, gameId);
  //       setReview(data);
  //     } catch (error) {
  //       setError('Failed to fetch review. Please try again later.');
  //       console.error('Error fetching review:', error);
  //     }
  //     setLoading(false);
  //   };
  // }, []);

  return <div>UserCritique</div>;
}
