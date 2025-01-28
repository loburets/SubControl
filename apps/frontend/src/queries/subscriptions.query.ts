import { useMutation, useQuery } from '@tanstack/react-query';
import {
  SubscriptionListResponseDto,
  SubscriptionRequestDto,
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

export const useSubscription = (subscriptionId: number) => {
  return useQuery<SubscriptionResponseDto>({
    queryKey: ['subscription', subscriptionId],
    queryFn: async () => {
      const response = await axiosApiInstance.get<SubscriptionResponseDto>(
        `api/v1/subscriptions/${subscriptionId}`
      );
      return hydrateSubscriptionDates(response.data);
    },
  });
};

export const useDeleteSubscription = () => {
  return useMutation({
    mutationFn: async (subscriptionId: number) => {
      await axiosApiInstance.delete(`api/v1/subscriptions/${subscriptionId}`);
    },
  });
};

export const useCreateSubscription = () => {
  return useMutation({
    mutationFn: async (data: SubscriptionRequestDto) => {
      await axiosApiInstance.post('api/v1/subscriptions', data);
    },
  });
};

export const useUpdateSubscription = () => {
  return useMutation({
    mutationFn: async ({
      data,
      subscriptionId,
    }: {
      data: SubscriptionRequestDto;
      subscriptionId: number;
    }) => {
      await axiosApiInstance.patch(
        `api/v1/subscriptions/${subscriptionId}`,
        data
      );
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
