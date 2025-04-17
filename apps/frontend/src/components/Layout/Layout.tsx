import React, { PropsWithChildren } from 'react';
import { Alert, GlobalToken, theme } from 'antd';
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
  WarningContainer,
} from './Layout.styled';
import { Logo } from './Logo';
import { useLocation, useNavigate } from 'react-router';
import { ROUTES } from '../../router/routes';
import { Theme, useThemeSwitcherStore } from '../../store/themeSwitcher.store';
import { ContainerForCentered } from './ContainerForCentered';

const { useToken } = theme;

const hideNavigationRoutes = [ROUTES.LOGIN, ROUTES.SIGNUP];
const showDisabledWarning = true;

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const currentTheme = useThemeSwitcherStore((state) => state.currentTheme);
  const { token } = useToken();
  const location = useLocation();
  const navigate = useNavigate();
  const goTo = (path: string) => {
    navigate(path);
    window.scrollTo(0, 0);
  };
  const hideNavigation = hideNavigationRoutes.includes(location.pathname);

  return (
    <StyledLayout>
      <Logo mobileOnly />
      <StyledHeader $token={token} $theme={currentTheme}>
        <Logo />
        {!hideNavigation && (
          <StyledMenu
            selectedKeys={[location.pathname]}
            items={[
              {
                key: ROUTES.HOME,
                label: 'Subscriptions',
                icon: <UnorderedListOutlined />,
                onClick: () => goTo(ROUTES.HOME),
              },
              {
                key: ROUTES.PAST_PAYMENTS,
                label: 'Past Payments',
                icon: <DollarOutlined />,
                onClick: () => goTo(ROUTES.PAST_PAYMENTS),
              },
              {
                key: ROUTES.NEXT_PAYMENTS,
                label: 'Next Payments',
                icon: <CalendarOutlined />,
                onClick: () => goTo(ROUTES.NEXT_PAYMENTS),
              },
              {
                key: ROUTES.STATISTICS,
                label: 'Statistic',
                icon: <PieChartOutlined />,
                onClick: () => goTo(ROUTES.STATISTICS),
              },
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
        {showDisabledWarning ? renderDisabledWarning(token) : children}
      </StyledContent>

      {/* Footer for Mobile Navigation */}
      {!hideNavigation && (
        <StyledMobileFooter $token={token} $theme={currentTheme}>
          <StyledMobileFooterButton
            $token={token}
            $active={location.pathname === ROUTES.HOME}
            onClick={() => goTo(ROUTES.HOME)}
            type="text"
            icon={<UnorderedListOutlined />}
          >
            Subs
          </StyledMobileFooterButton>
          <StyledMobileFooterButton
            $token={token}
            $active={location.pathname === ROUTES.PAST_PAYMENTS}
            onClick={() => goTo(ROUTES.PAST_PAYMENTS)}
            type="text"
            icon={<DollarOutlined />}
          >
            Past
          </StyledMobileFooterButton>
          <CreateButton
            type="primary"
            shape="circle"
            icon={<PlusOutlined />}
            onClick={() => goTo(ROUTES.SUBSCRIPTION_CREATE)}
            size="large"
          />
          <StyledMobileFooterButton
            $token={token}
            $active={location.pathname === ROUTES.NEXT_PAYMENTS}
            onClick={() => goTo(ROUTES.NEXT_PAYMENTS)}
            type="text"
            icon={<CalendarOutlined />}
          >
            Next
          </StyledMobileFooterButton>
          <StyledMobileFooterButton
            $token={token}
            $active={location.pathname === ROUTES.STATISTICS}
            onClick={() => goTo(ROUTES.STATISTICS)}
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

function renderDisabledWarning(token: GlobalToken) {
  return (
    <ContainerForCentered>
      <WarningContainer $token={token}>
        <Alert
          message="⚠️ Project Temporarily Disabled"
          description={
            <div>
              This project’s database is currently turned off to save hosting
              costs while I’m not showcasing it. <br />
              <br />
              If you'd like to see it working, just drop me a message at{' '}
              <a
                href="mailto:dmitry.loburets@gmail.com'"
                target="_blank"
                rel="noreferrer"
              >
                dmitry.loburets@gmail.com
              </a>
              .
              <br />
              <br />
              You can also check out the code and screenshots on{' '}
              <a
                href="https://github.com/loburets/SubControl"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
              .
            </div>
          }
          type="error"
        />
      </WarningContainer>
    </ContainerForCentered>
  );
}
