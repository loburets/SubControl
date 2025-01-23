import { Route, Routes } from 'react-router';
import { ROUTES } from './routes';
import Login from '../pages/Login';
import React from 'react';
import PrivateRoute from './PrivateRoute';
import PublicOnlyRoute from './PublicOnlyRoute';
import SignUp from '../pages/SignUp';

export function AppRouter() {
  return (
    <Routes>
      {/* public only routes */}
      <Route
        path={ROUTES.LOGIN}
        Component={() => (
          <PublicOnlyRoute>
            <Login />
          </PublicOnlyRoute>
        )}
      ></Route>
      <Route
        path={ROUTES.SIGNUP}
        Component={() => (
          <PublicOnlyRoute>
            <SignUp />
          </PublicOnlyRoute>
        )}
      ></Route>
      {/* private routes */}
      <Route
        path={ROUTES.HOME}
        Component={() => <PrivateRoute>Home</PrivateRoute>}
      ></Route>
    </Routes>
  );
}
