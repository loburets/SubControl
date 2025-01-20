// src/components/ThemeSwitcher.tsx
import React from 'react';
import { Switch } from 'antd';
import styled from 'styled-components';
import { Theme } from '../../hooks/useTheme';

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

type ThemeSwitcherProps = {
  currentTheme: Theme;
  onThemeToggle: () => void;
};

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({
  currentTheme,
  onThemeToggle,
}) => {
  const toggleTheme = () => {
    onThemeToggle();
  };

  return (
    <SwitchContainer>
      <ThemeLabel>
        {currentTheme === Theme.Light ? 'Light Mode' : 'Dark Mode'}
      </ThemeLabel>
      <StyledSwitch
        checked={currentTheme === Theme.Dark}
        onChange={toggleTheme}
        checkedChildren="🌙"
        unCheckedChildren="☀️"
      />
    </SwitchContainer>
  );
};

export default ThemeSwitcher;
