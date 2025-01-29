import React from 'react';
import { Alert, Row, Col, Typography } from 'antd';
import { MainContentWrapper } from '../components/Layout/MainContentWrapper';
import { Title } from '../components/UI/Title';
import { useSubscriptionStats } from '../queries/subscriptions.query';
import { ContainerForCentered } from '../components/Layout/ContainerForCentered';
import { getErrorMessages } from '../utils/errorConvertor';
import { Payment } from '../components/UI/Payment';
import { SubscriptionSkeleton } from '../components/UI/SubscriptionSkeleton';
import { formatPrice, getCurrencySymbol } from '../utils/subscriptionsHelper';
import { TextBlock } from '../components/UI/TextBlock';

const NextPayments: React.FC = () => {
  const { isLoading, error, data } = useSubscriptionStats();

  if (error) {
    return (
      <ContainerForCentered>
        <Alert
          message="Failed to load payments."
          description={getErrorMessages(error)}
          type="error"
        />
      </ContainerForCentered>
    );
  }

  return (
    <MainContentWrapper>
      <Title level={1}>Next Payments</Title>
      <TextBlock>
        <p>
          Next 30 days:{' '}
          {data?.next30DaysAmount
            .map((amount) => {
              const currencySymbol = getCurrencySymbol(amount.currency);
              return `${currencySymbol}${formatPrice(amount.amount)}`;
            })
            .join(', ')}
        </p>
        <p>
          Next 365 days:{' '}
          {data?.next365DaysAmount
            .map((amount) => {
              const currencySymbol = getCurrencySymbol(amount.currency);
              return `${currencySymbol}${formatPrice(amount.amount)}`;
            })
            .join(', ')}
        </p>
      </TextBlock>

      <Row gutter={[20, 20]}>
        {data?.nextPayments.map((payment) => (
          <Col key={`${payment.subscriptionId}-${payment.date}`} span={24}>
            <Payment payment={payment} />
          </Col>
        ))}
        {isLoading &&
          Array.from({ length: 2 }).map((_, index) => (
            <Col key={index} span={24}>
              <SubscriptionSkeleton />
            </Col>
          ))}
      </Row>
    </MainContentWrapper>
  );
};

export default NextPayments;
