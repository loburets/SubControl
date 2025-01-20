import React from 'react';
import { Theme } from '../components/Layout/ThemeSwitcher';
import Cookies from 'js-cookie';

export function useTheme() {
  const THEME_COOKIE_KEY = 'SubControl_lighting_theme';
  const COOKIE_EXPIRATION_HOURS = 12;

  const [currentTheme, setCurrentTheme] = React.useState<Theme>(() => {
    const savedTheme = Cookies.get(THEME_COOKIE_KEY) as Theme | undefined;
    if (savedTheme) {
      return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? Theme.Dark
      : Theme.Light;
  });
  const toggleTheme = () => {
    const nextTheme = currentTheme === Theme.Dark ? Theme.Light : Theme.Dark;
    setCurrentTheme(nextTheme);
    Cookies.set(THEME_COOKIE_KEY, nextTheme, {
      expires: COOKIE_EXPIRATION_HOURS / 24,
    });
  };

  return {
    currentTheme,
    toggleTheme,
  };
}
