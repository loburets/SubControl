import { create } from 'zustand';
import Cookies from 'js-cookie';

export enum Theme {
  Light = 'light',
  Dark = 'dark',
}

interface ThemeSwitcherState {
  currentTheme: Theme;
  toggleTheme: () => void;
  resetCurrentThemeIfRequired: () => void;
}

const THEME_COOKIE_KEY = 'SubControl_lighting_theme';
const COOKIE_EXPIRATION_HOURS = 12;

function calculateCurrentTheme() {
  const savedTheme = Cookies.get(THEME_COOKIE_KEY) as Theme | undefined;
  if (savedTheme) {
    return savedTheme;
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? Theme.Dark
    : Theme.Light;
}

export const useThemeSwitcherStore = create<ThemeSwitcherState>((set) => ({
  currentTheme: calculateCurrentTheme(),
  toggleTheme: () => {
    set((state) => {
      const newTheme =
        state.currentTheme === Theme.Light ? Theme.Dark : Theme.Light;
      Cookies.set(THEME_COOKIE_KEY, newTheme, {
        expires: COOKIE_EXPIRATION_HOURS / 24,
      });
      return { currentTheme: newTheme };
    });
  },
  resetCurrentThemeIfRequired: () => {
    const newCurrentTheme = calculateCurrentTheme();
    set(({ currentTheme }) =>
      newCurrentTheme === currentTheme ? {} : { currentTheme: newCurrentTheme }
    );
  },
}));
