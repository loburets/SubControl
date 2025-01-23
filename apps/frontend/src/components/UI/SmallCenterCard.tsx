import styled from 'styled-components';
import { Card, GlobalToken, theme } from 'antd';
import React, { PropsWithChildren } from 'react';
import { CenteredColStyled } from './CenteredColStyled';
const { useToken } = theme;

const SmallCenterCardStyled = styled(Card)<{
  $token: GlobalToken;
}>`
  width: 400px;

  // mobile version
  @media (max-width: ${({ $token }) => $token.screenSMMax}px) {
    width: 100%;
    max-width: 400px;
  }
`;

export const SmallCenterCard: React.FC<PropsWithChildren> = ({ children }) => {
  const { token } = useToken();

  return (
    <CenteredColStyled span={22}>
      <SmallCenterCardStyled $token={token}>{children}</SmallCenterCardStyled>
    </CenteredColStyled>
  );
};
