import React, { PropsWithChildren } from 'react';
import { Layout as AntLayout, theme } from 'antd';
import {
  PlusOutlined,
  CalendarOutlined,
  DollarOutlined,
  UnorderedListOutlined,
  PieChartOutlined,
  GithubOutlined,
} from '@ant-design/icons';
import ThemeSwitcher from './ThemeSwitcher';
import {
  CreateButton,
  StyledMobileFooterButton,
  StyledMobileFooter,
  StyledHeader,
  StyledLayout,
  StyledMenu,
  StyledGithubLink,
} from './Layout.styled';
import { useThemeContext } from './AntConfigProvider';
import { Theme } from '../../hooks/useTheme';
import { Logo } from './Logo';
import { useLocation } from 'react-router-dom';
import { ROUTES } from '../../router/routes';

const { useToken } = theme;
const { Content } = AntLayout;

const hideNavigationRoutes = [ROUTES.LOGIN, ROUTES.SIGNUP];

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const { toggleTheme, currentTheme } = useThemeContext();
  const { token } = useToken();
  const location = useLocation();
  const hideNavigation = hideNavigationRoutes.includes(location.pathname);

  return (
    <StyledLayout>
      <Logo />
      <StyledHeader $token={token} $theme={currentTheme}>
        {!hideNavigation && (
          <StyledMenu
            items={[
              {
                key: 'subs',
                label: 'Subscriptions',
                icon: <UnorderedListOutlined />,
              },
              {
                key: 'past',
                label: 'Past Payments',
                icon: <DollarOutlined />,
              },
              {
                key: 'next',
                label: 'Next Payments',
                icon: <CalendarOutlined />,
              },
              { key: 'stats', label: 'Statistic', icon: <PieChartOutlined /> },
            ]}
            theme={currentTheme === Theme.Dark ? 'dark' : 'light'}
            mode="horizontal"
          />
        )}

        <StyledGithubLink
          href="https://github.com/loburets/SubControl"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GithubOutlined style={{ fontSize: '20px', marginRight: '8px' }} />
          loburets
        </StyledGithubLink>
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
      {!hideNavigation && (
        <StyledMobileFooter $token={token} $theme={currentTheme}>
          <StyledMobileFooterButton
            $token={token}
            type="text"
            icon={<UnorderedListOutlined />}
          >
            Subs
          </StyledMobileFooterButton>
          <StyledMobileFooterButton
            $token={token}
            type="link"
            icon={<DollarOutlined />}
          >
            Past
          </StyledMobileFooterButton>
          <CreateButton
            type="primary"
            shape="circle"
            icon={<PlusOutlined />}
            size="large"
          />
          <StyledMobileFooterButton
            $token={token}
            type="text"
            icon={<CalendarOutlined />}
          >
            Next
          </StyledMobileFooterButton>
          <StyledMobileFooterButton
            $token={token}
            type="text"
            icon={<PieChartOutlined />}
          >
            Stats
          </StyledMobileFooterButton>
        </StyledMobileFooter>
      )}
    </StyledLayout>
  );
};

export default Layout;
