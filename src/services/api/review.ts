import axiosInstance from "@utils/api/axiosInstance";
import { UUID } from "crypto";

export const getMyReviewForAgame = async (gameId: number) => {
    try {
        const response = await axiosInstance.get(`/review/my_review_for_game/${gameId}`);

        if (!response) {
            throw new Error('Failed to fetch review');
        }
        return response.data;
    } catch (error) {
        console.error('Error fetching review:', error);
        throw error;
    }
}

export const getReviewById = async (review_id: UUID) => {
    try {
        const response = await axiosInstance.get(`/review/${review_id}`);

        if (!response) {
            throw new Error('Failed to fetch review');
        }

        return response.data;
    } catch (error) {
        console.error('Error fetching review:', error);
        throw error;
    }

}

export const getMyReview = async () => {
    try {
        const response = await axiosInstance.get(`/review/my_reviews`);

        if (!response) {
            throw new Error('Failed to fetch review');
        }
        console.log('My reviews:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching review:', error);
        throw error;
    }

}

export const createReview = async (gameId: number, rate: number, reviewText: string) => {
    try {
        const response = await axiosInstance.post('/review', {
            game_id: gameId,
            rating: rate,
            review: reviewText,
        });

        if (!response) {
            throw new Error('Failed to create review');
        }

        return response;
    } catch (error) {
        console.error('Error creating review:', error);
        throw error;
    }
}

export const likeReview = async (reviewId: UUID) => {
    try {
        const response = await axiosInstance.post(`/review/like`, {
            id: reviewId,
        });


        if (!response) {
            throw new Error('Failed to like review');
        }

        return response;
    } catch (error) {
        console.error('Error liking review:', error);
        throw error;
    }
}