import styled from 'styled-components';
import { GlobalToken, theme, Typography } from 'antd';
import React from 'react';
import { TextProps } from 'antd/es/typography/Text';

const { useToken } = theme;
const { Text: AntText } = Typography;

const TextStyled = styled(AntText)<{
  $token: GlobalToken;
}>`
  font-size: 18px;
  font-weight: bold;

  //mobile
  @media (max-width: ${({ $token }) => $token.screenSMMax}px) {
    font-size: 16px;
  }
`;

export const Price: React.FC<TextProps> = ({ children, ...rest }) => {
  const { token } = useToken();

  return (
    <TextStyled $token={token} {...rest}>
      {children}
    </TextStyled>
  );
};
