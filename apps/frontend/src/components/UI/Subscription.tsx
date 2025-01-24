import React, { useMemo } from 'react';
import { SubscriptionResponseDto } from '@subcontrol/shared-dtos/subscriptions';
import { Title } from './Title';
import { Card, Tag } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import { getSubscriptionUiData } from '../../utils/subscriptionsHelper';
import { format } from 'date-fns';
import { SidesSplitter } from './SidesSplitter';

export const Subscription: React.FC<{
  subscription: SubscriptionResponseDto;
}> = ({ subscription }) => {
  const subscriptionUiData = useMemo(
    () => getSubscriptionUiData(subscription),
    [subscription]
  );

  return (
    <Card
      title={
        <Title level={4} embedMargins noAdoption>
          {subscription.name}
        </Title>
      }
      type="inner"
      hoverable
      extra={
        <Tag
          color={subscriptionUiData.periodTagColor}
          icon={<CalendarOutlined />}
          style={{ marginRight: 0 }}
        >
          {subscriptionUiData.periodText}
        </Tag>
      }
    >
      <p>
        <SidesSplitter>
          <div>
            {`${subscriptionUiData.currencySymbol}${subscriptionUiData.costPerMonth}`}
            /month
          </div>
          <div>
            {`${subscriptionUiData.currencySymbol}${subscriptionUiData.costPerYear}`}
            /year
          </div>
        </SidesSplitter>
      </p>
      {subscriptionUiData.nextPaymentDate && (
        <p>
          Next Payment: {subscriptionUiData.nextPaymentDate} —{' '}
          {subscriptionUiData.currencySymbol}
          {subscriptionUiData.price}
        </p>
      )}
      <p>
        Total spent:{' '}
        {`${subscriptionUiData.currencySymbol}${subscriptionUiData.spentAmount}`}
      </p>

      {subscriptionUiData.cancelledDate && (
        <p>
          <strong>Cancelled at {subscriptionUiData.cancelledDate}</strong>
        </p>
      )}
    </Card>
  );
};
