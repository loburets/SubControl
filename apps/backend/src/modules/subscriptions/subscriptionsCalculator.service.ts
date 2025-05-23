import { Subscription } from '@prisma/client';
import {
  Period,
  SubscriptionStatsResponseDto,
  SubscriptionPaymentResponseDto,
  Currency,
  AmountResponseDto,
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
import { Injectable } from '@nestjs/common';

type AmountPerCurrency = Partial<Record<Currency, number>>;

@Injectable()
export class SubscriptionsCalculatorService {
  getSubscriptionCalculatedData(subscription: Subscription): {
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
    let totalSpent = 0;

    if (startedAt <= now) {
      totalSpent += centsPerPeriod;
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
    }

    let nextPaymentDate: Date | null = null;
    if (startedAt >= now) {
      nextPaymentDate = startedAt;
    } else if (!cancelledAt || cancelledAt > now) {
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
  getSubscriptionsStat(
    subscriptions: Subscription[]
  ): SubscriptionStatsResponseDto {
    const now = startOfDay(new Date());
    const next30Days = addDays(now, 30);
    const next365Days = addDays(now, 365);
    // no need to calculate payments for subscriptions longer than X years in the future
    const calculationsLimit = addYears(now, 5);
    const past30Days = subDays(now, 30);
    const past365Days = subDays(now, 365);
    const thisYearStart = startOfYear(now);
    const thisYearEnd = endOfYear(now);
    const lastYearStart = startOfYear(subYears(now, 1));

    const next30DaysAmount: AmountPerCurrency = {};
    const next365DaysAmount: AmountPerCurrency = {};
    const totalSpent: AmountPerCurrency = {};
    const expectedSpentThisYear: AmountPerCurrency = {};
    const spentLastYear: AmountPerCurrency = {};
    const spentPast30Days: AmountPerCurrency = {};
    const spentPast365Days: AmountPerCurrency = {};

    const nextPayments: SubscriptionPaymentResponseDto[] = [];
    const pastPayments: SubscriptionPaymentResponseDto[] = [];

    subscriptions.forEach((subscription) => {
      const { period, centsPerPeriod, startedAt, cancelledAt } = subscription;

      let currentStartOfPeriod = startOfDay(startedAt);
      // no need to calculate payments for subscriptions after it is cancelled or longer some time limit in the future
      const endDate =
        cancelledAt && isBefore(cancelledAt, calculationsLimit)
          ? cancelledAt
          : calculationsLimit;
      let count = 0;
      // prevent infinite loop or overloading the server by too old subscriptions
      const maxLoopCount = 52 * 50; // 50 years for weekly subscriptions

      // Calculate payment dates
      while (isBefore(currentStartOfPeriod, endDate) && count < maxLoopCount) {
        count++;
        const payment: SubscriptionPaymentResponseDto = {
          subscriptionId: subscription.id,
          currency: subscription.currency as Currency,
          subscriptionName: subscription.name,
          amount: centsPerPeriod,
          date: currentStartOfPeriod,
          period: subscription.period as Period,
        };

        // process future payments
        if (isAfter(currentStartOfPeriod, now)) {
          nextPayments.push(payment);
          if (
            isBefore(payment.date, next30Days) &&
            isAfter(payment.date, now)
          ) {
            this.addAmountFromPaymentToSumObject(next30DaysAmount, payment);
          }
          if (
            isBefore(payment.date, next365Days) &&
            isAfter(payment.date, now)
          ) {
            this.addAmountFromPaymentToSumObject(next365DaysAmount, payment);
          }
          // process past payments
        } else {
          this.addAmountFromPaymentToSumObject(totalSpent, payment);

          if (isAfter(payment.date, past30Days)) {
            this.addAmountFromPaymentToSumObject(spentPast30Days, payment);
          }
          if (isAfter(payment.date, past365Days)) {
            this.addAmountFromPaymentToSumObject(spentPast365Days, payment);
          }
          if (
            isAfter(payment.date, lastYearStart) &&
            isBefore(payment.date, thisYearStart)
          ) {
            this.addAmountFromPaymentToSumObject(spentLastYear, payment);
          }
          pastPayments.push(payment);
        }

        if (
          isAfter(payment.date, thisYearStart) &&
          isBefore(payment.date, thisYearEnd)
        ) {
          this.addAmountFromPaymentToSumObject(expectedSpentThisYear, payment);
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
      pastPayments,
      nextPayments,
      next30DaysAmount:
        this.amountPerCurrencyToArrayOfAmounts(next30DaysAmount),
      next365DaysAmount:
        this.amountPerCurrencyToArrayOfAmounts(next365DaysAmount),
      totalSpent: this.amountPerCurrencyToArrayOfAmounts(totalSpent),
      expectedSpentThisYear: this.amountPerCurrencyToArrayOfAmounts(
        expectedSpentThisYear
      ),
      spentLastYear: this.amountPerCurrencyToArrayOfAmounts(spentLastYear),
      spentPast30Days: this.amountPerCurrencyToArrayOfAmounts(spentPast30Days),
      spentPast365Days:
        this.amountPerCurrencyToArrayOfAmounts(spentPast365Days),
    };
  }

  private addAmountFromPaymentToSumObject(
    object: AmountPerCurrency,
    payment: SubscriptionPaymentResponseDto
  ) {
    if (!payment.amount) {
      return;
    }

    object[payment.currency] = (object[payment.currency] ?? 0) + payment.amount;
  }

  private amountPerCurrencyToArrayOfAmounts(
    object: AmountPerCurrency
  ): AmountResponseDto[] {
    return Object.entries(object).map(([currency, amount]) => ({
      currency: currency as Currency,
      amount,
    }));
  }
}
