import React from 'react';
import { BrowserRouter } from 'react-router';
import { AppRouter } from './router/AppRouter';
import AppLayout from './components/Layout';

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <AppRouter />
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
