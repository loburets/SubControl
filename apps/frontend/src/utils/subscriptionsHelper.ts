import { SubscriptionResponseDto } from '@subcontrol/shared-dtos/subscriptions';
import { isBefore } from 'date-fns';
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
  return isBefore(
    a.nextPaymentDate || new Date(),
    b.nextPaymentDate || new Date()
  )
    ? -1
    : 1;
};

export const getSubscriptionUiData = (
  subscription: SubscriptionResponseDto
) => {
  const periodTagColor: LiteralUnion<PresetColorType | PresetStatusColorType> =
    subscription.period === Period.MONTHLY
      ? 'blue'
      : subscription.period === Period.YEARLY
        ? 'cyan'
        : 'purple';

  const periodText =
    subscription.period === Period.MONTHLY
      ? 'Monthly'
      : subscription.period === Period.YEARLY
        ? 'Yearly'
        : 'Weekly';

  return {
    periodTagColor,
    periodText,
  };
};
