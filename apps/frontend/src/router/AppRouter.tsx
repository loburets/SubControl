import { Route, Routes } from 'react-router';
import { ROUTES } from './routes';
import Login from '../pages/Login';
import React from 'react';

export function AppRouter() {
  return (
    <Routes>
      <Route path={ROUTES.HOME}></Route>
      <Route path={ROUTES.SIGN_UP}></Route>
      <Route path={ROUTES.LOGIN} Component={Login}></Route>
    </Routes>
  );
}
