import React, { useEffect, useState } from 'react';
import {
  AmountResponseDto,
  SubscriptionPaymentResponseDto,
} from '@subcontrol/shared-dtos/subscriptions';
import { Currency, getCurrencySymbol } from '../../utils/subscriptionsHelper';
import { Card, Row, Col } from 'antd';
import styled from 'styled-components';

interface ChartOptions {
  responsive: boolean;
  plugins: {
    legend: {
      position: 'right' | 'bottom' | 'left' | 'top';
    };
    title: {
      display: boolean;
      text: string;
    };
  };
}

interface SpendingChartProps {
  pastPayments?: SubscriptionPaymentResponseDto[];
  nextPayments?: SubscriptionPaymentResponseDto[];
}

export const SpendingChart: React.FC<SpendingChartProps> = ({
  pastPayments = [],
  nextPayments = [],
}) => {
  const [PieComponent, setPieComponent] = useState<any>(null);

  useEffect(() => {
    const initChart = async () => {
      const { Chart, ArcElement, Tooltip, Legend } = await import('chart.js');

      Chart.register(ArcElement, Tooltip, Legend);

      const { Pie } = await import('react-chartjs-2');
      setPieComponent(() => Pie);
    };

    initChart();
  }, []);

  const getSubscriptionTotals = (
    payments: SubscriptionPaymentResponseDto[]
  ) => {
    const totals = new Map<string, Map<number, number>>();

    payments.forEach((payment) => {
      if (!totals.has(payment.currency)) {
        totals.set(payment.currency, new Map());
      }
      const currencyMap = totals.get(payment.currency)!;
      const currentAmount = currencyMap.get(payment.subscriptionId) || 0;
      currencyMap.set(payment.subscriptionId, currentAmount + payment.amount);
    });

    return totals;
  };

  const generateChartData = (
    subscriptionTotals: Map<number, number>,
    payments: SubscriptionPaymentResponseDto[]
  ) => {
    const subscriptionNames = new Map(
      payments.map((p) => [p.subscriptionId, p.subscriptionName])
    );

    const data = Array.from(subscriptionTotals.entries()).map(
      ([id, amount]) => ({
        id,
        amount,
        name: subscriptionNames.get(id) || 'Unknown',
      })
    );

    return {
      labels: data.map((item) => item.name),
      datasets: [
        {
          data: data.map((item) => item.amount / 100), // Convert cents to dollars
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)',
            'rgba(255, 159, 64, 0.5)',
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
  };

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

  const pastTotals = getSubscriptionTotals(pastPayments);
  const nextTotals = getSubscriptionTotals(nextPayments);
  const uniqueCurrencies = new Set([
    ...Array.from(pastTotals.keys()),
    ...Array.from(nextTotals.keys()),
  ]);

  return (
    <Row gutter={[20, 20]}>
      {Array.from(uniqueCurrencies).map((currency) => (
        <Col key={currency} xs={24} md={12}>
          <StyledCard
            title={`Distribution (${getCurrencySymbol(currency as Currency)})`}
          >
            {PieComponent && pastTotals.get(currency) && (
              <>
                <ChartTitle>Past Year Spending</ChartTitle>
                <PieComponent
                  options={options}
                  data={generateChartData(
                    pastTotals.get(currency)!,
                    pastPayments
                  )}
                />
              </>
            )}
            {PieComponent && nextTotals.get(currency) && (
              <>
                <ChartTitle>Next Year Spending</ChartTitle>
                <PieComponent
                  options={options}
                  data={generateChartData(
                    nextTotals.get(currency)!,
                    nextPayments
                  )}
                />
              </>
            )}
          </StyledCard>
        </Col>
      ))}
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
