import React from 'react';
import { Row, Space } from 'antd';
import { SmallContentCard } from '../components/UI/SmallContentCard';
import { ContainerForCentered } from '../components/Layout/ContainerForCentered';
import { StyledAlert, StyledTitle } from '../components/UI/AuthElementsStyled';
import { Button } from '../components/UI/Button';
import { HomeOutlined } from '@ant-design/icons';
import { ROUTES } from '../router/routes';
import { useNavigate } from 'react-router';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <ContainerForCentered>
      <SmallContentCard>
        <StyledTitle level={3}>Page not found</StyledTitle>
        <StyledAlert
          message="Probably you visited wrong link!"
          type="warning"
          showIcon
        />
        <Row justify="center">
          <Space size="middle" wrap>
            <Button
              onClick={() => navigate(ROUTES.HOME)}
              icon={<HomeOutlined />}
            >
              Main page
            </Button>
          </Space>
        </Row>
      </SmallContentCard>
    </ContainerForCentered>
  );
};

export default NotFound;
