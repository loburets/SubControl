import styled from 'styled-components';
import { GlobalToken, theme, Typography } from 'antd';
import React from 'react';
import { TextProps } from 'antd/es/typography/Text';

const { useToken } = theme;
const { Text } = Typography;

const TextStyled = styled(Text)<{
  $token: GlobalToken;
}>`
  display: inline-block;
  margin-bottom: 12px;
  font-size: ${({ $token }) => $token.fontSizeLG}px;

  //mobile
  @media (max-width: ${({ $token }) => $token.screenSMMax}px) {
  }
`;

export const TextBlock: React.FC<TextProps> = ({ children, ...rest }) => {
  const { token } = useToken();

  return (
    <TextStyled $token={token} {...rest}>
      {children}
    </TextStyled>
  );
};
