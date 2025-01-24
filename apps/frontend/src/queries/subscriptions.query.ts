import { useQuery } from '@tanstack/react-query';
import { SubscriptionListResponseDto } from '@subcontrol/shared-dtos/subscriptions';
import { axiosApiInstance } from '../utils/axiosInstances';

export const useSubscriptionList = () => {
  return useQuery<SubscriptionListResponseDto>({
    queryKey: ['subscriptions'],
    queryFn: async () => {
      const response = await axiosApiInstance.get<SubscriptionListResponseDto>(
        'api/v1/subscriptions'
      );
      return response.data;
    },
  });
};
