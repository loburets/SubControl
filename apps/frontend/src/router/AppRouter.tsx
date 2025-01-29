import { Route, Routes } from 'react-router';
import { ROUTES } from './routes';
import Login from '../pages/Login';
import React from 'react';
import PrivateRoute from './PrivateRoute';
import PublicOnlyRoute from './PublicOnlyRoute';
import SignUp from '../pages/SignUp';
import SubscriptionList from '../pages/SubscriptionList';
import SubscriptionDetails from '../pages/SubscriptionDetails';
import SubscriptionCreate from '../pages/SubscriptionCreate';
import SubscriptionEdit from '../pages/SubscriptionEdit';
import PastPayments from '../pages/PastPayments';
import NextPayments from '../pages/NextPayments';

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
        Component={() => (
          <PrivateRoute>
            <SubscriptionList />
          </PrivateRoute>
        )}
      ></Route>
      <Route
        path={ROUTES.SUBSCRIPTION_DETAILS}
        Component={() => (
          <PrivateRoute>
            <SubscriptionDetails />
          </PrivateRoute>
        )}
      ></Route>
      <Route
        path={ROUTES.SUBSCRIPTION_CREATE}
        Component={() => (
          <PrivateRoute>
            <SubscriptionCreate />
          </PrivateRoute>
        )}
      ></Route>
      <Route
        path={ROUTES.SUBSCRIPTION_EDIT}
        Component={() => (
          <PrivateRoute>
            <SubscriptionEdit />
          </PrivateRoute>
        )}
      ></Route>
      <Route
        path={ROUTES.PAST_PAYMENTS}
        Component={() => (
          <PrivateRoute>
            <PastPayments />
          </PrivateRoute>
        )}
      />
      <Route
        path={ROUTES.NEXT_PAYMENTS}
        Component={() => (
          <PrivateRoute>
            <NextPayments />
          </PrivateRoute>
        )}
      />
    </Routes>
  );
}
