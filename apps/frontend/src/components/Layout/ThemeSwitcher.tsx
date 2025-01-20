// src/components/ThemeSwitcher.tsx
import React from 'react';
import { Switch } from 'antd';
import styled from 'styled-components';
import { Theme } from '../../hooks/useTheme';

// Styled Components
const SwitchContainer = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  margin: 16px 24px;
`;

const SwitchLabel = styled.span`
  margin-right: 8px;
  font-size: 16px;
`;

// TODO use ant design tokens
const StyledSwitch = styled(Switch)`
  &.ant-switch-checked {
    background-color: ${({ theme }) =>
      theme.background === '#000000' ? '#1890ff' : '#000000'};
  }
  transform: scale(1.2);
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
      <SwitchLabel>
        {/*{currentTheme === Theme.Light ? 'Light Mode' : 'Dark Mode'}*/}
      </SwitchLabel>
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
