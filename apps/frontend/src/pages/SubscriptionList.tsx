import React, { useMemo } from 'react';
import { Alert, Row, Col, Button, Space } from 'antd';
import { MainContentWrapper } from '../components/Layout/MainContentWrapper';
import { Title } from '../components/UI/Title';
import { useSubscriptionList } from '../queries/subscriptions.query';
import { ContainerForCentered } from '../components/Layout/ContainerForCentered';
import { getErrorMessages } from '../utils/errorConvertor';
import { Subscription } from '../components/UI/Subscription';
import { SubscriptionSkeleton } from '../components/UI/SubscriptionSkeleton';
import { sortSubscriptionsByNextPayment } from '../utils/subscriptionsHelper';
import { Hider } from '../components/UI/Hider';
import { SidesSplitter } from '../components/UI/SidesSplitter';

const SubscriptionList: React.FC = () => {
  const { isLoading, error, data } = useSubscriptionList();
  const subscriptions = useMemo(
    () => (data?.subscriptions || []).sort(sortSubscriptionsByNextPayment),
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

      <Hider desktopOnly>
        <SidesSplitter>
          <Title level={5}>{isLoading ? <>&nbsp;</> : '(Click to open)'}</Title>
          <Button type="primary" style={{ marginBottom: 24 }}>
            Create new
          </Button>
        </SidesSplitter>
      </Hider>

      {(isLoading || subscriptions.length) && (
        <>
          <Title level={4} mobileOnly>
            {isLoading ? <>&nbsp;</> : '(Press to open)'}
          </Title>
        </>
      )}

      <Row gutter={[20, 20]}>
        {subscriptions.map((subscription) => (
          <Col key={subscription.id} xs={24} sm={24} md={12} lg={12}>
            <Subscription subscription={subscription} />
          </Col>
        ))}
        {isLoading &&
          Array.from({ length: 2 }).map((_, index) => (
            <Col key={index} xs={24} sm={24} md={12} lg={12}>
              <SubscriptionSkeleton />
            </Col>
          ))}
      </Row>

      <Title level={3} style={{ marginTop: '24px !important' }}>
        Cancelled
      </Title>

      <Row gutter={[20, 20]}>
        {subscriptions.map((subscription) => (
          <Col key={subscription.id} xs={24} sm={24} md={12} lg={12}>
            <Subscription subscription={subscription} />
          </Col>
        ))}
      </Row>
    </MainContentWrapper>
  );
};

export default SubscriptionList;
