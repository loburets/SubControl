import React, { PropsWithChildren } from 'react';
import { Button, theme } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ThemeSwitcher from './ThemeSwitcher';
import {
  CreateButton,
  StyledContent,
  StyledFooter,
  StyledHeader,
  StyledLayout,
} from './Layout.styled';
import { useThemeContext } from './AntConfigProvider';
const { useToken } = theme;

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const { toggleTheme, currentTheme } = useThemeContext();
  const { token } = useToken();

  return (
    <StyledLayout>
      {/* Header for Desktop Navigation */}
      <StyledHeader
        style={{
          backgroundColor: token.colorBgBase,
          // backgroundColor: 'black',
        }}
      >
        <Button type="link">Subs</Button>
        <Button type="link">Past</Button>
        <Button type="link">Next</Button>
        <Button type="link">Stats</Button>
        <ThemeSwitcher
          currentTheme={currentTheme}
          onThemeToggle={toggleTheme}
        />
      </StyledHeader>

      {/* Main Content */}
      <StyledContent>{children}</StyledContent>

      {/* Footer for Mobile Navigation */}
      <StyledFooter>
        <Button type="link">Subs</Button>
        <Button type="link">Past</Button>
        <CreateButton
          type="primary"
          shape="circle"
          icon={<PlusOutlined />}
          size="large"
        />
        <Button type="link">Next</Button>
        <Button type="link">Stats</Button>
      </StyledFooter>
    </StyledLayout>
  );
};

export default Layout;
