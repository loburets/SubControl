import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { useLoginMutation, useDemoMutation } from '../queries/auth.query';
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
  it('renders correctly', () => {
    const mutateMock = jest.fn();
    (useLoginMutation as jest.Mock).mockReturnValue({
      mutate: mutateMock,
      isPending: false,
      isError: false,
    });
    (useDemoMutation as jest.Mock).mockReturnValue({
      mutate: jest.fn(),
      isPending: false,
      isError: false,
    });

    renderWithProviders(<Login />);
    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
  });

  it('displays validation error for invalid email', async () => {
    const mutateMock = jest.fn();
    (useLoginMutation as jest.Mock).mockReturnValue({
      mutate: mutateMock,
      isPending: false,
      isError: false,
    });
    (useDemoMutation as jest.Mock).mockReturnValue({
      mutate: jest.fn(),
      isPending: false,
      isError: false,
    });

    renderWithProviders(<Login />);

    // Submit with invalid email
    fireEvent.change(screen.getByPlaceholderText(/Enter your email/i), {
      target: { value: 'invalid-email' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter your password/i), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/Enter a valid email address/i)
      ).toBeInTheDocument();
    });
  });

  it('displays validation error for short password', async () => {
    const mutateMock = jest.fn();
    (useLoginMutation as jest.Mock).mockReturnValue({
      mutate: mutateMock,
      isPending: false,
      isError: false,
    });
    (useDemoMutation as jest.Mock).mockReturnValue({
      mutate: jest.fn(),
      isPending: false,
      isError: false,
    });

    renderWithProviders(<Login />);

    // Submit with short password
    fireEvent.change(screen.getByPlaceholderText(/Enter your email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter your password/i), {
      target: { value: '12' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/Password must be at least 3 characters long/i)
      ).toBeInTheDocument();
    });
  });

  it('calls mutate with correct data on form submit', async () => {
    const mutateMock = jest.fn();
    (useLoginMutation as jest.Mock).mockReturnValue({
      mutate: mutateMock,
      isPending: false,
      isError: false,
    });
    (useDemoMutation as jest.Mock).mockReturnValue({
      mutate: jest.fn(),
      isPending: false,
      isError: false,
    });

    renderWithProviders(<Login />);

    fireEvent.change(screen.getByPlaceholderText(/Enter your email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter your password/i), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    await waitFor(() => {
      expect(mutateMock).toHaveBeenCalledWith(
        { email: 'test@example.com', password: 'password123' },
        expect.anything()
      );
    });
  });

  it('calls mutate on demo start', async () => {
    const mutateMock = jest.fn();
    const demoMutateMock = jest.fn();
    (useLoginMutation as jest.Mock).mockReturnValue({
      mutate: mutateMock,
      isPending: false,
      isError: false,
    });
    (useDemoMutation as jest.Mock).mockReturnValue({
      mutate: demoMutateMock,
      isPending: false,
      isError: false,
    });

    renderWithProviders(<Login />);

    fireEvent.click(screen.getByRole('button', { name: /Try Demo Mode/i }));

    await waitFor(() => {
      expect(demoMutateMock).toHaveBeenCalledTimes(1);
    });
    expect(mutateMock).not.toHaveBeenCalled();
  });

  it('shows loading state when mutation is pending', async () => {
    const mutateMock = jest.fn();
    (useLoginMutation as jest.Mock).mockReturnValue({
      mutate: mutateMock,
      isPending: true,
      isError: false,
    });
    (useDemoMutation as jest.Mock).mockReturnValue({
      mutate: jest.fn(),
      isPending: false,
      isError: false,
    });

    renderWithProviders(<Login />);

    const loadingSpinner = screen.getByRole('img', { name: /loading/i });
    expect(loadingSpinner).toBeInTheDocument();
  });

  it('displays error alert when mutation fails', async () => {
    const mutateMock = jest.fn();
    (useLoginMutation as jest.Mock).mockReturnValue({
      mutate: mutateMock,
      isPending: false,
      isError: true,
      error: { message: 'Invalid credentials' },
    });
    (useDemoMutation as jest.Mock).mockReturnValue({
      mutate: jest.fn(),
      isPending: false,
      isError: false,
    });

    renderWithProviders(<Login />);

    expect(screen.getByText(/Invalid credentials/i)).toBeInTheDocument();
  });
});
