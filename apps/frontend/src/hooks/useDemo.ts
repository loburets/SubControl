import { useNavigate } from 'react-router';
import { ROUTES } from '../router/routes';
import { useDemoMutation } from '../queries/auth.query';
import { useCallback } from 'react';

export const useDemo = () => {
  const navigate = useNavigate();
  const demoMutation = useDemoMutation();

  const startDemo = useCallback(() => {
    demoMutation.mutate(undefined, {
      onSuccess: () => {
        navigate(ROUTES.HOME);
      },
    });
  }, [demoMutation, navigate]);

  return {
    isDemoLoading: demoMutation.isPending,
    demoError: demoMutation.error,
    startDemo,
  };
};
