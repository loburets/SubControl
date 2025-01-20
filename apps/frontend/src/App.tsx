import React from 'react';
import { BrowserRouter } from 'react-router';
import { AppRouter } from './router/AppRouter';
import Layout from './components/Layout/Layout';
import { AntConfigProvider } from './components/Layout/AntConfigProvider';

function App() {
  return (
    <BrowserRouter>
      <AntConfigProvider>
        <Layout>
          <AppRouter />
        </Layout>
      </AntConfigProvider>
    </BrowserRouter>
  );
}

export default App;
