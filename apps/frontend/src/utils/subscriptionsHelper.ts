import { SubscriptionResponseDto } from '@subcontrol/shared-dtos/subscriptions';
import { isBefore } from 'date-fns';

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
