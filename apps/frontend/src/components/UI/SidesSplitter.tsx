import styled from 'styled-components';
import { GlobalToken, theme } from 'antd';
import React, { PropsWithChildren } from 'react';

const { useToken } = theme;

const SidesSplitterStyled = styled.span<{ $token: GlobalToken }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const SidesSplitter: React.FC<PropsWithChildren> = ({ children }) => {
  const { token } = useToken();

  return <SidesSplitterStyled $token={token}>{children}</SidesSplitterStyled>;
};
