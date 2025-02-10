'use client';

import {
  ActionIcon,
  useComputedColorScheme,
  useMantineColorScheme,
} from '@mantine/core';
import { SunOutlined, MoonOutlined } from '@ant-design/icons';
import cx from 'clsx';
import classes from './ThemeSwitcher.module.css';
import Cookies from 'js-cookie';
import { useEffect } from 'react';

enum Theme {
  Light = 'light',
  Dark = 'dark',
}

// Note: can be moved to shared packages together with similar logic from the main app:
// apps/frontend/src/store/themeSwitcher.store.ts
// but for the sake of simplicity it's kept here as not often updated and simple
const THEME_COOKIE_KEY = 'SubControl_lighting_theme';
const COOKIE_EXPIRATION_HOURS = 12;
const domain =
  typeof window !== 'undefined' && window.location.href.includes('localhost')
    ? undefined
    : '.' + window.location.host.split('.').slice(-2).join('.');

function calculateCurrentTheme() {
  const savedTheme = Cookies.get(THEME_COOKIE_KEY) as Theme | undefined;
  if (savedTheme) {
    return savedTheme;
  }
  return typeof window !== 'undefined' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
    ? Theme.Dark
    : Theme.Light;
}

export function ThemeSwitcher() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme(calculateCurrentTheme());

  useEffect(() => {
    const timer = setInterval(() => {
      const currentTheme = calculateCurrentTheme();
      if (currentTheme === computedColorScheme) {
        return;
      }
      setColorScheme(currentTheme);
    }, 1000);

    return () => clearInterval(timer);
  }, [setColorScheme]);

  const onThemeChange = () => {
    const newTheme = computedColorScheme === 'light' ? 'dark' : 'light';
    setColorScheme(newTheme);
    Cookies.set(THEME_COOKIE_KEY, newTheme, {
      expires: COOKIE_EXPIRATION_HOURS / 24,
      domain,
    });
  };

  return (
    <ActionIcon
      onClick={onThemeChange}
      variant="default"
      size="compact-sm"
      aria-label="Toggle color scheme"
      className={classes.switcher}
    >
      <SunOutlined className={cx(classes.icon, classes.light)} />
      <MoonOutlined className={cx(classes.icon, classes.dark)} />
    </ActionIcon>
  );
}
