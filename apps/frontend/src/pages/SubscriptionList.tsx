import React from 'react';
import { Card, Spin, Alert, Row, Col, Tag } from 'antd';
import { MainContentWrapper } from '../components/Layout/MainContentWrapper';
import { Title } from '../components/UI/Title';
import { CalendarOutlined } from '@ant-design/icons';
import { useSubscriptionList } from '../queries/subscriptions.query';

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
  const { isLoading, error } = useSubscriptionList();
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
      name: 'Long name Spotify Spotify Spotify Long name Spotify Spotify Spotify',
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
      <Title level={1}>Your subscriptions</Title>
      {/*TODO: hide when no data*/}
      <Title level={4} mobileOnly>
        Press to open
      </Title>
      <Title level={5} desktopOnly>
        Click to open
      </Title>
      <Row gutter={[20, 20]}>
        {data?.map((subscription) => (
          <Col key={subscription.id} xs={24} sm={24} md={12} lg={12}>
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
          </Col>
        ))}
        <Col xs={24} sm={24} md={12} lg={12}>
          <Card loading type="inner"></Card>
          <Card loading type="inner"></Card>
          <Card loading type="inner"></Card>
          <Card loading type="inner"></Card>
        </Col>
      </Row>
    </MainContentWrapper>
  );
};

export default SubscriptionList;
