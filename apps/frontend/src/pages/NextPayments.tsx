import React, { useMemo, useState } from 'react';
import { Alert, Row, Col, Typography } from 'antd';
import { MainContentWrapper } from '../components/Layout/MainContentWrapper';
import { Title } from '../components/UI/Title';
import { useSubscriptionStats } from '../queries/subscriptions.query';
import { ContainerForCentered } from '../components/Layout/ContainerForCentered';
import { getErrorMessages } from '../utils/errorConvertor';
import { Payment } from '../components/UI/Payment';
import { SubscriptionSkeleton } from '../components/UI/SubscriptionSkeleton';
import {
  formatPrice,
  getCurrencySymbol,
  sortPaymentsByDate,
} from '../utils/subscriptionsHelper';
import { TextBlock } from '../components/UI/TextBlock';
import { Button } from '../components/UI/Button';

const ITEMS_PER_PAGE = 10;

const NextPayments: React.FC = () => {
  const { isLoading, error, data } = useSubscriptionStats();
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE);

  const payments = useMemo(
    () => data?.nextPayments.sort(sortPaymentsByDate) || [],
    [data]
  );
  const showPaymentsAbsence = !payments.length && !isLoading;

  const displayedPayments = useMemo(
    () => payments.slice(0, displayCount),
    [payments, displayCount]
  );

  const hasMore = payments.length > displayCount;

  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + ITEMS_PER_PAGE);
  };

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

      {!showPaymentsAbsence && (
        <TextBlock>
          <p>
            Next 30 days:{' '}
            {data?.next30DaysAmount
              .map((amount) => {
                const currencySymbol = getCurrencySymbol(amount.currency);
                return `${currencySymbol}${formatPrice(amount.amount)}`;
              })
              .join(', ') || 'Loading...'}
          </p>
          <p>
            Next 365 days:{' '}
            {data?.next365DaysAmount
              .map((amount) => {
                const currencySymbol = getCurrencySymbol(amount.currency);
                return `${currencySymbol}${formatPrice(amount.amount)}`;
              })
              .join(', ') || 'Loading...'}
          </p>
        </TextBlock>
      )}

      <Row gutter={[20, 20]}>
        {displayedPayments.map((payment) => (
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

      {hasMore && !isLoading && (
        <Row justify="center" style={{ marginTop: 24, marginBottom: 8 }}>
          <Button onClick={handleLoadMore}>Load More</Button>
        </Row>
      )}

      {showPaymentsAbsence && <TextBlock>No upcoming payments.</TextBlock>}
    </MainContentWrapper>
  );
};

export default NextPayments;
