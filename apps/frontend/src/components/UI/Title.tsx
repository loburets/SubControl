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
      return token.fontSizeHeading5 - 4;
  }
};

const TitleStyled = styled(AntTitle)<{
  $token: GlobalToken;
  level?: number | undefined;
  $embedMargins?: boolean;
  $noAdoptation?: boolean;
  $desktopOnly?: boolean;
  $mobileOnly?: boolean;
  $isLink?: boolean;
}>`
  text-overflow: ellipsis;
  overflow: hidden;

  margin-top: 0 !important;
  margin-bottom: 24px !important;
  ${({ $embedMargins }) => $embedMargins && 'margin-top: 12px !important;'}
  ${({ $embedMargins }) => $embedMargins && 'margin-bottom: 12px !important;'}

  ${({ $desktopOnly, $token }) => $desktopOnly && `display: none;`}
  ${({ $mobileOnly, $token }) => $mobileOnly && `display: none;`}

  @media (min-width: ${({ $token }) => $token.screenMDMin}px) {
    ${({ $desktopOnly }) => $desktopOnly && `display: block;`}
  }

  @media (max-width: ${({ $token }) => $token.screenSMMax}px) {
    ${({ $mobileOnly }) => $mobileOnly && `display: block;`}
  }

  //mobile
  @media (max-width: ${({ $token }) => $token.screenSMMax}px) {
    font-size: ${({ $token, level, $noAdoptation }) =>
      getFontSize(level, $token, $noAdoptation ? 0 : 1)}px !important;
    margin-bottom: 20px !important;
    ${({ $embedMargins }) => $embedMargins && 'margin-top: 12px !important;'}
    ${({ $embedMargins }) => $embedMargins && 'margin-bottom: 12px !important;'}
  }

  @media (max-width: ${extraSmallMobileFooterMaxWidth}px) {
    font-size: ${({ $token, level, $noAdoptation }) =>
      getFontSize(level, $token, $noAdoptation ? 0 : 3)}px !important;
    margin-bottom: 12px !important;
    ${({ $embedMargins }) => $embedMargins && 'margin-top: 12px !important;'}
    ${({ $embedMargins }) => $embedMargins && 'margin-bottom: 12px !important;'}
  }

  ${({ $isLink }) => $isLink && `cursor: pointer;`}

  &:hover {
    ${({ $token, $isLink }) =>
      $isLink ? `color: :${$token.colorLinkHover}` : ''};
  }

  // back arrow
  & svg {
    width: 80%;
    margin-right: 4px;
  }
`;

export const Title: React.FC<
  TitleProps & {
    embedMargins?: boolean;
    noAdoptation?: boolean;
    mobileOnly?: boolean;
    desktopOnly?: boolean;
    isLink?: boolean;
  }
> = ({
  children,
  embedMargins,
  noAdoptation,
  mobileOnly,
  desktopOnly,
  isLink,
  ...rest
}) => {
  const { token } = useToken();

  return (
    <TitleStyled
      $token={token}
      {...rest}
      $embedMargins={embedMargins}
      $noAdoptation={noAdoptation}
      $desktopOnly={desktopOnly}
      $mobileOnly={mobileOnly}
      $isLink={isLink}
    >
      {children}
    </TitleStyled>
  );
};
