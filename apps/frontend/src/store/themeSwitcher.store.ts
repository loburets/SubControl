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
const domain = window.location.href.includes('localhost')
  ? undefined
  : '.' + window.location.host.split('.').slice(-2).join('.');

function calculateCurrentTheme() {
  const savedTheme = Cookies.get(THEME_COOKIE_KEY) as Theme | undefined;
  if (savedTheme) {
    return savedTheme;
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? Theme.Dark
    : Theme.Light;
}

function setMetaTagTheme(theme: Theme) {
  const metaTag = document.querySelector('meta[name="theme-color"]');
  if (metaTag) {
    metaTag.setAttribute(
      'content',
      theme === Theme.Light ? '#ffffff' : '#000000'
    );
  }
}

setMetaTagTheme(calculateCurrentTheme());

export const useThemeSwitcherStore = create<ThemeSwitcherState>((set) => ({
  currentTheme: calculateCurrentTheme(),
  toggleTheme: () => {
    set((state) => {
      const newTheme =
        state.currentTheme === Theme.Light ? Theme.Dark : Theme.Light;
      Cookies.set(THEME_COOKIE_KEY, newTheme, {
        expires: COOKIE_EXPIRATION_HOURS / 24,
        domain,
      });
      setMetaTagTheme(newTheme);
      return { currentTheme: newTheme };
    });
  },
  resetCurrentThemeIfRequired: () => {
    const newCurrentTheme = calculateCurrentTheme();
    set(({ currentTheme }) => {
      if (newCurrentTheme === currentTheme) {
        return {};
      }
      setMetaTagTheme(newCurrentTheme);
      return { currentTheme: newCurrentTheme };
    });
  },
}));
