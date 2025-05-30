import axios from 'axios';
import Cookies from 'js-cookie';

import { logout, setTokens } from '../../services/store/slices/auth';
import { store } from '../../services/store/store';
import { getToken } from './auth';

const BASE_URL = import.meta.env.VITE_API_ENDPOINT;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const subscribeTokenRefresh = (cb: (token: string) => void) => {
  refreshSubscribers.push(cb);
};

const onRefreshed = (token: string) => {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
};

axiosInstance.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.token ?? getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(new Error(error))
);

axiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      console.warn('Token expired, trying to refresh...');
      if (isRefreshing) {
        console.warn('Already refreshing token, waiting for it to finish...');
        return new Promise((resolve) => {
          subscribeTokenRefresh((token) => {
            originalRequest.headers['Authorization'] = `Bearer ${token}`;
            resolve(axiosInstance(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;
      try {
        const refreshToken = Cookies.get('refreshToken');
        if (!refreshToken) throw new Error('No refresh token available');
        const response = await axios.post(BASE_URL + '/auth/refresh', { refreshToken });
        const { token } = response.data.data;
        store.dispatch(setTokens({ token }));
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        onRefreshed(token);
        isRefreshing = false;

        return axiosInstance(originalRequest);
      } catch (err) {
        store.dispatch(logout());
        console.error('Error refreshing token:', err);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(new Error(error));
  }
);

export default axiosInstance;
