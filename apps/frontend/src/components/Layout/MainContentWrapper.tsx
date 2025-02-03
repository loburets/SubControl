import styled from 'styled-components';
import { GlobalToken, theme } from 'antd';
import { PropsWithChildren, useEffect, useState } from 'react';
import { extraSmallMobileFooterMaxWidth } from './Layout.styled';
import { LogoutOutlined } from '@ant-design/icons';
import { useLogout } from '../../hooks/useLogout';
import { Button } from '../UI/Button';

const { useToken } = theme;

const StyledMainContentWrapper = styled.div<{
  $token: GlobalToken;
}>`
  background: ${({ $token }) => $token.colorBgBase};
  width: 1000px;
  padding: 16px 28px;
  padding-bottom: 40px;
  min-height: calc(100vh - 64px);

  @media (max-width: ${({ $token }) => $token.screenLGMax}px) {
    width: 100%;
  }

  //mobile
  @media (max-width: ${({ $token }) => $token.screenSMMax}px) {
    margin-top: 60px;
    padding: 12px 16px;
    padding-bottom: 100px;
    width: 100%;
  }

  @media (max-width: ${extraSmallMobileFooterMaxWidth}px) {
    margin-top: 38px;
    padding: 8px 12px;
    padding-bottom: 80px;
  }
`;

const StyledDemoButton = styled(Button)<{
  $token: GlobalToken;
}>`
  padding: 12px 24px;
  height: auto;
  position: fixed;

  border-radius: 6px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.35);

  // desktop
  @media (min-width: ${({ $token }) => $token.screenMDMin}px) {
    bottom: 20px;
    right: 20px;
  }

  //mobile
  @media (max-width: ${({ $token }) => $token.screenSMMax}px) {
    bottom: 92px;
    right: 8px;
    padding: 10px 8px;
  }

  @media (max-width: ${extraSmallMobileFooterMaxWidth}px) {
    bottom: 64px;
    right: 8px;
    padding: 8px 4px;
  }
`;

export const MainContentWrapper: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const { token } = useToken();
  const [isDemo, setIsDemo] = useState(false);

  useEffect(() => {
    setIsDemo(!!localStorage.getItem('demo'));
  }, []);

  const handleLogout = useLogout();
  const handleQuitDemo = () => {
    localStorage.removeItem('demo');
    handleLogout();
  };

  return (
    <StyledMainContentWrapper $token={token}>
      {children}
      {isDemo && (
        <StyledDemoButton
          onClick={handleQuitDemo}
          type="primary"
          icon={<LogoutOutlined />}
          $token={token}
        >
          Exit Demo
        </StyledDemoButton>
      )}
    </StyledMainContentWrapper>
  );
};
