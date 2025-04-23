import axiosInstance from "@utils/api/axiosInstance";

export const getReviewByUserAndGame = async (userId: string, gameId: string) => {
    try {
        const response = await axiosInstance.get(`/reviews/?user_id${userId}&game_id${gameId}`);

        if (!response) {
            throw new Error('Failed to fetch review');
        }

        return response;
    } catch (error) {
        console.error('Error fetching review:', error);
        throw error;
    }
}