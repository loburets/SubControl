import React from 'react';
import { Button } from 'antd';
import { BrowserRouter, NavLink } from 'react-router';
import { ROUTES } from './router/routes';
import { AppRouter } from './router/AppRouter';

function App() {
  return (
    <BrowserRouter>
      {/*TODO: Move to navigation component*/}
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
      </div>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
