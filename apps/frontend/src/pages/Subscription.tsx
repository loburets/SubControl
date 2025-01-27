import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Alert, Button, Card, Tag, Space, Skeleton } from 'antd';
import {
  CalendarOutlined,
  CaretLeftOutlined,
  LeftOutlined,
} from '@ant-design/icons';
import { MainContentWrapper } from '../components/Layout/MainContentWrapper';
import { Title } from '../components/UI/Title';
import { ContainerForCentered } from '../components/Layout/ContainerForCentered';
import { useSubscription } from '../queries/subscriptions.query';
import { getErrorMessages } from '../utils/errorConvertor';
import { getSubscriptionUiData } from '../utils/subscriptionsHelper';
import { ROUTES } from '../router/routes';

const Subscription: React.FC = () => {
  const { subscriptionId } = useParams();
  const navigate = useNavigate();
  const {
    isLoading,
    data: subscription,
    error,
  } = useSubscription(Number(subscriptionId));
  const subscriptionUiData = useMemo(
    () => (subscription ? getSubscriptionUiData(subscription) : null),
    [subscription]
  );

  if (error) {
    return (
      <ContainerForCentered>
        <Alert
          message="Failed to load subscription details."
          description={getErrorMessages(error)}
          type="error"
        />
      </ContainerForCentered>
    );
  }

  const titleLevel = 2;

  if (isLoading || !subscription || !subscriptionUiData) {
    return (
      <MainContentWrapper>
        <Title level={titleLevel} isLink onClick={() => navigate(ROUTES.HOME)}>
          Loading...
        </Title>

        <Card>
          <Skeleton active />
        </Card>
      </MainContentWrapper>
    );
  }

  return (
    <MainContentWrapper>
      <Space>
        <Title level={titleLevel} onClick={() => navigate(ROUTES.HOME)} isLink>
          <CaretLeftOutlined />
          {subscription.name}
        </Title>
      </Space>

      <Card>
        <Tag
          color={subscriptionUiData.periodTagColor}
          icon={<CalendarOutlined />}
          style={{ marginBottom: 16 }}
        >
          {subscriptionUiData.periodText}
        </Tag>

        <div style={{ marginBottom: 16 }}>
          <Title level={4}>Monthly Cost</Title>
          <p>{`${subscriptionUiData.currencySymbol}${subscriptionUiData.costPerMonth}`}</p>
        </div>

        <div style={{ marginBottom: 16 }}>
          <Title level={4}>Yearly Cost</Title>
          <p>{`${subscriptionUiData.currencySymbol}${subscriptionUiData.costPerYear}`}</p>
        </div>

        {subscriptionUiData.nextPaymentDate && (
          <div style={{ marginBottom: 16 }}>
            <Title level={4}>Next Payment</Title>
            <p>
              {subscriptionUiData.nextPaymentDate} —{' '}
              {subscriptionUiData.currencySymbol}
              {subscriptionUiData.price}
            </p>
          </div>
        )}

        <div style={{ marginBottom: 16 }}>
          <Title level={4}>Total Spent</Title>
          <p>{`${subscriptionUiData.currencySymbol}${subscriptionUiData.spentAmount}`}</p>
        </div>

        {subscriptionUiData.cancelledDate && (
          <div style={{ marginBottom: 16 }}>
            <Title level={4}>Cancellation Date</Title>
            <p>{subscriptionUiData.cancelledDate}</p>
          </div>
        )}

        <Space style={{ marginTop: 24 }}>
          <Button
            type="primary"
            onClick={() =>
              navigate(
                ROUTES.SUBSCRIPTION_EDIT.replace(
                  ':subscriptionId',
                  subscription.id.toString()
                )
              )
            }
          >
            Edit
          </Button>
          <Button danger>Cancel Subscription</Button>
          <Button danger type="primary">
            Delete
          </Button>
        </Space>
      </Card>
    </MainContentWrapper>
  );
};

export default Subscription;
