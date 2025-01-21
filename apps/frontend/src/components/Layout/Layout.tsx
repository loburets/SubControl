import React, { PropsWithChildren } from 'react';
import { Layout as AntLayout, theme } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ThemeSwitcher from './ThemeSwitcher';
import {
  CreateButton,
  StyledMenuButton,
  StyledFooter,
  StyledHeader,
  StyledLayout,
  StyledBottomButton,
} from './Layout.styled';
import { useThemeContext } from './AntConfigProvider';
const { useToken } = theme;
const { Content } = AntLayout;

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const { toggleTheme, currentTheme } = useThemeContext();
  const { token } = useToken();

  return (
    <StyledLayout>
      <StyledHeader $token={token} $theme={currentTheme}>
        <StyledMenuButton>Subscriptions</StyledMenuButton>
        <StyledMenuButton type="primary">Past Payments</StyledMenuButton>
        <StyledMenuButton>Next Payments</StyledMenuButton>
        <StyledMenuButton>Statistic</StyledMenuButton>
      </StyledHeader>

      {/* Main Content */}
      <Content>
        <ThemeSwitcher
          currentTheme={currentTheme}
          onThemeToggle={toggleTheme}
        />
        {children}
      </Content>

      {/* Footer for Mobile Navigation */}
      <StyledFooter $token={token} $theme={currentTheme}>
        <StyledBottomButton $token={token} type="text">
          Subs
        </StyledBottomButton>
        <StyledBottomButton $token={token} type="link">
          Past
        </StyledBottomButton>
        <CreateButton
          type="primary"
          shape="circle"
          icon={<PlusOutlined />}
          size="large"
        />
        <StyledBottomButton $token={token} type="text">
          Next
        </StyledBottomButton>
        <StyledBottomButton $token={token} type="text">
          Stats
        </StyledBottomButton>
      </StyledFooter>
    </StyledLayout>
  );
};

export default Layout;
