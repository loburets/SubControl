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
    & input[type='password'] {
      padding: 5px 0px !important;
    }
    & .ant-picker input {
      padding: 5px 0 !important;
    }
    & .ant-select {
      height: 42px !important;
    }
    & .ant-select-selector {
      height: 42px !important;
    }
    & .ant-select-arrow {
      margin-top: -2px;
    }
    & .ant-checkbox {
      transform: scale(1.5);
      margin: 4px;
    }
    & .ant-radio-button-wrapper {
      height: 42px;
      margin: 0;
      padding-inline: 16px;
      padding-block: 5px;
    }
  }
`;

export const FormContainer: React.FC<PropsWithChildren> = ({ children }) => {
  const { token } = useToken();

  return <FormContainerStyled $token={token}>{children}</FormContainerStyled>;
};
