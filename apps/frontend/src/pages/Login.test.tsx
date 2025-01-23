import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { useLoginMutation } from '../queries/auth.query';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Login from './Login';

jest.mock('../queries/auth.query', () => ({
  useLoginMutation: jest.fn(),
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
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
  it('renders correctly', () => {
    renderWithProviders(<Login />);
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
  });

  it('shows validation errors for empty fields', async () => {
    renderWithProviders(<Login />);
    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    await waitFor(() => {
      expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
    });
  });

  it('shows validation error for invalid email format', async () => {
    renderWithProviders(<Login />);
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'invalid-email' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/Enter a valid email address/i)
      ).toBeInTheDocument();
    });
  });

  it('submits the form with valid data', async () => {
    const mutateMock = jest.fn();
    (useLoginMutation as jest.Mock).mockReturnValue({
      mutate: mutateMock,
      isPending: false,
      isError: false,
    });

    renderWithProviders(<Login />);
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    await waitFor(() => {
      expect(mutateMock).toHaveBeenCalledWith(
        { email: 'test@example.com', password: 'password123' },
        expect.any(Object)
      );
    });
  });

  it('displays an error message on mutation failure', async () => {
    (useLoginMutation as jest.Mock).mockReturnValue({
      mutate: jest.fn((_, { onError }) => onError('Login failed')),
      isError: true,
      error: 'Login failed',
    });

    renderWithProviders(<Login />);
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    await waitFor(() => {
      expect(screen.getByText(/Login failed/i)).toBeInTheDocument();
    });
  });

  it('navigates to home on successful login', async () => {
    (useLoginMutation as jest.Mock).mockReturnValue({
      mutate: (_, { onSuccess }) => onSuccess(),
      isError: false,
    });

    renderWithProviders(<Login />);
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/home');
    });
  });
});
