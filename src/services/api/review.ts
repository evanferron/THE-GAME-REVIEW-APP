import axiosInstance from "@utils/api/axiosInstance";

export const getMyReviewForAgame = async (gameId: number) => {
    try {
        const response = await axiosInstance.get(`/reviews/?game_id${gameId}`);

        if (!response) {
            throw new Error('Failed to fetch review');
        }

        return response;
    } catch (error) {
        console.error('Error fetching review:', error);
        throw error;
    }
}

export const createReview = async (gameId: number, rate: number, reviewText: string) => {
    try {
        const response = await axiosInstance.post('/reviews', {
            game_id: gameId,
            rate,
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