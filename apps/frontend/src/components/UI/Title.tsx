import styled from 'styled-components';
import { GlobalToken, theme, Typography } from 'antd';
import React from 'react';
import { TitleProps } from 'antd/es/typography/Title';
const { useToken } = theme;

const { Title: AntTitle } = Typography;

const TitleStyled = styled(AntTitle)<{
  $token: GlobalToken;
}>`
  margin-top: 0 !important;
  margin-bottom: 24px !important;
`;

export const Title: React.FC<TitleProps> = ({ children }) => {
  const { token } = useToken();

  return <TitleStyled $token={token}>{children}</TitleStyled>;
};
