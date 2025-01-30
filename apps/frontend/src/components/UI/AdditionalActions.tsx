import { Divider, GlobalToken, Row, Space, theme } from 'antd';
import React from 'react';
import { Button } from './Button';
import { ROUTES } from '../../router/routes';
import { useNavigate } from 'react-router';
import {
  GithubOutlined,
  LogoutOutlined,
  MailOutlined,
} from '@ant-design/icons';
import { useAuthStore } from '../../store/auth.store';
import styled from 'styled-components';

export const AdditionalActions: React.FC = () => {
  const navigate = useNavigate();
  const clearToken = useAuthStore((state) => state.clearToken);
  const handleLogout = () => {
    clearToken();
    navigate(ROUTES.LOGIN);
  };
  const { token } = theme.useToken();

  return (
    <ContainerStyled $token={token}>
      <Divider style={{ marginTop: 40 }}>Additional actions</Divider>
      <Row justify="center">
        <Space size="middle" wrap>
          <Button
            onClick={() =>
              window.open('https://github.com/loburets/SubControl', '_blank')
            }
            icon={<GithubOutlined />}
          >
            Star on GitHub
          </Button>

          <Button
            onClick={() => window.open('mailto:dmitry.loburets@gmail.com')}
            icon={<MailOutlined />}
          >
            Contact
          </Button>

          <Button onClick={handleLogout} icon={<LogoutOutlined />}>
            Logout
          </Button>
        </Space>
      </Row>
    </ContainerStyled>
  );
};

const ContainerStyled = styled.div<{
  $token: GlobalToken;
}>`
  position: absolute;
  bottom: 0;
  width: 100%;
`;

export const FooterSpacer = styled.div<{
  $token: GlobalToken;
}>`
  position: relative;
  min-height: calc(100vh - 100px);
  padding-bottom: 184px;

  //mobile
  @media (max-width: ${({ $token }) => $token.screenSMMax}px) {
    min-height: calc(100vh - 173px);
  }
`;
