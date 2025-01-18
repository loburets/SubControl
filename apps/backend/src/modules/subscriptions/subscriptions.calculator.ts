import { Subscription } from '@prisma/client';
import { Period } from '@subcontrol/shared-dtos/subscriptions';
import {
  addMonths,
  addWeeks,
  addYears,
  differenceInMonths,
  differenceInWeeks,
  differenceInYears,
} from 'date-fns';

export function getSubscriptionCalculatedData(subscription: Subscription): {
  costPerMonth: number;
  costPerYear: number;
  totalSpent: number;
  nextPaymentDate: Date | null;
} {
  const { period, centsPerPeriod, cancelledAt, startedAt } = subscription;

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

  const now = new Date();
  const endDate = cancelledAt || now;
  let totalSpent = 0;

  if (period === Period.MONTHLY) {
    const months = differenceInMonths(endDate, startedAt);
    totalSpent = months * centsPerPeriod;
  } else if (period === Period.YEARLY) {
    const years = differenceInYears(endDate, startedAt);
    totalSpent = years * centsPerPeriod;
  } else if (period === Period.WEEKLY) {
    const weeks = differenceInWeeks(endDate, startedAt);
    totalSpent = weeks * centsPerPeriod;
  }

  let nextPaymentDate: Date | null = null;
  if (!cancelledAt || cancelledAt > now) {
    if (period === Period.MONTHLY) {
      nextPaymentDate = addMonths(
        startedAt,
        Math.ceil(differenceInMonths(now, startedAt)) + 1
      );
    } else if (period === Period.YEARLY) {
      nextPaymentDate = addYears(
        startedAt,
        Math.ceil(differenceInYears(now, startedAt)) + 1
      );
    } else if (period === Period.WEEKLY) {
      nextPaymentDate = addWeeks(
        startedAt,
        Math.ceil(differenceInWeeks(now, startedAt)) + 1
      );
    }
  }

  return {
    costPerMonth: Math.ceil(costPerMonth),
    costPerYear: Math.ceil(costPerYear),
    totalSpent: Math.ceil(totalSpent),
    nextPaymentDate,
  };
}
