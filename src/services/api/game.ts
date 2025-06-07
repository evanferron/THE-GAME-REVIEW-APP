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
};

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

export const getLikedGames = async () => {
  try {
    const response = await axiosInstance.post('/game_list/name', {
      name: 'Like',
    });
    if (response.status !== 200) {
      throw new Error(`Failed to fetch liked games. Status code: ${response.status}`);
    }
    if (!response.data.success) {
      throw new Error('Failed to fetch liked games. No data returned.');
    }
    return response.data.data;
  } catch (error: any) {
    console.error('Error fetching liked games:', error.message ?? error);
    throw new Error('An error occurred while fetching liked games. Please try again later.');
  }
};

export const getDiscoveryGames = async () => {
  try {
    // Génère 40 IDs aléatoires uniques entre 1 et 3000
    const idsArray = Array.from(
      new Set(Array.from({ length: 40 }, () => Math.floor(Math.random() * 3000) + 1))
    );

    const idsString = idsArray.map((id) => id.toString()).join(',');

    // Appelle la route backend avec les IDs directement dans l'URL
    const response = await axiosInstance.get(`/game/preview/${idsString}`);

    if (response.status !== 200) {
      throw new Error(`Failed to fetch discovery games. Status code: ${response.status}`);
    }
    if (!response.data.success) {
      throw new Error('Failed to fetch discovery games. No data returned.');
    }
    return response.data.data;
  } catch (error: any) {
    console.error('Error fetching discovery games:', error.message ?? error);
    throw new Error('An error occurred while fetching discovery games. Please try again later.');
  }
};
