import React, { useMemo } from 'react';
import { Alert, Row, Col, Card, Statistic, Radio } from 'antd';
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
import { FormContainer } from '../components/UI/FormContainer';
import { Hider } from '../components/UI/Hider';

type ChartType = 'pie' | 'bar';

const Statistics: React.FC = () => {
  const [chartType, setChartType] = React.useState<ChartType>('pie');
  const { isLoading, error, data } = useSubscriptionStats();
  const allPayments = useMemo(
    () => [...(data?.pastPayments || []), ...(data?.nextPayments || [])],
    [data]
  );

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
          {Array.from({ length: 3 }).map((_, index) => (
            <Col key={index} span={24}>
              <SubscriptionSkeleton />
            </Col>
          ))}
        </Row>
      ) : (
        <>
          <Row
            justify="space-between"
            align="middle"
            style={{ marginBottom: 16 }}
          >
            <Col xs={0} sm={0} md={12} lg={12}>
              <Hider desktopOnly>
                <TextBlock marginBottom={0}>
                  Click charts to see amounts
                </TextBlock>
              </Hider>
            </Col>
            <Col>
              <FormContainer>
                <Radio.Group
                  value={chartType}
                  onChange={(e) => setChartType(e.target.value)}
                  optionType="button"
                  buttonStyle="solid"
                >
                  <Radio.Button value="pie">Pie Chart</Radio.Button>
                  <Radio.Button value="bar">Bar Chart</Radio.Button>
                </Radio.Group>
              </FormContainer>
            </Col>
          </Row>

          {chartType === 'pie' && (
            <Hider mobileOnly>
              <TextBlock>Press charts to see amounts</TextBlock>
            </Hider>
          )}
          <SpendingChart payments={allPayments} chartType={chartType} />

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
