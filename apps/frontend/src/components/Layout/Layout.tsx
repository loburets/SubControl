import React, { PropsWithChildren } from 'react';
import { theme } from 'antd';
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
  StyledContent,
} from './Layout.styled';
import { Logo } from './Logo';
import { useLocation } from 'react-router';
import { ROUTES } from '../../router/routes';
import { Theme, useThemeSwitcherStore } from '../../store/themeSwitcher.store';

const { useToken } = theme;

const hideNavigationRoutes = [ROUTES.LOGIN, ROUTES.SIGNUP];

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const currentTheme = useThemeSwitcherStore((state) => state.currentTheme);
  const { token } = useToken();
  const location = useLocation();
  const hideNavigation = hideNavigationRoutes.includes(location.pathname);

  return (
    <StyledLayout>
      <Logo mobileOnly />
      <StyledHeader $token={token} $theme={currentTheme}>
        <Logo />
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
      <StyledContent>
        <ThemeSwitcher />
        {children}
      </StyledContent>

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
