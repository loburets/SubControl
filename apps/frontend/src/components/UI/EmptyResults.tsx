import styled from 'styled-components';
import { Empty, GlobalToken, theme } from 'antd';
import React from 'react';
import { Button } from './Button';
import { ROUTES } from '../../router/routes';
import { useNavigate } from 'react-router';
import { extraSmallMobileFooterMaxWidth } from '../Layout/Layout.styled';

const { useToken } = theme;

const ContainerStyled = styled.div<{
  $token: GlobalToken;
}>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: calc(100vh - 440px);

  @media (min-width: ${({ $token }) => $token.screenMDMin}px) {
    max-height: 700px;
  }

  & div {
    font-size: ${({ $token }) => $token.fontSizeLG}px;
  }

  //mobile
  @media (max-width: ${({ $token }) => $token.screenSMMax}px) {
    height: calc(100vh - 520px);

    & div {
      font-size: ${({ $token }) => $token.fontSizeXL}px;
    }
  }

  @media (max-width: ${extraSmallMobileFooterMaxWidth}px) {
    height: calc(100vh - 280px);

    & div {
      font-size: ${({ $token }) => $token.fontSizeLG}px;
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
  const navigate = useNavigate();

  const description = isSearch
    ? 'No results found.'
    : 'No subscriptions found. Add your first subscription to get started.';

  return (
    <ContainerStyled $token={token}>
      <Empty description={description}>
        {!isSearch && (
          <ButtonStyled
            $token={token}
            type="primary"
            onClick={() => navigate(ROUTES.SUBSCRIPTION_CREATE)}
          >
            Create new
          </ButtonStyled>
        )}
      </Empty>
    </ContainerStyled>
  );
};
