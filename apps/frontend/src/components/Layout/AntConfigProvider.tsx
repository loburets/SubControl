import React, { PropsWithChildren } from 'react';
import { Theme } from '../../store/themeSwitcher.store';
import { ConfigProvider, theme } from 'antd';
import { useThemeSwitcherStore } from '../../store/themeSwitcher.store';

export const AntConfigProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const currentTheme = useThemeSwitcherStore((state) => state.currentTheme);

  return (
    <ConfigProvider
      theme={{
        algorithm:
          currentTheme === Theme.Dark
            ? theme.darkAlgorithm
            : theme.defaultAlgorithm,
        token: {
          fontSize: 16,
          colorPrimary: '#007fff',
          colorInfo: '#007fff',
          colorTextBase: currentTheme === Theme.Dark ? '#E8EAEC' : '#425466',
          fontFamily:
            "-apple-system,BlinkMacSystemFont,'Inter','Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji'",
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};
