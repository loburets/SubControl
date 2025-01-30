import { Currency } from './subscriptionsHelper';
import { SubscriptionPaymentResponseDto } from '@subcontrol/shared-dtos/subscriptions';

export interface ChartOptions {
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
  subscriptionTotals: SubscriptionsTotals
) => {
  const data = Array.from(subscriptionTotals.entries()).map(
    ([id, subscriptionTotal]) => ({
      id,
      amount: subscriptionTotal.amount / 100,
      name: subscriptionTotal.subscriptionName,
    })
  );

  return {
    labels: data.map((item) => item.name),
    datasets: [
      {
        data: data.map((item) => item.amount),
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
  payments: SubscriptionPaymentResponseDto[]
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
  );

  const chartData: ChartDataPerCurrency = new Map();
  for (const currency of uniqueCurrencies) {
    chartData.set(currency, {
      nextYearData: generateChartDataPerSubscriptionsTotals(
        nextYearTotals.get(currency) || new Map()
      ),
      pastYearData: generateChartDataPerSubscriptionsTotals(
        pastYearTotals.get(currency) || new Map()
      ),
      thisYearData: generateChartDataPerSubscriptionsTotals(
        thisYearTotals.get(currency) || new Map()
      ),
    });
  }

  return { chartData, uniqueCurrencies };
};
