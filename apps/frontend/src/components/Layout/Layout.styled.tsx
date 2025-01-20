import styled from 'styled-components';
import { Button, GlobalToken, Layout } from 'antd';

const { Header, Footer, Content } = Layout;

export const StyledHeader = styled(Header)<{ $token: GlobalToken }>`
  background-color: ${({ $token }) => $token.colorBgBase};
  //padding: 0 16px;
  //color: white;

  //.ant-btn-link {
  //  color: white;
  //}

  @media (max-width: 768px) {
    display: none;
  }
`;

export const StyledFooter = styled(Footer)`
  display: none;
  background-color: #fff;
  border-top: 1px solid #f0f0f0;
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 1000;

  @media (max-width: 768px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export const StyledContent = styled(Content)`
  //padding: 16px;
`;

export const CreateButton = styled(Button)`
  //transform: translateY(-25%);
  //box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;
