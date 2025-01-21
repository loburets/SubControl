import styled from 'styled-components';
import { Button, GlobalToken, Layout, Menu } from 'antd';
import { Theme } from '../../hooks/useTheme';
import { HeatMapOutlined } from '@ant-design/icons';

const { Header, Footer } = Layout;
const miniHeaderMaxWidth = 930;

export const StyledLayout = styled(Layout)`
  min-height: 100vh;
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

  @media (min-width: ${({ $token }) => $token.screenMDMin}px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media (max-width: ${miniHeaderMaxWidth}px) {
    & li {
      font-size: 14px;
      padding: 0px 8px !important;
    }
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

export const StyledLogo = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  line-height: 20px;
  position: absolute;
  left: 10px;
  padding: 14px;

  @media (max-width: ${miniHeaderMaxWidth}px) {
    font-size: 16px;
    left: 4px;
    padding: 10px;
  }
`;

export const StyledHeatMapOutlined = styled(HeatMapOutlined)`
  margin-right: 8px;
  font-size: 24px;

  @media (max-width: ${miniHeaderMaxWidth}px) {
    font-size: 20px;
    margin-right: 6px;
  }
`;

export const StyledGithubLink = styled.a`
  display: flex;
  align-items: center;
  position: absolute;
  right: 24px;

  @media (max-width: ${miniHeaderMaxWidth}px) {
    font-size: 14px;
    right: 16px;
  }
`;
