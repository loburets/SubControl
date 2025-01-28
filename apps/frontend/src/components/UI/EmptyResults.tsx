import styled from 'styled-components';
import { Empty, GlobalToken, theme } from 'antd';
import React from 'react';
import { Button } from './Button';

const { useToken } = theme;

const ContainerStyled = styled.div<{
  $token: GlobalToken;
}>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 700px;
  max-height: 60vh;

  & div {
    font-size: ${({ $token }) => $token.fontSizeLG}px;
  }

  //mobile
  @media (max-width: ${({ $token }) => $token.screenSMMax}px) {
    height: calc(70vh - 100px);

    & div {
      font-size: ${({ $token }) => $token.fontSizeXL}px;
    }
  }
`;

const ButtonStyled = styled(Button)<{
  $token: GlobalToken;
}>`
  font-size: ${({ $token }) => $token.fontSizeLG}px;
  padding: 16px;

  @media (max-width: ${({ $token }) => $token.screenSMMax}px) {
    font-size: ${({ $token }) => $token.fontSizeXL}px;
    padding: 20px;
  }
`;

export const EmptyResults: React.FC<{ isSearch?: boolean }> = ({
  isSearch,
}) => {
  const { token } = useToken();
  const description = isSearch
    ? 'No results found.'
    : 'No subscriptions found. Add your first subscription to get started.';

  return (
    <ContainerStyled $token={token}>
      <Empty description={description}>
        {!isSearch && (
          <ButtonStyled $token={token} type="primary">
            Create new
          </ButtonStyled>
        )}
      </Empty>
    </ContainerStyled>
  );
};
