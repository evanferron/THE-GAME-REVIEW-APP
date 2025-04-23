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