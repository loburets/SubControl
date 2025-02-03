import React, { useMemo } from 'react';
import { Alert, Row, Col, Card, Statistic, Radio, theme } from 'antd';
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
import { FormElementsAdjuster } from '../components/UI/FormElementsAdjuster';
import { Hider } from '../components/UI/Hider';
import { Button } from '../components/UI/Button';
import { ROUTES } from '../router/routes';
import { useNavigate } from 'react-router';

type ChartType = 'pie' | 'bar';

const Statistics: React.FC = () => {
  const { token } = theme.useToken();
  const navigate = useNavigate();
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

  if (!isLoading && allPayments.length === 0) {
    return (
      <MainContentWrapper>
        <Title level={1}>Statistics</Title>
        <TextBlock>No statistic found, create a subscription</TextBlock>
        <div>
          <Button
            type="primary"
            style={{ marginBottom: 24 }}
            onClick={() => navigate(ROUTES.SUBSCRIPTION_CREATE)}
          >
            Create new
          </Button>
        </div>
      </MainContentWrapper>
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
          <StyledRow gutter={[20, 20]}>
            {[
              {
                title: 'Total Spent',
                value: data?.totalSpent,
                color: token.colorErrorText,
              },
              {
                title: 'Next 30 Days',
                value: data?.next30DaysAmount,
                color: token.colorInfoText,
              },
              {
                title: 'Next 365 Days',
                value: data?.next365DaysAmount,
                color: token.colorInfoText,
              },
            ].map((item, index) => (
              <Col xs={24} sm={8} md={8} lg={8} key={index}>
                <Card size="small">
                  <Statistic
                    title={item.title}
                    value={renderAmountStats(item.value)}
                    valueStyle={{ color: item.color }}
                  />
                </Card>
              </Col>
            ))}
          </StyledRow>

          <StyledRow
            justify="space-between"
            align="middle"
            style={{ marginBottom: 16 }}
          >
            <Col xs={0} sm={0} md={12} lg={12}>
              <Hider desktopOnly>
                <TextBlock marginBottom={0}>Click to see amounts</TextBlock>
              </Hider>
            </Col>
            <Col>
              <FormElementsAdjuster>
                <Radio.Group
                  value={chartType}
                  onChange={(e) => setChartType(e.target.value)}
                  optionType="button"
                  buttonStyle="solid"
                >
                  <Radio.Button value="pie">Pie Chart</Radio.Button>
                  <Radio.Button value="bar">Bar Chart</Radio.Button>
                </Radio.Group>
              </FormElementsAdjuster>
            </Col>
          </StyledRow>

          {chartType === 'pie' && (
            <Hider mobileOnly>
              <TextBlock>Press to see amounts</TextBlock>
            </Hider>
          )}

          <StyledRow>
            <SpendingChart payments={allPayments} chartType={chartType} />
          </StyledRow>

          <StyledRow gutter={[20, 20]}>
            {[
              {
                title: 'Past 30 Days',
                value: data?.spentPast30Days,
                color: token.colorErrorText,
              },
              {
                title: 'Past 365 Days',
                value: data?.spentPast365Days,
                color: token.colorInfoText,
              },
            ].map((item, index) => (
              <Col xs={24} sm={12} md={12} lg={12} key={index}>
                <Card size="small">
                  <Statistic
                    title={item.title}
                    value={renderAmountStats(item.value)}
                    valueStyle={{ color: item.color }}
                  />
                </Card>
              </Col>
            ))}
          </StyledRow>
        </>
      )}
    </MainContentWrapper>
  );
};

const StyledRow = styled(Row)`
  margin-bottom: 36px;
`;

export default Statistics;
