import axiosInstance from '@utils/api/axiosInstance';

export const getGameDetails = async (id: number) => {
  try {
    const { data, status } = await axiosInstance.get(`/game/${id}`);
    if (status !== 200) {
      throw new Error('An error occurred while fetching game details.');
    }
    return data;
  } catch (error) {
    console.error('Error fetching game details:', error);
    throw error;
  }
};

export const getGameReviews = async (id: number) => {
  try {
    const { data, status } = await axiosInstance.get(`/review/get_by_game_id/${id}`);
    if (status !== 200) {
      throw new Error('An error occurred while fetching game reviews.');
    }
    return data;
  } catch (error) {
    console.error('Error fetching game reviews:', error);
    throw error;
  }
}

export const getTendanceGames = async () => {
  try {
    const response = await axiosInstance.get('/game/top');
    if (response.status !== 200) {
      throw new Error(`Failed to fetch trending games. Status code: ${response.status}`);
    }
    if (!response.data.success) {
      throw new Error('Failed to fetch trending games. No data returned.');
    }
    return response.data.data;
  } catch (error: any) {
    console.error('Error fetching trending games:', error.message ?? error);
    throw new Error('An error occurred while fetching trending games. Please try again later.');
  }
};
