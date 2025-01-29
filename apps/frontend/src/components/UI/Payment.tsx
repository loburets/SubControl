import React from 'react';
import { SubscriptionPaymentResponseDto } from '@subcontrol/shared-dtos/subscriptions';
import { Card, Tag } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import {
  formatDate,
  formatPrice,
  getCurrencySymbol,
} from '../../utils/subscriptionsHelper';
import { Price } from './Price';
import { Title } from './Title';

export const Payment: React.FC<{
  payment: SubscriptionPaymentResponseDto;
}> = ({ payment }) => {
  const currencySymbol = getCurrencySymbol(payment.currency);
  const formattedDate = formatDate(payment.date);

  return (
    <Card
      type="inner"
      title={
        <Title level={4} embedMargins noAdoption>
          {payment.subscriptionName}
        </Title>
      }
      extra={
        <Tag color="blue" icon={<CalendarOutlined />}>
          {formattedDate}
        </Tag>
      }
    >
      <Price>{`${currencySymbol}${formatPrice(payment.amount)}`}</Price>
    </Card>
  );
};
