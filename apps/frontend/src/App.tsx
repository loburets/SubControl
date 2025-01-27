import React from 'react';
import { BrowserRouter } from 'react-router';
import { AppRouter } from './router/AppRouter';
import Layout from './components/Layout/Layout';
import { AntConfigProvider } from './components/Layout/AntConfigProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from './utils/bugsnag';

const queryClient = new QueryClient();

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AntConfigProvider>
            <Layout>
              <AppRouter />
            </Layout>
          </AntConfigProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
