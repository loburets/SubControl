import styled from 'styled-components';
import { GlobalToken, Switch } from 'antd';
import { Theme } from '../../hooks/useTheme';

export const SwitchContainer = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  margin: 16px 24px;
`;

export const StyledSwitch = styled(Switch)<{
  $token: GlobalToken;
  $currentTheme: Theme;
}>`
  &.ant-switch-checked {
    background-color: ${({ $token, $currentTheme }) =>
      $currentTheme === Theme.Dark
        ? $token.colorBgSpotlight
        : $token.colorInfoBg};
  }
  transform: scale(1.2);
`;
