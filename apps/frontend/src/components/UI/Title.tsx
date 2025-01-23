import styled from 'styled-components';
import { GlobalToken, theme, Typography } from 'antd';
import React from 'react';
import { TitleProps } from 'antd/es/typography/Title';
import { extraSmallMobileFooterMaxWidth } from '../Layout/Layout.styled';
const { useToken } = theme;

const { Title: AntTitle } = Typography;

const getFontSize = (
  level: number | undefined,
  token: GlobalToken,
  reducer: number
) => {
  const resultingLevel = (level || 1) + reducer;

  switch (resultingLevel) {
    case 1:
      return token.fontSizeHeading1;
    case 2:
      return token.fontSizeHeading2;
    case 3:
      return token.fontSizeHeading3;
    case 4:
      return token.fontSizeHeading4;
    case 5:
      return token.fontSizeHeading5;
    default:
      return token.fontSizeHeading1;
  }
};

const TitleStyled = styled(AntTitle)<{
  $token: GlobalToken;
  level?: number | undefined;
}>`
  margin-top: 0 !important;
  margin-bottom: 24px !important;

  //mobile
  @media (max-width: ${({ $token }) => $token.screenSMMax}px) {
    font-size: ${({ $token, level }) =>
      getFontSize(level, $token, 1)}px !important;
    margin-bottom: 20px !important;
  }

  @media (max-width: ${extraSmallMobileFooterMaxWidth}px) {
    font-size: ${({ $token, level }) =>
      getFontSize(level, $token, 3)}px !important;
    margin-bottom: 12px !important;
  }
`;

export const Title: React.FC<TitleProps> = ({ children, ...rest }) => {
  const { token } = useToken();

  return (
    <TitleStyled $token={token} {...rest}>
      {children}
    </TitleStyled>
  );
};
