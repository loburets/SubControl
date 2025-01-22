import React, { PropsWithChildren } from 'react';
import { GlobalToken, Row, theme } from 'antd';
import styled from 'styled-components';
import { extraSmallMobileFooterMaxWidth } from './Layout.styled';

const { useToken } = theme;

const CenteredRowStyled = styled(Row)<{
  $token: GlobalToken;
}>`
  // reserve some approximate space for header or footer, not precise to simplify implementation
  min-height: 85vh;

  @media (max-width: ${extraSmallMobileFooterMaxWidth}px) {
    min-height: 80vh;
  }

  @media (min-width: ${({ $token }) => $token.screenMDMin}px) {
    min-height: 92vh;
  }
`;

export const CenteredRow: React.FC<PropsWithChildren> = ({ children }) => {
  const { token } = useToken();

  return (
    <CenteredRowStyled justify="center" align="middle" $token={token}>
      {children}
    </CenteredRowStyled>
  );
};
