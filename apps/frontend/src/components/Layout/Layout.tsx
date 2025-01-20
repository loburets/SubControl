import React, { PropsWithChildren } from 'react';
import { Layout, Button, ConfigProvider, theme } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import ThemeSwitcher, { Theme } from './ThemeSwitcher';
import { useTheme } from '../../hooks/useTheme';

const { Header, Footer, Content } = Layout;

// Styled Components
const StyledLayout = styled(Layout)`
  min-height: 100vh;
`;

const StyledHeader = styled(Header)`
  display: flex;
  background-color: #001529;
  padding: 0 16px;
  color: white;

  .ant-btn-link {
    color: white;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const StyledFooter = styled(Footer)`
  display: none;
  background-color: #fff;
  border-top: 1px solid #f0f0f0;
  padding: 8px 16px;
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 1000;

  @media (max-width: 768px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const StyledContent = styled(Content)`
  padding: 16px;
`;

const CreateButton = styled(Button)`
  transform: translateY(-25%);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

const AppLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const { toggleTheme, currentTheme } = useTheme();

  return (
    <ConfigProvider
      theme={{
        algorithm:
          currentTheme === Theme.Dark
            ? theme.darkAlgorithm
            : theme.defaultAlgorithm,
      }}
    >
      <StyledLayout>
        {/* Header for Desktop Navigation */}
        <StyledHeader>
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
    </ConfigProvider>
  );
};

export default AppLayout;
