import React from 'react';
import { SubscriptionPaymentResponseDto } from '@subcontrol/shared-dtos/subscriptions';
import { Card, Tag } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import {
  formatDate,
  formatPrice,
  getCurrencySymbol,
  getPeriodNaming,
  getPeriodTagColor,
} from '../../utils/subscriptionsHelper';
import { Price } from './Price';
import { Title } from './Title';

export const Payment: React.FC<{
  payment: SubscriptionPaymentResponseDto;
}> = ({ payment }) => {
  const currencySymbol = getCurrencySymbol(payment.currency);
  const formattedDate = formatDate(payment.date);
  const { periodText } = getPeriodNaming(payment.period);

  return (
    <Card
      type="inner"
      title={
        <Title level={4} embedMargins noAdoptation>
          {payment.subscriptionName}
        </Title>
      }
      extra={
        <Tag
          color={getPeriodTagColor(payment.period)}
          icon={<CalendarOutlined />}
        >
          {periodText}
        </Tag>
      }
    >
      <p>
        {formattedDate} —{' '}
        <Price>{`${currencySymbol}${formatPrice(payment.amount)}`}</Price>
      </p>
    </Card>
  );
};
