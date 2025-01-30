import React, { useEffect, useMemo, useState } from 'react';
import { SubscriptionPaymentResponseDto } from '@subcontrol/shared-dtos/subscriptions';
import {
  Currency,
  formatPrice,
  getCurrencyName,
  getCurrencySymbol,
} from '../../utils/subscriptionsHelper';
import { Card, Row, Col, Skeleton, theme, GlobalToken, Grid } from 'antd';
import styled from 'styled-components';
import { generateChartData } from '../../utils/statsChartHelper';
import { Title } from './Title';
import { TextBlock } from './TextBlock';

export type ChartType = 'pie' | 'bar';

interface SpendingChartProps {
  payments?: SubscriptionPaymentResponseDto[];
  chartType: ChartType;
}

export const SpendingChart: React.FC<SpendingChartProps> = ({
  payments = [],
  chartType,
}) => {
  // as dynamically imported
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const [ChartComponent, setChartComponent] = useState<any>(null);
  const screens = Grid.useBreakpoint();
  const { token } = theme.useToken();

  useEffect(() => {
    const initChart = async () => {
      const {
        Chart,
        ArcElement,
        BarElement,
        CategoryScale,
        LinearScale,
        Tooltip,
        Legend,
      } = await import('chart.js');

      Chart.register(
        ArcElement,
        BarElement,
        CategoryScale,
        LinearScale,
        Tooltip,
        Legend
      );

      const { Pie, Bar } = await import('react-chartjs-2');
      setChartComponent({ pie: Pie, bar: Bar });
    };

    initChart();
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: chartType === 'pie' ? 'right' : 'left',
        labels: {
          padding: 6,
          boxWidth: 12,
          font: {
            size: 12,
          },
          generateLabels: (chart: any) => {
            const data = chart.data;
            if (data.labels.length && data.datasets.length) {
              return data.labels.map((label: string, i: number) => {
                const value = data.datasets[0].data[i];
                return {
                  text:
                    chartType === 'pie'
                      ? label
                      : `${label} (${value.toFixed(2)})`,
                  fillStyle: data.datasets[0].backgroundColor[i],
                  strokeStyle: data.datasets[0].borderColor[i],
                  lineWidth: 1,
                  hidden: false,
                  index: i,
                };
              });
            }
            return [];
          },
        },
      },
    },
    ...(chartType === 'bar' && {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      indexAxis: 'y',
    }),
  };

  const { uniqueCurrencies, chartData } = useMemo(
    () => generateChartData(payments, chartType),
    [payments, chartType]
  );

  const SelectedChart = ChartComponent?.[chartType];

  return (
    <Row gutter={[20, 20]}>
      {uniqueCurrencies.map((currency) => (
        <Col key={currency} span={24}>
          <Card
            title={`Spending ${getCurrencySymbol(currency as Currency)} (${getCurrencyName(currency as Currency)})`}
          >
            {SelectedChart && chartData.has(currency) ? (
              <Row
                gutter={[16, 16]}
                style={screens.md ? {} : { marginTop: -16, marginBottom: -8 }}
              >
                {[
                  {
                    year: new Date().getFullYear() - 1,
                    data: chartData.get(currency)?.pastYearData,
                  },
                  {
                    year: `${new Date().getFullYear()} planned`,
                    data: chartData.get(currency)?.thisYearData,
                  },
                  {
                    year: `${new Date().getFullYear() + 1} planned`,
                    data: chartData.get(currency)?.nextYearData,
                  },
                ].map(({ year, data }) => (
                  <Col key={year} xs={24} sm={24} md={8} lg={8}>
                    <ChartTitle level={5} noAdoption $token={token}>
                      {year} Spending
                    </ChartTitle>
                    <ChartTextBlock $token={token}>
                      {getCurrencySymbol(currency)}
                      {formatPrice((data?.totalAmount || 0) * 100)}
                    </ChartTextBlock>
                    <SelectedChart
                      options={options}
                      data={data}
                      style={{
                        maxHeight: screens.md ? 160 : 120,
                      }}
                    />
                  </Col>
                ))}
              </Row>
            ) : (
              <Skeleton />
            )}
          </Card>
        </Col>
      ))}
    </Row>
  );
};

const ChartTitle = styled(Title)<{
  $token: GlobalToken;
}>`
  text-align: center;
  margin-bottom: 16px !important;

  //mobile
  @media (max-width: ${({ $token }) => $token.screenSMMax}px) {
    margin-bottom: 4px !important;
    margin-top: 12px !important;
  }
`;

const ChartTextBlock = styled(TextBlock)<{
  $token: GlobalToken;
}>`
  text-align: center;
  width: 100%;
  margin-bottom: 12px;

  //mobile
  @media (max-width: ${({ $token }) => $token.screenSMMax}px) {
    margin-bottom: 4px;
  }
`;
