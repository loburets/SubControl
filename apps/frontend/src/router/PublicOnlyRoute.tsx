import React from 'react';
import { Navigate } from 'react-router';
import { useAuthStore } from '../store/auth.store';
import { ROUTES } from './routes';

interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicOnlyRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const token = useAuthStore((state) => state.token);

  return token ? <Navigate to={ROUTES.HOME} replace /> : <>{children}</>;
};

export default PublicOnlyRoute;
