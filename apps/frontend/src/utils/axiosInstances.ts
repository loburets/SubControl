import axios from 'axios';
import { useAuthStore } from '../store/auth.store';

export const axiosApiInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosApiInstance.interceptors.request.use((config) => {
  const { token } = useAuthStore.getState();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosApiInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const { clearToken } = useAuthStore.getState();
      clearToken();
    }
    return Promise.reject(error);
  }
);
