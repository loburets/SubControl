import React, { useMemo } from 'react';
import { SubscriptionResponseDto } from '@subcontrol/shared-dtos/subscriptions';
import { Title } from './Title';
import { Card, GlobalToken, Tag, theme } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import { getSubscriptionUiData } from '../../utils/subscriptionsHelper';
import { SidesSplitter } from './SidesSplitter';
import styled from 'styled-components';

const { useToken } = theme;

export const Subscription: React.FC<{
  subscription: SubscriptionResponseDto;
}> = ({ subscription }) => {
  const subscriptionUiData = useMemo(
    () => getSubscriptionUiData(subscription),
    [subscription]
  );
  const { token } = useToken();

  return (
    <StyledCard
      $isCancelled={!!subscription.cancelledAt}
      $token={token}
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
          style={{ marginRight: 0, marginLeft: 8 }}
        >
          {subscriptionUiData.periodText}
        </Tag>
      }
    >
      <p>
        <SidesSplitter>
          <span>
            {`${subscriptionUiData.currencySymbol}${subscriptionUiData.costPerMonth}`}
            /month
          </span>
          <span>
            {`${subscriptionUiData.currencySymbol}${subscriptionUiData.costPerYear}`}
            /year
          </span>
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
    </StyledCard>
  );
};

const StyledCard = styled(Card)<{
  $token: GlobalToken;
  $isCancelled: boolean;
}>`
  background-color: ${({ $token, $isCancelled }) =>
    $isCancelled ? $token.colorBgContainerDisabled : $token.colorBgBase};
`;
