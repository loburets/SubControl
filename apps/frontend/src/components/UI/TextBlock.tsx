import styled from 'styled-components';
import { GlobalToken, theme, Typography } from 'antd';
import React from 'react';
import { TextProps } from 'antd/es/typography/Text';

const { useToken } = theme;
const { Text } = Typography;

interface TextStyledProps {
  $token: GlobalToken;
  $marginBottom?: number;
}

const TextStyled = styled(Text)<TextStyledProps>`
  display: inline-block;
  margin-bottom: ${props => props.$marginBottom !== undefined ? `${props.$marginBottom}px` : '12px'};
  font-size: ${({ $token }) => $token.fontSizeLG}px;

  //mobile
  @media (max-width: ${({ $token }) => $token.screenSMMax}px) {
  }
`;

interface TextBlockProps extends TextProps {
  marginBottom?: number;
}

export const TextBlock: React.FC<TextBlockProps> = ({ children, marginBottom, ...rest }) => {
  const { token } = useToken();

  return (
    <TextStyled $token={token} $marginBottom={marginBottom} {...rest}>
      {children}
    </TextStyled>
  );
};
