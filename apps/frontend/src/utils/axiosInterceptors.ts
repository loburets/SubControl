import axios from 'axios';
import { useAuthStore } from '../store/auth.store';

export const setupAxiosInterceptors = () => {
  const { token, clearToken } = useAuthStore.getState();

  axios.interceptors.request.use((config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        clearToken();
      }
      return Promise.reject(error);
    }
  );
};
