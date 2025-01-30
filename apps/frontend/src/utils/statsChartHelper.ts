import { Currency } from './subscriptionsHelper';
import { SubscriptionPaymentResponseDto } from '@subcontrol/shared-dtos/subscriptions';
import { ChartType } from '../components/UI/SpendingChart';

interface SubscriptionTotal {
  subscriptionName: string;
  amount: number;
}

type SubscriptionsTotals = Map<number, SubscriptionTotal>;
type SubscriptionsTotalsPerCurrency = Map<Currency, SubscriptionsTotals>;
type ChartData = ReturnType<typeof generateChartDataPerSubscriptionsTotals>;
type ChartDataPerCurrency = Map<
  Currency,
  {
    pastYearData: ChartData;
    nextYearData: ChartData;
    thisYearData: ChartData;
  }
>;

const generateChartDataPerSubscriptionsTotals = (
  subscriptionTotals: SubscriptionsTotals,
  chartType: ChartType
) => {
  let data = Array.from(subscriptionTotals.entries())
    .map(([id, subscriptionTotal]) => ({
      id,
      amount: subscriptionTotal.amount / 100,
      name: subscriptionTotal.subscriptionName,
    }))
    .sort((a, b) => b.amount - a.amount);

  const totalAmount = data.reduce((acc, item) => acc + item.amount, 0);
  const maxPieChartAmount = 7;

  if (data.length > maxPieChartAmount && chartType === 'pie') {
    const topData = data.slice(0, maxPieChartAmount);
    const otherAmount = data
      .slice(maxPieChartAmount)
      .reduce((acc, item) => acc + item.amount, 0);

    data = [
      ...topData,
      {
        id: -1,
        amount: otherAmount,
        name: 'Other (See Bar Chart)',
      },
    ];
  }

  return {
    labels: data.map((item) => item.name),
    datasets: [
      {
        data: data.map((item) => item.amount),
        backgroundColor: Array.from({ length: 10 })
          .map((_) => [
            '#1677ffbb',
            '#444655bb',
            '#f02557bb',
            '#a9aabcbb',
            '#b0002abb',
            '#417a77bb',
            '#d666e4bb',
            '#ffc65dbb',
            '#a7aee6bb',
            '#00daf2bb',
            '#e93c00bb',
          ])
          .flat(),
        borderColor: Array.from({ length: 10 })
          .map((_) => [
            '#1677ff',
            '#444655',
            '#f02557',
            '#a9aabc',
            '#b0002a',
            '#417a77',
            '#d666e4',
            '#ffc65d',
            '#a7aee6',
            '#00daf2',
            '#e93c00',
          ])
          .flat(),
        borderWidth: 1,
      },
    ],
    totalAmount,
  };
};

const getPaymentsTotals = (payments: SubscriptionPaymentResponseDto[]) => {
  const totals: SubscriptionsTotalsPerCurrency = new Map();

  payments.forEach((payment) => {
    if (!totals.has(payment.currency)) {
      totals.set(payment.currency, new Map());
    }
    const currencyMap = totals.get(payment.currency)!;

    const currentAmount = currencyMap.get(payment.subscriptionId)?.amount || 0;
    currencyMap.set(payment.subscriptionId, {
      ...(currencyMap.get(payment.subscriptionId) || {
        subscriptionName: payment.subscriptionName,
      }),
      amount: currentAmount + payment.amount,
    });
  });

  return totals;
};

export const generateChartData = (
  payments: SubscriptionPaymentResponseDto[],
  chartType: ChartType
) => {
  const pastYearTotals = getPaymentsTotals(
    payments.filter(
      (payment) => payment.date.getFullYear() === new Date().getFullYear() - 1
    )
  );
  const thisYearTotals = getPaymentsTotals(
    payments.filter(
      (payment) => payment.date.getFullYear() === new Date().getFullYear()
    )
  );
  const nextYearTotals = getPaymentsTotals(
    payments.filter(
      (payment) => payment.date.getFullYear() === new Date().getFullYear() + 1
    )
  );

  const uniqueCurrencies = Array.from(
    new Set([
      ...Array.from(pastYearTotals.keys()),
      ...Array.from(nextYearTotals.keys()),
    ])
  ).sort(
    (a, b) =>
      (thisYearTotals.get(b)?.size || 0) - (thisYearTotals.get(a)?.size || 0)
  );

  const chartData: ChartDataPerCurrency = new Map();
  for (const currency of uniqueCurrencies) {
    chartData.set(currency, {
      nextYearData: generateChartDataPerSubscriptionsTotals(
        nextYearTotals.get(currency) || new Map(),
        chartType
      ),
      pastYearData: generateChartDataPerSubscriptionsTotals(
        pastYearTotals.get(currency) || new Map(),
        chartType
      ),
      thisYearData: generateChartDataPerSubscriptionsTotals(
        thisYearTotals.get(currency) || new Map(),
        chartType
      ),
    });
  }

  return { chartData, uniqueCurrencies };
};
