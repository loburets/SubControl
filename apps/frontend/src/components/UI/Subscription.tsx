import React from 'react';
import { SubscriptionResponseDto } from '@subcontrol/shared-dtos/subscriptions';
import { Title } from './Title';
import { Card, Tag } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';

export const Subscription: React.FC<{
  subscription: SubscriptionResponseDto;
}> = ({ subscription }) => {
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
        <Tag color="green" icon={<CalendarOutlined />}>
          Monthly
        </Tag>
      }
    >
      <p>Price (cents): {subscription.centsPerPeriod}</p>
      <p>Currency: {subscription.currency}</p>
      <p>Total Spent (cents): {subscription.totalSpent}</p>
      <p>
        Next Payment Date:{' '}
        {subscription.nextPaymentDate
          ? new Date(subscription.nextPaymentDate).toLocaleDateString()
          : 'N/A'}
      </p>
    </Card>
  );
};
