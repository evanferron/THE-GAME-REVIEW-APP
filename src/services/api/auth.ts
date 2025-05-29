import { setUser } from '@store/slices/auth';
import axiosInstance from '@utils/api/axiosInstance';
import Cookies from 'js-cookie';

import { store } from '../store/store';

const BASE_URL = import.meta.env.VITE_API_ENDPOINT;
const API_KEY = import.meta.env.VITE_API_KEY;
const isDev = import.meta.env.MODE === 'test';

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
      const devToken = 'dev-token';
      const devUser = { email, pseudo: 'DevUser' };
      const devRefreshToken = 'dev-refresh-token';
      return { success: true, token: devToken, user: devUser, refreshToken: devRefreshToken };
    }

    let { data, status } = await axiosInstance.post(
      `${BASE_URL}/auth/login`,
      { email, password },
      { headers: { 'x-api-key': API_KEY } }
    );

    data = data.data

    if (status !== 200) {
      throw new Error('An error occurred during login.');
    }


    const user = {
      email: email,
      pseudo: data.pseudo,
    };

    store.dispatch(setUser({ token: data.token, user: user, refreshToken: data.refreshToken }));

    return { success: true, user: data.user, token: data.token, refreshToken: data.refreshToken };
  } catch (error: any) {
    return { success: false, message: error.response?.data?.message ?? 'An error occurred during login.' };
  }
};

/**
 * Fonction de création de compte
 *
 * @param {string} email
 * @param {string} pseudo
 * @param {string} password
 * @param {string} confirmPassword
 */
export const register = async (
  email: string,
  pseudo: string,
  password: string,
  confirmPassword: string
) => {
  try {
    if (password !== confirmPassword) {
      return { success: false, message: 'The password doesn\'t match' };
    }
    if (isDev) {
      console.log('[DEV MODE] Login simulation');
      const devToken = 'dev-token';
      const devUser = { email, pseudo: 'DevUser' };
      const devRefreshToken = 'dev-refresh-token';
      return { success: true, token: devToken, user: devUser, refreshToken: devRefreshToken };
    }

    let { data, status } = await axiosInstance.post(
      `${BASE_URL}/auth/register`,
      {
        email,
        pseudo,
        password,
        confirmPassword,
      },
      { headers: { 'x-api-key': API_KEY } }
    );

    data = data.data

    const user = {
      email: email,
      pseudo: data.pseudo,
    };

    if (status !== 201) throw new Error('Registration failed.');

    return { success: true, user: data.user, token: data.token, refreshToken: data.refreshToken };
  } catch (error: any) {
    return { success: false, message: error.response?.data?.message ?? 'An error occurred' };
  }
};
