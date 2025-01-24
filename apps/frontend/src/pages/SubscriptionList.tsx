import React, { useMemo } from 'react';
import { Card, Spin, Alert, Row, Col, Tag } from 'antd';
import { MainContentWrapper } from '../components/Layout/MainContentWrapper';
import { Title } from '../components/UI/Title';
import { CalendarOutlined } from '@ant-design/icons';
import { useSubscriptionList } from '../queries/subscriptions.query';
import { isBefore } from 'date-fns';
import { SubscriptionResponseDto } from '@subcontrol/shared-dtos/subscriptions';
import { ContainerForCentered } from '../components/Layout/ContainerForCentered';
import { getErrorMessages } from '../utils/errorConvertor';

const sortSubscriptions = (
  a: SubscriptionResponseDto,
  b: SubscriptionResponseDto
) => {
  if (
    (!a.nextPaymentDate && !b.nextPaymentDate) ||
    a.nextPaymentDate?.toDateString() === b.nextPaymentDate?.toDateString()
  ) {
    return 0;
  }
  return isBefore(
    a.nextPaymentDate || new Date(),
    b.nextPaymentDate || new Date()
  )
    ? -1
    : 1;
};

const SubscriptionList: React.FC = () => {
  const { isLoading, error, data } = useSubscriptionList();
  const subscriptions = useMemo(
    () => (data?.subscriptions || []).sort(sortSubscriptions),
    [data]
  );

  if (error) {
    return (
      <ContainerForCentered>
        <Alert
          message="Failed to load subscriptions."
          description={getErrorMessages(error)}
          type="error"
        />
      </ContainerForCentered>
    );
  }

  return (
    <MainContentWrapper>
      <Title level={1}>Your subscriptions</Title>

      {!isLoading && subscriptions.length && (
        <>
          <Title level={4} mobileOnly>
            Press to open
          </Title>
          <Title level={5} desktopOnly>
            Click to open
          </Title>
        </>
      )}

      <Row gutter={[20, 20]}>
        {subscriptions.map((subscription) => (
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
