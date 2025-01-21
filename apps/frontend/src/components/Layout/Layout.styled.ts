import styled from 'styled-components';
import { Button, GlobalToken, Layout, Menu } from 'antd';
import { Theme } from '../../hooks/useTheme';

const { Header, Footer } = Layout;

export const StyledLayout = styled(Layout)`
  min-height: 100vh;
`;

export const StyledMenu = styled(Menu)<{
  $token: GlobalToken;
  $theme: Theme;
}>`
  /*  background-color: ${({ $token, $theme }) =>
    $theme === Theme.Light ? $token.colorBgBase : $token.colorBgBase};*/
  width: 100%;
  justify-content: center;
`;

export const StyledHeader = styled(Header)<{
  $token: GlobalToken;
  $theme: Theme;
}>`
  padding: 0;
  display: none;
  background-color: ${({ $token, $theme }) =>
    $theme === Theme.Light ? $token.colorBgBase : $token.colorBgBase};

  @media (min-width: ${({ $token }) => $token.screenMDMin}px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const StyledFooter = styled(Footer)<{
  $token: GlobalToken;
  $theme: Theme;
}>`
  display: none;
  background-color: ${({ $token }) => $token.colorBgContainer};
  border-top: 1px solid
    ${({ $token, $theme }) =>
      $theme === Theme.Dark
        ? $token.colorBgSpotlight
        : $token.colorBorderSecondary};
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 24px 12px;

  @media (max-width: ${({ $token }) => $token.screenSMMax}px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export const CreateButton = styled(Button)`
  transform: scale(1.3);
  margin: 0 8px;
`;

export const StyledBottomButton = styled(Button)<{ $token: GlobalToken }>`
  font-size: ${({ $token }) => $token.fontSize + 2}px;
  font-size: 18px;
  padding: 20px 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;
