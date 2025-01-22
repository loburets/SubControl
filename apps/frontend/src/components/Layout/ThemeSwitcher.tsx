import React from 'react';
import { theme } from 'antd';
import { Theme } from '../../hooks/useTheme';
import { StyledSwitch, SwitchContainer } from './ThemeSwitcher.styled';

type ThemeSwitcherProps = {
  currentTheme: Theme;
  onThemeToggle: () => void;
};

const { useToken } = theme;

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({
  currentTheme,
  onThemeToggle,
}) => {
  const toggleTheme = () => {
    onThemeToggle();
  };

  const { token } = useToken();

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
