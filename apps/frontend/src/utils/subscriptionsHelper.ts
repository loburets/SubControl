import {
  SubscriptionResponseDto,
  SubscriptionPaymentResponseDto,
} from '@subcontrol/shared-dtos/subscriptions';
import dayjs from 'dayjs';
import type { LiteralUnion } from 'antd/es/_util/type';
import type {
  PresetColorType,
  PresetStatusColorType,
} from 'antd/es/_util/colors';

// Can not import enums from shared-dtos as it required to remove
// swagger decorators or setup some polyfills for the nest dependencies.
// So it's easier to duplicate them here for sake of simplicity.

export enum Currency {
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP',
  JPY = 'JPY',
  AUD = 'AUD',
  CAD = 'CAD',
  RUB = 'RUB',
  TRY = 'TRY',
  OTHER = 'OTHER',
}

export enum Period {
  YEARLY = 'YEARLY',
  MONTHLY = 'MONTHLY',
  WEEKLY = 'WEEKLY',
}

export const sortSubscriptionsByNextPayment = (
  a: SubscriptionResponseDto,
  b: SubscriptionResponseDto
) => {
  if (
    (!a.nextPaymentDate && !b.nextPaymentDate) ||
    a.nextPaymentDate?.toDateString() === b.nextPaymentDate?.toDateString()
  ) {
    return 0;
  }
  return dayjs(a.nextPaymentDate || new Date()).isBefore(
    dayjs(b.nextPaymentDate || new Date())
  )
    ? -1
    : 1;
};

export const sortPaymentsByDate =
  (order: 'asc' | 'desc') =>
  (a: SubscriptionPaymentResponseDto, b: SubscriptionPaymentResponseDto) => {
    if (
      (!a.date && !b.date) ||
      a.date?.toDateString() === b.date?.toDateString()
    ) {
      return 0;
    }
    return dayjs(a.date || new Date()).isBefore(dayjs(b.date || new Date()))
      ? order === 'asc'
        ? -1
        : 1
      : order === 'asc'
        ? 1
        : -1;
  };

export const getSubscriptionUiData = (
  subscription: SubscriptionResponseDto
) => {
  const periodTagColor = getPeriodTagColor(subscription.period);
  const { periodText, periodName } = getPeriodNaming(subscription.period);

  return {
    periodTagColor,
    periodText,
    periodName,
    currencySymbol: getCurrencySymbol(subscription.currency),
    price: formatPrice(subscription.centsPerPeriod),
    spentAmount: formatPrice(subscription.totalSpent),
    costPerYear: formatPrice(subscription.costPerYear),
    costPerMonth: formatPrice(subscription.costPerMonth),
    nextPaymentDate: subscription.nextPaymentDate
      ? formatDate(subscription.nextPaymentDate)
      : null,
    cancelledDate: subscription.cancelledAt
      ? formatDate(subscription.cancelledAt)
      : null,
  };
};

export const getCurrencySymbol = (currency: Currency) => {
  switch (currency) {
    case Currency.EUR:
      return '€';
    case Currency.GBP:
      return '£';
    case Currency.JPY:
      return '¥';
    case Currency.AUD:
      return 'A$';
    case Currency.CAD:
      return 'C$';
    case Currency.RUB:
      return '₽';
    case Currency.TRY:
      return '₺';
    case Currency.USD:
      return '$';
    case Currency.OTHER:
      return '(other)';
    default:
      return '$';
  }
};

export function formatPrice(cents: number) {
  return (cents / 100).toFixed(2);
}

export function formatDate(date: Date) {
  return dayjs(date).format('DD MMM YYYY');
}

export function getPeriodTagColor(
  period: Period
): LiteralUnion<PresetColorType | PresetStatusColorType> {
  return period === Period.MONTHLY
    ? 'blue'
    : period === Period.YEARLY
      ? 'cyan'
      : 'purple';
}

export function getPeriodNaming(period: Period) {
  const periodText =
    period === Period.MONTHLY
      ? 'Monthly'
      : period === Period.YEARLY
        ? 'Yearly'
        : 'Weekly';

  const periodName =
    period === Period.MONTHLY
      ? 'Month'
      : period === Period.YEARLY
        ? 'Year'
        : 'Week';
  return { periodText, periodName };
}
