import styled from 'styled-components';
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

  // right side on desktop
  @media (min-width: ${({ $token }) => $token.screenMDMin}px) {
    position: absolute;
    right: 0;
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
