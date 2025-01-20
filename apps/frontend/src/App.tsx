import React from 'react';
import { Button } from 'antd';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router';
import { ROUTES } from './router/routes';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Button>test</Button>
        <nav>
          <ul>
            <li>
              <NavLink to={ROUTES.HOME}>Home</NavLink>
            </li>
            <li>
              <NavLink to={ROUTES.SIGN_UP}>Sign Up</NavLink>
            </li>
            <li>
              <NavLink to={ROUTES.LOGIN}>Login</NavLink>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path={ROUTES.HOME}></Route>
          <Route path={ROUTES.SIGN_UP}></Route>
          <Route path={ROUTES.LOGIN}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
