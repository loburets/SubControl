import { Route, Routes } from 'react-router';
import { ROUTES } from './routes';
import Login from '../pages/Login';
import React from 'react';
import PrivateRoute from './PrivateRoute';
import PublicOnlyRoute from './PublicOnlyRoute';

export function AppRouter() {
  return (
    <Routes>
      <Route
        path={ROUTES.HOME}
        Component={() => <PrivateRoute>Home</PrivateRoute>}
      ></Route>
      <Route
        path={ROUTES.LOGIN}
        Component={() => (
          <PublicOnlyRoute>
            <Login />
          </PublicOnlyRoute>
        )}
      ></Route>
    </Routes>
  );
}
