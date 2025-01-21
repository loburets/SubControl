import styled from 'styled-components';
import { GlobalToken } from 'antd';
import { HeatMapOutlined } from '@ant-design/icons';
import { miniDesktopHeaderMaxWidth } from './Layout.styled';

export const StyledLogo = styled.div<{
  $token: GlobalToken;
}>`
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  line-height: 20px;
  position: absolute;
  top: 6px;
  left: 10px;
  padding: 14px;
  color: ${({ $token }) => $token.colorText};

  // mini version for small desktops
  @media (min-width: ${({ $token }) =>
      $token.screenMDMin}px) and (max-width: ${miniDesktopHeaderMaxWidth}px) {
    font-size: 16px;
    left: 4px;
    top: 12px;
    padding: 10px;
  }

  // mobile version
  @media (max-width: ${({ $token }) => $token.screenSMMax}px) {
    font-size: 24px;
    left: 4px;
    top: 0;
  }
`;

export const StyledLogoIcon = styled(HeatMapOutlined)<{
  $token: GlobalToken;
}>`
  margin-right: 8px;
  font-size: 24px;

  // mini version for small desktops
  @media (min-width: ${({ $token }) =>
      $token.screenMDMin}px) and (max-width: ${miniDesktopHeaderMaxWidth}px) {
    font-size: 20px;
    margin-right: 6px;
  }

  // mobile version
  @media (max-width: ${({ $token }) => $token.screenSMMax}px) {
    font-size: 28px;
  }
`;
