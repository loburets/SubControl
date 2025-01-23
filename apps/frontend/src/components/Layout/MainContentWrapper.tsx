import styled from 'styled-components';
import { GlobalToken, theme } from 'antd';
import { PropsWithChildren } from 'react';
import { extraSmallMobileFooterMaxWidth } from './Layout.styled';

const { useToken } = theme;

const StyledMainContentWrapper = styled.div<{
  $token: GlobalToken;
}>`
  background: ${({ $token }) => $token.colorBgBase};
  max-width: 1000px;
  padding: 16px 28px;

  @media (max-width: ${({ $token }) => $token.screenLGMax}px) {
    max-width: 900px;
  }

  @media (max-width: ${({ $token }) => $token.screenMDMax}px) {
    max-width: 900px;
  }

  @media (max-width: 1100px) {
    max-width: 800px;
  }

  @media (max-width: 1000px) {
    max-width: 700px;
  }

  @media (max-width: 900px) {
    max-width: 590px;
  }

  //mobile
  @media (max-width: ${({ $token }) => $token.screenSMMax}px) {
    margin-top: 60px;
    padding: 12px 16px;
  }

  @media (max-width: ${extraSmallMobileFooterMaxWidth}px) {
    margin-top: 38px;
    padding: 8px 12px;
  }
`;

export const MainContentWrapper: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const { token } = useToken();

  return (
    <StyledMainContentWrapper $token={token}>
      {children}
    </StyledMainContentWrapper>
  );
};
