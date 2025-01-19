import { Subscription } from '@prisma/client';
import {
  Period,
  SubscriptionStatsResponseDto,
  SubscriptionPaymentResponseDto,
  Currency,
} from '@subcontrol/shared-dtos/subscriptions';
import {
  addDays,
  addMonths,
  addWeeks,
  addYears,
  differenceInMonths,
  differenceInWeeks,
  differenceInYears,
  endOfYear,
  isAfter,
  isBefore,
  startOfDay,
  startOfYear,
  subDays,
  subYears,
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

  // starts from the first payment
  let totalSpent = centsPerPeriod;

  if (period === Period.MONTHLY) {
    const months = differenceInMonths(endDate, startedAt);
    totalSpent += months * centsPerPeriod;
  } else if (period === Period.YEARLY) {
    const years = differenceInYears(endDate, startedAt);
    totalSpent += years * centsPerPeriod;
  } else if (period === Period.WEEKLY) {
    const weeks = differenceInWeeks(endDate, startedAt);
    totalSpent += weeks * centsPerPeriod;
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

// Note: consider moving on client side if creates performance issues as synchronous calculations
export function getSubscriptionsStat(
  subscriptions: Subscription[]
): SubscriptionStatsResponseDto {
  const now = startOfDay(new Date());
  const next30Days = addDays(now, 30);
  const next365Days = addDays(now, 365);
  const past30Days = subDays(now, 30);
  const past365Days = subDays(now, 365);
  const thisYearStart = startOfYear(now);
  const thisYearEnd = endOfYear(now);
  const lastYearStart = startOfYear(subYears(now, 1));

  let next30DaysAmount = 0;
  let next365DaysAmount = 0;
  let totalSpent = 0;
  let expectedSpentThisYear = 0;
  let spentLastYear = 0;
  let spentPast30Days = 0;
  let spentPast365Days = 0;

  const nextPayments: SubscriptionPaymentResponseDto[] = [];
  const pastPayments: SubscriptionPaymentResponseDto[] = [];

  subscriptions.forEach((subscription) => {
    const { period, centsPerPeriod, startedAt, cancelledAt } = subscription;

    let currentStartOfPeriod = startOfDay(startedAt);
    // no need to calculate payments for subscriptions after it is inactive or longer than 1 year in the future
    const endDate = cancelledAt ? cancelledAt : next365Days;
    let count = 0;
    // prevent infinite loop or overloading the server by too old subscriptions
    const maxLoopCount = 52 * 50; // 50 years for weekly subscriptions

    // Calculate payment dates
    while (isBefore(currentStartOfPeriod, endDate) || count < maxLoopCount) {
      count++;
      const payment: SubscriptionPaymentResponseDto = {
        subscriptionId: subscription.id,
        currency: subscription.currency as Currency,
        subscriptionName: subscription.name,
        amount: centsPerPeriod,
        date: currentStartOfPeriod,
      };

      // process future payments
      if (isAfter(currentStartOfPeriod, now)) {
        nextPayments.push(payment);
        if (isBefore(payment.date, next30Days) && isAfter(payment.date, now)) {
          next30DaysAmount += payment.amount;
        }
        if (isBefore(payment.date, next365Days) && isAfter(payment.date, now)) {
          next365DaysAmount += payment.amount;
        }
        // process past payments
      } else {
        totalSpent += payment.amount;
        if (isAfter(payment.date, past30Days)) {
          spentPast30Days += payment.amount;
        }
        if (isAfter(payment.date, past365Days)) {
          spentPast365Days += payment.amount;
        }
        if (
          isAfter(payment.date, lastYearStart) &&
          isBefore(payment.date, thisYearStart)
        ) {
          spentLastYear += payment.amount;
        }
        pastPayments.push(payment);
      }

      if (
        isAfter(payment.date, thisYearStart) &&
        isBefore(payment.date, thisYearEnd)
      ) {
        expectedSpentThisYear += payment.amount;
      }

      switch (period) {
        case Period.WEEKLY:
          currentStartOfPeriod = addDays(currentStartOfPeriod, 7);
          break;
        case Period.MONTHLY:
          currentStartOfPeriod = addMonths(currentStartOfPeriod, 1);
          break;
        case Period.YEARLY:
          currentStartOfPeriod = addYears(currentStartOfPeriod, 1);
          break;
        default:
          throw new Error(`Unsupported subscription period: ${period}`);
      }
    }
  });

  return {
    nextPayments,
    next30DaysAmount,
    next365DaysAmount,
    pastPayments,
    totalSpent,
    expectedSpentThisYear,
    spentLastYear,
    spentPast30Days,
    spentPast365Days,
  };
}
