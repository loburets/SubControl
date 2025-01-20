import styled from 'styled-components';
import { Button, GlobalToken, Layout } from 'antd';
import { Theme } from '../../hooks/useTheme';

const { Header, Footer, Content } = Layout;

export const StyledLayout = styled(Layout)<{ $token: GlobalToken }>`
  //background-color: ${({ $token }) => $token.colorBgLayout};
  min-height: 100vh;
`;

export const StyledHeader = styled(Header)<{
  $token: GlobalToken;
  $theme: Theme;
}>`
  display: none;
  background-color: ${({ $token, $theme }) =>
    $theme === Theme.Light ? $token.colorBgBase : $token.colorBgElevated};

  @media (min-width: ${({ $token }) => $token.screenMDMin}px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const StyledFooter = styled(Footer)<{ $token: GlobalToken }>`
  display: none;
  background-color: #fff;
  border-top: 1px solid #f0f0f0;
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 1000;

  @media (max-width: ${({ $token }) => $token.screenSMMax}px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export const StyledContent = styled(Content)``;

export const CreateButton = styled(Button)``;

export const StyledMenuButton = styled(Button)`
  margin-right: 16px;
`;
