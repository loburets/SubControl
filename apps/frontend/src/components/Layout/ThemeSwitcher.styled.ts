import styled, { createGlobalStyle } from 'styled-components';
import { GlobalToken, Switch } from 'antd';
import { Theme } from '../../store/themeSwitcher.store';
import { extraSmallMobileFooterMaxWidth } from './Layout.styled';

export const SwitchContainer = styled.div<{
  $token: GlobalToken;
}>`
  display: flex;
  justify-content: end;
  align-items: center;
  margin: 16px 24px;
  position: fixed;
  right: 0;
  top: 68px;
  z-index: 20;

  // on small desktop switcher is just near the page title in the main content
  @media (max-width: ${({ $token }) => $token.screenLGMax}px) {
    position: absolute;
    z-index: 5;
  }

  //mobile
  @media (max-width: ${({ $token }) => $token.screenSMMax}px) {
    position: absolute;
    right: 0;
    top: 0;
  }

  @media (max-width: ${extraSmallMobileFooterMaxWidth}px) {
    margin: 6px 12px;
  }
`;

export const StyledSwitch = styled(Switch)<{
  $token: GlobalToken;
  $currentTheme: Theme;
}>`
  &.ant-switch-checked {
    background-color: ${({ $token, $currentTheme }) =>
      $currentTheme === Theme.Dark ? $token.colorBgSpotlight : 'none'};
  }
  transform: scale(1.2);

  @media (max-width: ${extraSmallMobileFooterMaxWidth}px) {
    transform: scale(1);
  }
`;

export const ThemeSwitcherGlobalStyles = createGlobalStyle<{
  $token: GlobalToken;
  $currentTheme: Theme;
}>`
  body {
    background: ${({ $currentTheme, $token }) => ($currentTheme === Theme.Dark ? $token.colorBgContainer : $token.colorBgBase)};

    //mobile
    @media (max-width: ${({ $token }) => $token.screenSMMax}px) {
      background: ${({ $currentTheme, $token }) => ($currentTheme === Theme.Dark ? $token.colorBgBase : $token.colorBgLayout)};
    }
  }
`;
