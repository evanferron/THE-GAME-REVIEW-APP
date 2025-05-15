import axiosInstance from '@utils/api/axiosInstance';
import { store } from '../../services/store/store';
import { logout, setTokens } from '../../services/store/slices/auth';


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
        
        const { data, status } = await axiosInstance.put(
            `${BASE_URL}/user/info`,
            { email, pseudo },
            { headers: { 'x-api-key': API_KEY } });
        if (status !== 201) {
            throw new Error('An error occurred while fetching user details.');
        }
        return data.data;
    } catch (error) {
        console.error('Error fetching user details:', error);
        throw error;
    }
}

export const updateUserPassword = async (password : string ) => {
    try {
        const BASE_URL = import.meta.env.VITE_API_ENDPOINT;
        const API_KEY = import.meta.env.VITE_API_KEY;
        const { data, status } = await axiosInstance.put(
            `${BASE_URL}/user/password`,
            { password },
            { headers: { 'x-api-key': API_KEY } });
        if (status !== 201) {
            throw new Error('An error occurred while fetching user details.');
        }
        return data.data;
    } catch (error) {
        console.error('Error fetching user details:', error);
        throw error;
    }
}


export const deleteUserAccount = async () => {
    try {
        console.log("User deleting");
        const BASE_URL = import.meta.env.VITE_API_ENDPOINT;
        const API_KEY = import.meta.env.VITE_API_KEY;
        const { data, status } = await axiosInstance.delete(
            `${BASE_URL}/user`,
            { headers: { 'x-api-key': API_KEY } });
        if (status !== 200) {
            throw new Error('An error occurred while fetching user details.');
        }
        store.dispatch(logout());
        console.log('Account deleted successfully');
        return data.data;
    } catch (error) {
        console.error('Error fetching user details:', error);
        throw error;
    }
}
