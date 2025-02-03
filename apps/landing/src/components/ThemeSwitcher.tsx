'use client';

import {
  ActionIcon,
  useComputedColorScheme,
  useMantineColorScheme,
} from '@mantine/core';
import { SunOutlined, MoonOutlined } from '@ant-design/icons';
import cx from 'clsx';
import classes from './ThemeSwitcher.module.css';

export function ThemeSwitcher() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light');

  return (
    <ActionIcon
      onClick={() =>
        setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')
      }
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
