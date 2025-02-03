import React, { useEffect } from 'react';
import { Row, Skeleton, Space } from 'antd';
import { SmallContentCard } from '../components/UI/SmallContentCard';
import { ContainerForCentered } from '../components/Layout/ContainerForCentered';
import { StyledAlert, StyledTitle } from '../components/UI/AuthElementsStyled';
import { useDemo } from '../hooks/useDemo';
import { getErrorMessages } from '../utils/errorConvertor';
import { useAuthStore } from '../store/auth.store';
import { useLogout } from '../hooks/useLogout';
import { Button } from '../components/UI/Button';
import { LogoutOutlined, HomeOutlined } from '@ant-design/icons';
import { ROUTES } from '../router/routes';
import { useNavigate } from 'react-router';
import { TextBlock } from '../components/UI/TextBlock';

const Login: React.FC = () => {
  const token = useAuthStore((state) => state.token);
  const { demoError, isDemoLoading, startDemo } = useDemo();
  const handleLogout = useLogout();
  const navigate = useNavigate();

  useEffect(() => {
    if (demoError || isDemoLoading || token) {
      return;
    }

    startDemo();
  }, [startDemo, demoError, isDemoLoading, token]);

  return (
    <ContainerForCentered>
      <SmallContentCard>
        <StyledTitle level={3}>
          {isDemoLoading ? 'Starting demo...' : 'Demo'}
        </StyledTitle>
        {demoError && (
          <StyledAlert
            message={getErrorMessages(demoError)}
            type="error"
            showIcon
          />
        )}
        {token && (
          <>
            <StyledAlert
              message="You are already logged in!"
              type="info"
              showIcon
            />
            <TextBlock style={{ textAlign: 'center', marginBottom: 32 }}>
              Please log out if you want to to start the demo.
            </TextBlock>
            <Row justify="center">
              <Space size="middle" wrap>
                <Button onClick={handleLogout} icon={<LogoutOutlined />}>
                  Logout
                </Button>
                <Button
                  onClick={() => navigate(ROUTES.HOME)}
                  icon={<HomeOutlined />}
                >
                  Main page
                </Button>
              </Space>
            </Row>
          </>
        )}
        {isDemoLoading && <Skeleton />}
      </SmallContentCard>
    </ContainerForCentered>
  );
};

export default Login;
