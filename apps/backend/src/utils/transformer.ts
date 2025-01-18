import { plainToInstance } from 'class-transformer';
import { SubscriptionResponseDto } from '@subcontrol/shared-dtos/subscriptions';
import { Subscription } from '@prisma/client';
import { getSubscriptionCalculatedData } from '../modules/subscriptions/subscriptions.calculator';

export function transformToResponseDto<T>(data: object, cls: new () => T): T {
  return plainToInstance(cls, data, {
    excludeExtraneousValues: true,
  });
}

export function transformToSubscriptionResponseDto(subscription: Subscription) {
  const calculatedData = getSubscriptionCalculatedData(subscription);

  const result = { ...subscription, ...calculatedData };
  return transformToResponseDto(result, SubscriptionResponseDto);
}
