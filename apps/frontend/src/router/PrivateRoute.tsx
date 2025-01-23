import React from 'react';
import { Navigate } from 'react-router';
import { useAuthStore } from '../store/auth.store';
import { ROUTES } from './routes';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const token = useAuthStore((state) => state.token);

  return token ? <>{children}</> : <Navigate to={ROUTES.LOGIN} replace />;
};

export default PrivateRoute;
