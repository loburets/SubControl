import styled from 'styled-components';
import { GlobalToken, theme, Button as AntButton, ButtonProps } from 'antd';
import React from 'react';

const { useToken } = theme;

const ButtonStyled = styled(AntButton)<{
  $token: GlobalToken;
}>`
  //mobile
  @media (max-width: ${({ $token }) => $token.screenSMMax}px) {
    height: 42px;
    padding: 0 16px;
  }
`;

export const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {
  const { token } = useToken();

  return (
    <ButtonStyled $token={token} {...rest}>
      {children}
    </ButtonStyled>
  );
};
