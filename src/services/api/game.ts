import axiosInstance from '@utils/api/axiosInstance';


export const getGameDetails = async (id: number) => {
    try {
        const { data, status } = await axiosInstance.get(`/games/${id}`);
        if (status !== 200) {
            throw new Error('An error occurred while fetching game details.');
        }
        return data;
    } catch (error) {
        console.error('Error fetching game details:', error);
        throw error;
    }
}
