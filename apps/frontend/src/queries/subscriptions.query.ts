import { useQuery } from '@tanstack/react-query';
import {
  SubscriptionListResponseDto,
  SubscriptionResponseDto,
} from '@subcontrol/shared-dtos/subscriptions';
import { axiosApiInstance } from '../utils/axiosInstances';

export const useSubscriptionList = () => {
  return useQuery<SubscriptionListResponseDto>({
    queryKey: ['subscriptions'],
    queryFn: async () => {
      const response = await axiosApiInstance.get<SubscriptionListResponseDto>(
        'api/v1/subscriptions'
      );

      return {
        subscriptions: response.data.subscriptions.map(
          hydrateSubscriptionDates
        ),
      };
    },
  });
};

const hydrateSubscriptionDates = (
  subscription: SubscriptionResponseDto
): SubscriptionResponseDto => ({
  ...subscription,
  nextPaymentDate: subscription.nextPaymentDate
    ? new Date(subscription.nextPaymentDate)
    : null,
  createdAt: new Date(subscription.createdAt),
});
