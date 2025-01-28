import React, { PropsWithChildren } from 'react';
import { GlobalToken, theme } from 'antd';
import styled from 'styled-components';
import { extraSmallMobileFooterMaxWidth } from './Layout.styled';

const { useToken } = theme;

const ContainerForCenteredStyled = styled.div<{
  $token: GlobalToken;
}>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ $token }) => $token.paddingContentHorizontal}px;
  min-height: 100vh;

  // desktop
  // reserve some approximate space for header/footer and not precise to simplify implementation
  @media (min-width: ${({ $token }) => $token.screenMDMin}px) {
    min-height: 90vh;
  }

  @media (max-width: ${extraSmallMobileFooterMaxWidth}px) {
    padding-top: 40px;
    padding-bottom: 8px;
  }
`;

export const ContainerForCentered: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const { token } = useToken();

  return (
    <ContainerForCenteredStyled $token={token}>
      {children}
    </ContainerForCenteredStyled>
  );
};
