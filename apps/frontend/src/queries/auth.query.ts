import { useAuthStore } from '../store/auth.store';
import { useMutation } from '@tanstack/react-query';
import {
  AuthResponseDto,
  LoginUserRequestDto,
} from '@subcontrol/shared-dtos/auth';
import axiosApiInstance from '../utils/axiosInstances';

export const useLoginMutation = () => {
  const setToken = useAuthStore((state) => state.setToken);

  return useMutation({
    mutationFn: async (data: LoginUserRequestDto) => {
      const response = await axiosApiInstance.post('/api/v1/auth/login', data);
      return response.data;
    },
    onSuccess: (data: AuthResponseDto) => {
      setToken(data.accessToken);
      localStorage.setItem('token', data.accessToken);
    },
  });
};
