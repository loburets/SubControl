import React, { useEffect } from 'react';
import { theme } from 'antd';
import { Theme } from '../../store/themeSwitcher.store';
import { StyledSwitch, SwitchContainer } from './ThemeSwitcher.styled';
import { useThemeSwitcherStore } from '../../store/themeSwitcher.store';

const { useToken } = theme;

const ThemeSwitcher: React.FC = () => {
  const { currentTheme, toggleTheme, resetCurrentThemeIfRequired } =
    useThemeSwitcherStore();
  const { token } = useToken();

  useEffect(() => {
    const timer = setInterval(() => {
      resetCurrentThemeIfRequired();
    }, 1000);

    return () => clearInterval(timer);
  }, [resetCurrentThemeIfRequired]);

  return (
    <SwitchContainer $token={token}>
      <StyledSwitch
        $token={token}
        $currentTheme={currentTheme}
        checked={currentTheme === Theme.Dark}
        onChange={toggleTheme}
        checkedChildren="🌙"
        unCheckedChildren="☀️"
      />
    </SwitchContainer>
  );
};

export default ThemeSwitcher;
