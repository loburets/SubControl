import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Alert, Button, Card, Space, Skeleton } from 'antd';
import { CalendarOutlined, CaretLeftOutlined } from '@ant-design/icons';
import { MainContentWrapper } from '../components/Layout/MainContentWrapper';
import { Title } from '../components/UI/Title';
import { ContainerForCentered } from '../components/Layout/ContainerForCentered';
import { useSubscription } from '../queries/subscriptions.query';
import { getErrorMessages } from '../utils/errorConvertor';
import { getSubscriptionUiData, Period } from '../utils/subscriptionsHelper';
import { ROUTES } from '../router/routes';
import { Tag } from '../components/UI/Tag';
import { SubscriptionDetailsCard } from '../components/UI/Subscription';

const SubscriptionDetails: React.FC = () => {
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

        <SubscriptionDetailsCard>
          <Skeleton active />
        </SubscriptionDetailsCard>
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

      <SubscriptionDetailsCard isCancelled={!!subscription.cancelledAt}>
        <Tag
          size={'big'}
          color={subscriptionUiData.periodTagColor}
          icon={<CalendarOutlined />}
        >
          {subscriptionUiData.periodText}
        </Tag>

        <div style={{ marginBottom: 24 }}>
          <Title level={4} embedMargins>
            Cost
          </Title>
          <p>
            {subscription.period === Period.WEEKLY && (
              <>
                {`${subscriptionUiData.currencySymbol}${subscriptionUiData.price}`}
                /week
                <br />
                or
                <br />
              </>
            )}
            {`${subscriptionUiData.currencySymbol}${subscriptionUiData.costPerMonth}`}
            /month
            <br />
            or
            <br />
            {`${subscriptionUiData.currencySymbol}${subscriptionUiData.costPerYear}`}
            /year
          </p>
        </div>

        {subscriptionUiData.nextPaymentDate && (
          <div style={{ marginBottom: 24 }}>
            <Title level={4} embedMargins>
              Next Payment
            </Title>
            <p>
              {subscriptionUiData.nextPaymentDate} —{' '}
              {subscriptionUiData.currencySymbol}
              {subscriptionUiData.price}
            </p>
          </div>
        )}

        <div style={{ marginBottom: 24 }}>
          <Title level={4} embedMargins>
            Total Spent
          </Title>
          <p>{`${subscriptionUiData.currencySymbol}${subscriptionUiData.spentAmount}`}</p>
        </div>

        {subscriptionUiData.cancelledDate && (
          <div style={{ marginBottom: 16 }}>
            <Title level={4} embedMargins>
              Cancellation Date
            </Title>
            <p>{subscriptionUiData.cancelledDate}</p>
          </div>
        )}

        <Space style={{ marginTop: 24 }}>
          <Button danger>Delete</Button>
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
            Edit / {subscription.cancelledAt ? 'Re-activate' : 'Cancel'}
          </Button>
        </Space>
      </SubscriptionDetailsCard>
    </MainContentWrapper>
  );
};

export default SubscriptionDetails;
