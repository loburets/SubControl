import React, { useMemo, useState } from 'react';
import { Alert, Row, Col, Button, Empty, Space } from 'antd';
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
import { Search } from '../components/UI/Search';
import { EmptyResults } from '../components/UI/EmptyResults';

const SubscriptionList: React.FC = () => {
  const { isLoading, error, data } = useSubscriptionList();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSubscriptions = useMemo(() => {
    const lowerCaseQuery = searchQuery.toLowerCase().trim();
    return (data?.subscriptions || []).filter((s) =>
      s.name.toLowerCase().includes(lowerCaseQuery)
    );
  }, [data, searchQuery]);
  const activeSubscriptions = useMemo(
    () =>
      filteredSubscriptions
        .filter((s) => !s.cancelledAt)
        .sort(sortSubscriptionsByNextPayment),
    [filteredSubscriptions]
  );
  const cancelledSubscriptions = useMemo(
    () =>
      filteredSubscriptions
        .filter((s) => s.cancelledAt)
        .sort(sortSubscriptionsByNextPayment),
    [filteredSubscriptions]
  );
  const isEmptySearch = !isLoading && !filteredSubscriptions.length;
  const isEmptyList = !isLoading && !data?.subscriptions.length;

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

      <SidesSplitter>
        <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <Hider desktopOnly>
          <Button type="primary" style={{ marginBottom: 24 }}>
            Create new
          </Button>
        </Hider>
      </SidesSplitter>

      {/*Show as empty during loading to reserve space*/}
      {(isLoading || !!filteredSubscriptions.length) && (
        <>
          <Title level={4} mobileOnly>
            {isLoading ? <>&nbsp;</> : '(Press to open)'}
          </Title>
          <Title level={5} desktopOnly>
            {isLoading ? <>&nbsp;</> : '(Click to open)'}
          </Title>
        </>
      )}

      {(isEmptyList || isEmptySearch) && (
        <EmptyResults isSearch={isEmptySearch} />
      )}

      <Row gutter={[20, 20]} style={{ marginBottom: 24 }}>
        {activeSubscriptions.map((subscription) => (
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

      {!!cancelledSubscriptions.length && (
        <>
          <Title level={3}>Cancelled</Title>
          <Row gutter={[20, 20]}>
            {cancelledSubscriptions.map((subscription) => (
              <Col key={subscription.id} xs={24} sm={24} md={12} lg={12}>
                <Subscription subscription={subscription} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </MainContentWrapper>
  );
};

export default SubscriptionList;
