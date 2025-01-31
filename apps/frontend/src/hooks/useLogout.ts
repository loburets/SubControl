import { useNavigate } from 'react-router';
import { useAuthStore } from '../store/auth.store';
import { ROUTES } from '../router/routes';

export const useLogout = () => {
  const navigate = useNavigate();
  const clearToken = useAuthStore((state) => state.clearToken);
  return () => {
    clearToken();
    navigate(ROUTES.LOGIN);
  };
};
