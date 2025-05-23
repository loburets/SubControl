import styled from 'styled-components';
import { Button, GlobalToken, Layout, Menu } from 'antd';
import { Theme } from '../../store/themeSwitcher.store';

const { Header, Footer } = Layout;
export const smallDesktopHeaderMaxWidth = 930;
export const extraSmallMobileFooterMaxWidth = 370;

export const StyledLayout = styled(Layout)`
  min-height: 100vh;
`;

export const StyledContent = styled(Layout)`
  display: flex;
  align-items: center;
`;

export const StyledMenu = styled(Menu)`
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

  // desktop
  @media (min-width: ${({ $token }) => $token.screenMDMin}px) {
    display: flex;
    justify-content: center;
    align-items: center;

    position: sticky;
    top: 0;
    width: 100%;
    z-index: 10;
  }

  @media (max-width: ${smallDesktopHeaderMaxWidth}px) {
    & li {
      font-size: 14px;
      padding: 0px 8px !important;
    }
  }
`;

export const StyledMobileFooter = styled(Footer)<{
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
  padding: 8px 12px;
  z-index: 10;

  //mobile
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

export const StyledMobileFooterButton = styled(Button)<{
  $token: GlobalToken;
  $active: boolean;
}>`
  font-size: ${({ $token }) => $token.fontSize + 2}px;
  font-size: 18px;
  padding: 32px 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  color: ${({ $token, $active }) =>
    $active ? $token.colorPrimaryText : $token.colorTextBase} !important;

  &:hover {
    background: none !important;
  }

  @media (max-width: ${extraSmallMobileFooterMaxWidth}px) {
    padding: 16px 8px;
    font-size: 16px;
    gap: 2px;
  }
`;

export const StyledGithubLink = styled.a`
  display: flex;
  align-items: center;
  position: absolute;
  right: 24px;

  @media (max-width: ${smallDesktopHeaderMaxWidth}px) {
    font-size: 14px;
    right: 16px;
  }
`;

export const WarningContainer = styled.div<{
  $token: GlobalToken;
}>`
  max-width: 420px;
`;
