import React, { useEffect, useMemo, useState } from 'react';
import { SubscriptionPaymentResponseDto } from '@subcontrol/shared-dtos/subscriptions';
import {
  Currency,
  formatPrice,
  getCurrencyName,
  getCurrencySymbol,
} from '../../utils/subscriptionsHelper';
import { Card, Row, Col, Skeleton } from 'antd';
import styled from 'styled-components';
import { generateChartData } from '../../utils/statsChartHelper';
import { Title } from './Title';
import { TextBlock } from './TextBlock';

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

  const options = {
    plugins: {
      legend: {
        position: 'right',
      },
    },
    offset: 5,
  };

  const { uniqueCurrencies, chartData } = useMemo(
    () => generateChartData(payments),
    [payments]
  );

  return (
    <Row gutter={[20, 20]}>
      {uniqueCurrencies.map((currency) => {
        return (
          <Col key={currency} span={24}>
            <Card
              title={`Spending ${getCurrencySymbol(currency as Currency)} (${getCurrencyName(currency as Currency)})`}
            >
              {PieComponent && chartData.has(currency) ? (
                <>
                  <Row gutter={[8, 0]}>
                    {[
                      {
                        year: new Date().getFullYear() - 1,
                        data: chartData.get(currency)?.pastYearData,
                      },
                      {
                        year: new Date().getFullYear(),
                        data: chartData.get(currency)?.thisYearData,
                      },
                      {
                        year: new Date().getFullYear() + 1,
                        data: chartData.get(currency)?.nextYearData,
                      },
                    ].map(({ year, data }) => (
                      <Col key={year} xs={24} sm={24} md={24} lg={8}>
                        <ChartTitle level={5} noAdoption>
                          {year} Spending
                        </ChartTitle>
                        <ChartTextBlock>
                          {formatPrice((data?.totalAmount || 0) * 100)}
                          {getCurrencySymbol(currency)}
                        </ChartTextBlock>
                        <PieComponent
                          options={options}
                          data={data}
                          style={{ maxHeight: 150 }}
                        />
                      </Col>
                    ))}
                  </Row>
                </>
              ) : (
                <Skeleton />
              )}
            </Card>
          </Col>
        );
      })}
    </Row>
  );
};

const ChartTitle = styled(Title)`
  text-align: center;
  margin-bottom: 16px !important;
`;

const ChartTextBlock = styled(TextBlock)`
  text-align: center;
  width: 100%;
  margin-bottom: 8px;
`;
