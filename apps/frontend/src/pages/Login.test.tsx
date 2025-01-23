import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { useLoginMutation } from '../queries/auth.query';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Login from './Login';

jest.mock('../queries/auth.query');

jest.mock('react-router', () => {
  const actual = jest.requireActual('react-router');
  return {
    ...actual,
    useNavigate: jest.fn(),
  };
});

const queryClient = new QueryClient();

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>{ui}</BrowserRouter>
    </QueryClientProvider>
  );
};

describe('Login Component', () => {
  it.only('renders correctly', () => {
    const mutateMock = jest.fn();
    (useLoginMutation as jest.Mock).mockReturnValue({
      mutate: mutateMock,
      isPending: false,
      isError: false,
    });

    renderWithProviders(<Login />);
    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
  });
});
