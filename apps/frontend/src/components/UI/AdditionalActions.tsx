import { Divider, GlobalToken, Row, Space, theme } from 'antd';
import React from 'react';
import { Button } from './Button';
import {
  GithubOutlined,
  LogoutOutlined,
  MailOutlined,
} from '@ant-design/icons';
import styled from 'styled-components';
import { useLogout } from '../../hooks/useLogout';

export const AdditionalActions: React.FC = () => {
  const handleLogout = useLogout();
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
