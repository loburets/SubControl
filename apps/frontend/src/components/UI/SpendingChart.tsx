import React, { useEffect, useMemo, useState } from 'react';
import { SubscriptionPaymentResponseDto } from '@subcontrol/shared-dtos/subscriptions';
import {
  Currency,
  getCurrencyName,
  getCurrencySymbol,
} from '../../utils/subscriptionsHelper';
import { Card, Row, Col, Skeleton } from 'antd';
import styled from 'styled-components';
import { ChartOptions, generateChartData } from '../../utils/statsChartHelper';

interface SpendingChartProps {
  payments?: SubscriptionPaymentResponseDto[];
}

export const SpendingChart: React.FC<SpendingChartProps> = ({
  payments = [],
}) => {
  // as dynamically imported
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const [PieComponent, setPieComponent] = useState<any>(null);

  useEffect(() => {
    const initChart = async () => {
      const { Chart, ArcElement, Tooltip, Legend } = await import('chart.js');

      Chart.register(ArcElement, Tooltip, Legend);

      const { Pie } = await import('react-chartjs-2');
      setPieComponent(Pie);
    };

    initChart();
  }, []);

  const options: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Subscription Distribution',
      },
    },
  };

  const { uniqueCurrencies, chartData } = useMemo(
    () => generateChartData(payments),
    [payments]
  );

  return (
    <Row gutter={[20, 20]}>
      {uniqueCurrencies.map((currency) => {
        return (
          <Col key={currency} xs={24} md={12}>
            <StyledCard
              title={`Spending ${getCurrencySymbol(currency as Currency)} (${getCurrencyName(currency as Currency)} )`}
            >
              {PieComponent && chartData.has(currency) ? (
                <>
                  <ChartTitle>Past Year Spending</ChartTitle>
                  <PieComponent
                    options={options}
                    data={chartData.get(currency)?.pastYearData}
                  />
                  <ChartTitle>This Year Spending</ChartTitle>
                  <PieComponent
                    options={options}
                    data={chartData.get(currency)?.thisYearData}
                  />
                  <ChartTitle>Next Year Spending</ChartTitle>
                  <PieComponent
                    options={options}
                    data={chartData.get(currency)?.nextYearData}
                  />
                </>
              ) : (
                <Skeleton />
              )}
            </StyledCard>
          </Col>
        );
      })}
    </Row>
  );
};

const StyledCard = styled(Card)`
  margin-bottom: 20px;
`;

const ChartTitle = styled.h3`
  text-align: center;
  margin: 20px 0;
  color: rgba(0, 0, 0, 0.85);
`;
