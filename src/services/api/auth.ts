import axios from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;
const isDev = import.meta.env.MODE === 'development';

/**
 * Fonction de connexion à un compte
 *
 * @param {string} email
 * @param {string} password
 */
export const login = async (email: string, password: string) => {
    try {
        if (isDev) {
            console.log('[DEV MODE] Login simulation');
            Cookies.set('tashToken', 'dev-token', {
                expires: 7,
                secure: true,
                sameSite: 'Strict',
            });
            return { user: { email, username: 'DevUser' } };
        }

        const { data, status } = await axios.post(
            `${BASE_URL}/login`,
            {
                email,
                password,
            },
            { headers: { 'x-api-key': API_KEY } }
        );

        if (status !== 200) {
            throw new Error('An error occurred during login.');
        }

        Cookies.set('tashToken', data.token, {
            expires: 7,
            secure: true,
            sameSite: 'Strict',
        });
        return { success: true, user: data.user, token: data.token };
    } catch (error: any) {
        return { success: false, message: error.response?.data?.message || "Une erreur est survenue." };
    }
};

/**
 * Fonction de création de compte
 *
 * @param {string} email
 * @param {string} username
 * @param {string} password
 * @param {string} confirmPassword
 */
export const register = async (
    email: string,
    username: string,
    password: string,
    confirmPassword: string
) => {
    try {
        if (isDev) {
            console.log('[DEV MODE] Register simulation');
            Cookies.set('tashToken', 'dev-token', {
                expires: 7,
                secure: true,
                sameSite: 'Strict',
            });

            return { user: { email, username } };
        }

        const { data, status } = await axios.post(
            `${BASE_URL}/register`,
            {
                email,
                username,
                password,
                confirmPassword,
            },
            { headers: { 'x-api-key': API_KEY } }
        );

        if (status !== 201) throw new Error('Registration failed.');

        Cookies.set('tashToken', data.token, {
            expires: 7,
            secure: true,
            sameSite: 'Strict',
        });

        return { success: true, user: data.user, token: data.token };
    } catch (error: any) {
        return { success: false, message: error.response?.data?.message || "Une erreur est survenue." };
    }
};
