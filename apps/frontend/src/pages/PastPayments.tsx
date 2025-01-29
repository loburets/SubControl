import React from 'react';
import { Alert, Row, Col } from 'antd';
import { MainContentWrapper } from '../components/Layout/MainContentWrapper';
import { Title } from '../components/UI/Title';
import { useSubscriptionStats } from '../queries/subscriptions.query';
import { ContainerForCentered } from '../components/Layout/ContainerForCentered';
import { getErrorMessages } from '../utils/errorConvertor';
import { Payment } from '../components/UI/Payment';
import { SubscriptionSkeleton } from '../components/UI/SubscriptionSkeleton';
import { getCurrencySymbol } from '../utils/subscriptionsHelper';

const PastPayments: React.FC = () => {
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
      <Title level={1}>Past Payments</Title>

      {data?.totalSpent.map((amount) => {
        const currencySymbol = getCurrencySymbol(amount.currency);
        return (
          <Alert
            key={amount.currency}
            message={`Total spent: ${currencySymbol}${amount.amount / 100}`}
            type="info"
            style={{ marginBottom: 24 }}
          />
        );
      })}

      <Row gutter={[20, 20]}>
        {data?.pastPayments.map((payment) => (
          <Col
            key={`${payment.subscriptionId}-${payment.date}`}
            xs={24}
            sm={24}
            md={12}
            lg={12}
          >
            <Payment payment={payment} />
          </Col>
        ))}
        {isLoading &&
          Array.from({ length: 2 }).map((_, index) => (
            <Col key={index} xs={24} sm={24} md={12} lg={12}>
              <SubscriptionSkeleton />
            </Col>
          ))}
      </Row>
    </MainContentWrapper>
  );
};

export default PastPayments;
