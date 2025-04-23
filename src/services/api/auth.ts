import { setUser } from '@store/slices/auth';
import axiosInstance from '@utils/api/axiosInstance';
import Cookies from 'js-cookie';

import { store } from '../store/store';

const BASE_URL = import.meta.env.VITE_API_ENDPOINT;
const API_KEY = import.meta.env.VITE_API_KEY;
//const isDev = import.meta.env.MODE === 'development';
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
      store.dispatch(setUser({ token: devToken, user: devUser }));
      const devRefreshToken = 'dev-refresh-token';
      Cookies.set('refreshToken', devRefreshToken, {
        expires: 7,
        secure: true,
        sameSite: 'Strict',
      });
      return { user: { email, pseudo: 'DevUser' } };
    }

    const { data, status } = await axiosInstance.post(
      `${BASE_URL}/auth/login`,
      { email, password },
      { headers: { 'x-api-key': API_KEY } }
    );
    console.log(status)

    if (status !== 201) {
      throw new Error('An error occurred during login.');
    }

    store.dispatch(setUser({ token: data.token, user: data.user }));
    Cookies.set('refreshToken', data.refreshToken, {
      expires: 7,
      secure: true,
      sameSite: 'Strict',
    });

    return { success: true, user: data.user, token: data.token };
  } catch (error: any) {
    return { success: false, message: error.response?.data?.message || 'An error occurred during login.' };
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
      console.log('[DEV MODE] Register simulation');
      const devToken = 'dev-token';
      const devUser = { email, pseudo: 'DevUser' };
      store.dispatch(setUser({ token: devToken, user: devUser }));
      const devRefreshToken = 'dev-refresh-token';
      Cookies.set('refreshToken', devRefreshToken, {
        expires: 7,
        secure: true,
        sameSite: 'Strict',
      });
      return { user: { email, pseudo: 'DevUser' } };
    }

    const { data, status } = await axiosInstance.post(
      `${BASE_URL}/auth/register`,
      {
        email,
        pseudo,
        password,
        confirmPassword,
      },
      { headers: { 'x-api-key': API_KEY } }
    );

    if (status !== 201) throw new Error('Registration failed.');

    store.dispatch(setUser({ token: data.token, user: data.user }));
    Cookies.set('refreshToken', data.refreshToken, {
      expires: 7,
      secure: true,
      sameSite: 'Strict',
    });

    return { success: true, user: data.user, token: data.token };
  } catch (error: any) {
    return { success: false, message: error.response?.data?.message || 'An error occurred' };
  }
};
