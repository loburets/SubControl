import React from 'react';
import { Card, Spin, Alert, Row, Col, Typography } from 'antd';
import styled from 'styled-components';
import { MainContentWrapper } from '../components/Layout/MainContentWrapper';
const { Title } = Typography;

interface Subscription {
  id: number;
  name: string;
  period: 'YEARLY' | 'MONTHLY' | 'WEEKLY';
  centsPerPeriod: number;
  currency: string;
  totalSpent: number;
  nextPaymentDate: Date | null;
}

const SubscriptionList: React.FC = () => {
  const isLoading = false;
  const error = false;
  const data: Subscription[] = [
    {
      id: 1,
      name: 'Netflix',
      period: 'MONTHLY',
      centsPerPeriod: 999,
      currency: 'USD',
      totalSpent: 999,
      nextPaymentDate: new Date(),
    },
    {
      id: 1,
      name: 'Netflix2',
      period: 'MONTHLY',
      centsPerPeriod: 999,
      currency: 'USD',
      totalSpent: 999,
      nextPaymentDate: new Date(),
    },
    {
      id: 2,
      name: 'Spotify',
      period: 'MONTHLY',
      centsPerPeriod: 999,
      currency: 'USD',
      totalSpent: 999,
      nextPaymentDate: new Date(),
    },
    {
      id: 2,
      name: 'Spotify',
      period: 'MONTHLY',
      centsPerPeriod: 999,
      currency: 'USD',
      totalSpent: 999,
      nextPaymentDate: new Date(),
    },
    {
      id: 2,
      name: 'Spotify',
      period: 'MONTHLY',
      centsPerPeriod: 999,
      currency: 'USD',
      totalSpent: 999,
      nextPaymentDate: new Date(),
    },
    {
      id: 2,
      name: 'Spotify',
      period: 'MONTHLY',
      centsPerPeriod: 999,
      currency: 'USD',
      totalSpent: 999,
      nextPaymentDate: new Date(),
    },
    {
      id: 2,
      name: 'Spotify',
      period: 'MONTHLY',
      centsPerPeriod: 999,
      currency: 'USD',
      totalSpent: 999,
      nextPaymentDate: new Date(),
    },
  ];

  if (isLoading) {
    return <Spin tip="Loading..." />;
  }

  if (error) {
    return (
      <Alert
        message="Error"
        description="Failed to load subscriptions."
        type="error"
      />
    );
  }

  return (
    <MainContentWrapper>
      <Title level={2}>Subscriptions</Title>
      <Row gutter={[20, 20]}>
        {data?.map((subscription) => (
          <Col key={subscription.id} xs={24} sm={24} md={12} lg={12}>
            <Card title={subscription.name} type="inner">
              <p>Period: {subscription.period}</p>
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
          </Col>
        ))}
      </Row>
    </MainContentWrapper>
  );
};

// const StyledCard = styled(Card)`
//   margin: 20px;
// `;

export default SubscriptionList;
