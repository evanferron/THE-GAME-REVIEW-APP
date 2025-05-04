import { store } from '@store/store';
import axiosInstance from '@utils/api/axiosInstance';


export const getUserDetails = async () => {
    try {
        const BASE_URL = import.meta.env.VITE_API_ENDPOINT;
        const API_KEY = import.meta.env.VITE_API_KEY;

        const { data, status } = await axiosInstance.get(
            `${BASE_URL}/user`,
            { headers: { 'x-api-key': API_KEY } });
        if (status !== 200) {
            throw new Error('An error occurred while fetching user details.');
        }
        return data.data;
    } catch (error) {
        console.error('Error fetching user details:', error);
        throw error;
    }
}

export const updateUserDetails = async (email : string, pseudo : string) => {
    try {
        const BASE_URL = import.meta.env.VITE_API_ENDPOINT;
        const API_KEY = import.meta.env.VITE_API_KEY;
        
        const { data, status } = await axiosInstance.get(
            `${BASE_URL}/user`,
            { headers: { 'x-api-key': API_KEY } });
        if (status !== 200) {
            throw new Error('An error occurred while fetching user details.');
        }
        return data.data;
    } catch (error) {
        console.error('Error fetching user details:', error);
        throw error;
    }
}

export const updateUserPassword = async (newPassword : string ) => {
    try {
        const BASE_URL = import.meta.env.VITE_API_ENDPOINT;
        const API_KEY = import.meta.env.VITE_API_KEY;

        const { data, status } = await axiosInstance.get(
            `${BASE_URL}/user`,
            { headers: { 'x-api-key': API_KEY } });
        if (status !== 200) {
            throw new Error('An error occurred while fetching user details.');
        }
        return data.data;
    } catch (error) {
        console.error('Error fetching user details:', error);
        throw error;
    }
}

