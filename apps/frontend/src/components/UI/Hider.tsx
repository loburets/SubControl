import styled from 'styled-components';
import { GlobalToken, theme } from 'antd';
import React, { PropsWithChildren } from 'react';

const { useToken } = theme;

const HiderStyled = styled.div<{
  $token: GlobalToken;
  $desktopOnly?: boolean;
  $mobileOnly?: boolean;
}>`
  ${({ $desktopOnly, $token }) => $desktopOnly && `display: none;`}
  ${({ $mobileOnly, $token }) => $mobileOnly && `display: none;`}

  @media (min-width: ${({ $token }) => $token.screenMDMin}px) {
    ${({ $desktopOnly }) => $desktopOnly && `display: block;`}
  }

  @media (max-width: ${({ $token }) => $token.screenSMMax}px) {
    ${({ $mobileOnly }) => $mobileOnly && `display: block;`}
  }
`;

export const Hider: React.FC<
  PropsWithChildren & {
    mobileOnly?: boolean;
    desktopOnly?: boolean;
  }
> = ({ children, mobileOnly, desktopOnly, ...rest }) => {
  const { token } = useToken();

  return (
    <HiderStyled
      $token={token}
      $desktopOnly={desktopOnly}
      $mobileOnly={mobileOnly}
      {...rest}
    >
      {children}
    </HiderStyled>
  );
};
