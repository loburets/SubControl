// src/components/ThemeSwitcher.tsx
import React from 'react';
import { Switch } from 'antd';
import styled from 'styled-components';

// Styled Components
const SwitchContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 16px 0;
`;

const ThemeLabel = styled.span`
  margin-right: 8px;
  font-size: 16px;
  color: ${({ theme }) => theme.color};
`;

const StyledSwitch = styled(Switch)`
  &.ant-switch-checked {
    background-color: ${({ theme }) =>
      theme.background === '#000000' ? '#1890ff' : '#000000'};
  }
`;

export enum Theme {
  Light = 'light',
  Dark = 'dark',
}

type ThemeSwitcherProps = {
  currentTheme: Theme;
  onThemeChange: (value: Theme) => void;
};

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({
  currentTheme,
  onThemeChange,
}) => {
  const toggleTheme = () => {
    const nextTheme = currentTheme === Theme.Dark ? Theme.Light : Theme.Dark;
    onThemeChange(nextTheme);
  };

  return (
    <SwitchContainer>
      <ThemeLabel>
        {currentTheme === Theme.Light ? 'Light Mode' : 'Dark Mode'}
      </ThemeLabel>
      <StyledSwitch
        checked={currentTheme === 'dark'}
        onChange={toggleTheme}
        checkedChildren="🌙"
        unCheckedChildren="☀️"
      />
    </SwitchContainer>
  );
};

export default ThemeSwitcher;
