import styled from 'styled-components';
import { GlobalToken, Input, theme } from 'antd';
import React from 'react';

const { useToken } = theme;

const ContainerStyled = styled.div<{
  $token: GlobalToken;
}>`
  width: 300px;
  margin-bottom: 24px;

  //mobile
  @media (max-width: ${({ $token }) => $token.screenSMMax}px) {
    width: 100%;

    & input {
      padding: 8px 11px;
    }
  }
`;

export const Search: React.FC<{
  searchQuery: string;
  setSearchQuery: (searchQuery: string) => void;
}> = ({ searchQuery, setSearchQuery }) => {
  const { token } = useToken();

  return (
    <ContainerStyled $token={token}>
      <Input
        placeholder="Search subscriptions..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </ContainerStyled>
  );
};
