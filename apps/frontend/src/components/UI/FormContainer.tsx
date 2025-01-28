import styled from 'styled-components';
import { GlobalToken, theme } from 'antd';
import React, { PropsWithChildren } from 'react';

const { useToken } = theme;

const FormContainerStyled = styled.div<{
  $token: GlobalToken;
}>`
  //increase input sizes on mobile
  @media (max-width: ${({ $token }) => $token.screenSMMax}px) {
    & input {
      padding: 8px 11px !important;
    }
    & .ant-picker input {
      padding: 4px 0 !important;
    }
    & .ant-select-selector {
      height: 40px !important;
    }
    & .ant-select-arrow {
      margin-top: -2px;
    }
  }
`;

export const FormContainer: React.FC<PropsWithChildren> = ({ children }) => {
  const { token } = useToken();

  return <FormContainerStyled $token={token}>{children}</FormContainerStyled>;
};
