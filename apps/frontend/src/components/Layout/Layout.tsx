import React, { PropsWithChildren } from 'react';
import { Button, theme } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ThemeSwitcher from './ThemeSwitcher';
import {
  CreateButton,
  StyledContent,
  StyledFooter,
  StyledHeader,
} from './Layout.styled';
import { useThemeContext } from './AntConfigProvider';
const { useToken } = theme;

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const { toggleTheme, currentTheme } = useThemeContext();
  const { token } = useToken();

  return (
    <Layout>
      <StyledHeader $token={token}>
        <Button type="link">Subs</Button>
        <Button type="link">Past</Button>
        <Button type="link">Next</Button>
        <Button type="link">Stats</Button>
      </StyledHeader>
      <ThemeSwitcher currentTheme={currentTheme} onThemeToggle={toggleTheme} />

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
    </Layout>
  );
};

export default Layout;
