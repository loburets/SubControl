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

interface SpendingChartProps {
  payments?: SubscriptionPaymentResponseDto[];
}

export const SpendingChart: React.FC<SpendingChartProps> = ({
  payments = [],
}) => {
  // as dynamically imported
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const [PieComponent, setPieComponent] = useState<any>(null);
  const screens = Grid.useBreakpoint();
  const { token } = theme.useToken();

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
  };

  const { uniqueCurrencies, chartData } = useMemo(
    () => generateChartData(payments, token),
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
                  <Row
                    gutter={[16, 16]}
                    style={
                      // workaround to not update ant card body puddings on mobile
                      screens.md ? {} : { marginTop: -16, marginBottom: -8 }
                    }
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
                          {formatPrice((data?.totalAmount || 0) * 100)}
                          {getCurrencySymbol(currency)}
                        </ChartTextBlock>
                        <PieComponent
                          options={options}
                          data={data}
                          style={{ maxHeight: screens.md ? 160 : 120 }}
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
