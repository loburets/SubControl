import styled from 'styled-components';
import { Card, GlobalToken, theme } from 'antd';
import React, { PropsWithChildren } from 'react';
const { useToken } = theme;

const SizeWrapperStyled = styled.div<{
  $token: GlobalToken;
}>`
  width: 100%;
  max-width: 400px;
`;

export const SmallContentCard: React.FC<PropsWithChildren> = ({ children }) => {
  const { token } = useToken();

  return (
    <SizeWrapperStyled $token={token}>
      <Card>{children}</Card>
    </SizeWrapperStyled>
  );
};
