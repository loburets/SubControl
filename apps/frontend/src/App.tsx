import React from 'react';
import { BrowserRouter } from 'react-router';
import { AppRouter } from './router/AppRouter';
import Layout from './components/Layout/Layout';
import { AntConfigProvider } from './components/Layout/AntConfigProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AntConfigProvider>
          <Layout>
            <AppRouter />
          </Layout>
        </AntConfigProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
