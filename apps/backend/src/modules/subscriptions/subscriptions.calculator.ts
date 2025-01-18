import { Subscription } from '@prisma/client';
import { Period } from '@subcontrol/shared-dtos/subscriptions';

export function getSubscriptionCalculatedData(subscription: Subscription): {
  costPerMonth: number;
  costPerYear: number;
} {
  const { period, centsPerPeriod } = subscription;

  const costPerMonth =
    period === Period.MONTHLY
      ? centsPerPeriod
      : period === Period.YEARLY
        ? centsPerPeriod / 12
        : centsPerPeriod * 4.345; // Approximate weeks in a month

  const costPerYear =
    period === Period.YEARLY
      ? centsPerPeriod
      : period === Period.MONTHLY
        ? centsPerPeriod * 12
        : centsPerPeriod * 52; // Weeks in a year

  return { costPerMonth, costPerYear };
}
