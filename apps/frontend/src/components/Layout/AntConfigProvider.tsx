import React, { PropsWithChildren, useContext, createContext } from 'react';
import { useTheme, Theme } from '../../hooks/useTheme';
import { ConfigProvider, theme } from 'antd';

interface ThemeContextType {
  currentTheme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeContext = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within ConfigProvider');
  }
  return context;
};

export const AntConfigProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const { toggleTheme, currentTheme } = useTheme();

  return (
    <ThemeContext.Provider value={{ toggleTheme, currentTheme }}>
      <ConfigProvider
        theme={{
          algorithm:
            currentTheme === Theme.Dark
              ? theme.darkAlgorithm
              : theme.defaultAlgorithm,
        }}
      >
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};
