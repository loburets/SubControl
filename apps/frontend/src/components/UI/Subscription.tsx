import React, { PropsWithChildren, useMemo } from 'react';
import { SubscriptionResponseDto } from '@subcontrol/shared-dtos/subscriptions';
import { Title } from './Title';
import { Card, CardProps, Divider, GlobalToken, Tag, theme } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import { getSubscriptionUiData } from '../../utils/subscriptionsHelper';
import { SidesSplitter } from './SidesSplitter';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import { ROUTES } from '../../router/routes';
import { Price } from './Price';

const { useToken } = theme;

export const Subscription: React.FC<{
  subscription: SubscriptionResponseDto;
}> = ({ subscription }) => {
  const subscriptionUiData = useMemo(
    () => getSubscriptionUiData(subscription),
    [subscription]
  );
  const { token } = useToken();
  const navigate = useNavigate();

  return (
    <StyledCard
      onClick={() => {
        navigate(
          ROUTES.SUBSCRIPTION_DETAILS.replace(
            ':subscriptionId',
            subscription.id.toString()
          )
        );
      }}
      $isCancelled={!!subscription.cancelledAt}
      $token={token}
      title={
        <Title level={4} embedMargins noAdoptation>
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
            <Price>{`${subscriptionUiData.currencySymbol}${subscriptionUiData.costPerMonth}`}</Price>
            /month
          </span>
          <span>
            <Price>{`${subscriptionUiData.currencySymbol}${subscriptionUiData.costPerYear}`}</Price>
            /year
          </span>
        </SidesSplitter>
      </p>
      <Divider style={{ margin: 0 }} />
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

export const SubscriptionDetailsCard: React.FC<
  CardProps & PropsWithChildren & { isCancelled?: boolean }
> = ({ isCancelled, children, ...rest }) => {
  const { token } = useToken();

  return (
    <StyledCard $token={token} $isCancelled={isCancelled || false} {...rest}>
      {children}
    </StyledCard>
  );
};
