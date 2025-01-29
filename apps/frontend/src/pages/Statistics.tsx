import React from 'react';
import { Alert, Row, Col, Card, Statistic } from 'antd';
import { MainContentWrapper } from '../components/Layout/MainContentWrapper';
import { Title } from '../components/UI/Title';
import { useSubscriptionStats } from '../queries/subscriptions.query';
import { ContainerForCentered } from '../components/Layout/ContainerForCentered';
import { getErrorMessages } from '../utils/errorConvertor';
import { SubscriptionSkeleton } from '../components/UI/SubscriptionSkeleton';
import {
  Currency,
  formatPrice,
  getCurrencySymbol,
} from '../utils/subscriptionsHelper';
import { TextBlock } from '../components/UI/TextBlock';
import styled from 'styled-components';
import { SpendingChart } from '../components/UI/SpendingChart';

const Statistics: React.FC = () => {
  const { isLoading, error, data } = useSubscriptionStats();

  if (error) {
    return (
      <ContainerForCentered>
        <Alert
          message="Failed to load statistics."
          description={getErrorMessages(error)}
          type="error"
        />
      </ContainerForCentered>
    );
  }

  const renderAmountStats = (
    amounts: { amount: number; currency: Currency }[] | undefined
  ) => {
    if (!amounts) return undefined;
    return amounts
      .map((amount) => {
        const currencySymbol = getCurrencySymbol(amount.currency);
        return `${currencySymbol}${formatPrice(amount.amount)}`;
      })
      .join(', ');
  };

  return (
    <MainContentWrapper>
      <Title level={1}>Statistics</Title>

      {isLoading ? (
        <Row gutter={[20, 20]}>
          {Array.from({ length: 4 }).map((_, index) => (
            <Col key={index} xs={24} sm={12} md={12} lg={6}>
              <SubscriptionSkeleton />
            </Col>
          ))}
        </Row>
      ) : (
        <>
          <SpendingChart
            // past30Days={data?.spentPast30Days}
            // past365Days={data?.spentPast365Days}
            // expectedThisYear={data?.expectedSpentThisYear}
            // lastYear={data?.spentLastYear}
            pastPayments={data?.pastPayments}
            nextPayments={data?.nextPayments}
          />

          <StyledRow gutter={[20, 20]}>
            <Col xs={24} sm={12} md={12} lg={6}>
              <StyledCard>
                <Statistic
                  title="Next 30 Days"
                  value={renderAmountStats(data?.next30DaysAmount)}
                  valueStyle={{ color: '#1677ff' }}
                />
              </StyledCard>
            </Col>
            <Col xs={24} sm={12} md={12} lg={6}>
              <StyledCard>
                <Statistic
                  title="Next 365 Days"
                  value={renderAmountStats(data?.next365DaysAmount)}
                  valueStyle={{ color: '#1677ff' }}
                />
              </StyledCard>
            </Col>
            <Col xs={24} sm={12} md={12} lg={6}>
              <StyledCard>
                <Statistic
                  title="Total Spent"
                  value={renderAmountStats(data?.totalSpent)}
                  valueStyle={{ color: '#cf1322' }}
                />
              </StyledCard>
            </Col>
            <Col xs={24} sm={12} md={12} lg={6}>
              <StyledCard>
                <Statistic
                  title="Expected This Year"
                  value={renderAmountStats(data?.expectedSpentThisYear)}
                  valueStyle={{ color: '#389e0d' }}
                />
              </StyledCard>
            </Col>
          </StyledRow>

          <StyledRow gutter={[20, 20]}>
            <Col xs={24} sm={12}>
              <StyledCard title="Past 30 Days">
                <TextBlock>
                  <p>Spent: {renderAmountStats(data?.spentPast30Days)}</p>
                </TextBlock>
              </StyledCard>
            </Col>
            <Col xs={24} sm={12}>
              <StyledCard title="Past 365 Days">
                <TextBlock>
                  <p>Spent: {renderAmountStats(data?.spentPast365Days)}</p>
                </TextBlock>
              </StyledCard>
            </Col>
          </StyledRow>

          <StyledRow gutter={[20, 20]}>
            <Col xs={24} sm={12}>
              <StyledCard title="Last Year">
                <TextBlock>
                  <p>Spent: {renderAmountStats(data?.spentLastYear)}</p>
                </TextBlock>
              </StyledCard>
            </Col>
            <Col xs={24} sm={12}>
              <StyledCard title="This Year">
                <TextBlock>
                  <p>
                    Expected: {renderAmountStats(data?.expectedSpentThisYear)}
                  </p>
                </TextBlock>
              </StyledCard>
            </Col>
          </StyledRow>
        </>
      )}
    </MainContentWrapper>
  );
};

const StyledRow = styled(Row)`
  margin-bottom: 20px;
`;

const StyledCard = styled(Card)`
  height: 100%;
`;

export default Statistics;
