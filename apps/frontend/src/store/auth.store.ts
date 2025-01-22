import { create } from 'zustand';

interface AuthState {
  token: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
}

const localStorageTokenKey = 'access_token';

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem(localStorageTokenKey),
  setToken: (token) => {
    localStorage.setItem(localStorageTokenKey, token);
    set({ token });
  },
  clearToken: () => {
    localStorage.removeItem(localStorageTokenKey);
    set({ token: null });
  },
}));
