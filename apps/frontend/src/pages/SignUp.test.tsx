import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { useRegisterMutation, useDemoMutation } from '../queries/auth.query';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SignUp from './SignUp';

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

describe('SignUp Component', () => {
  it('renders correctly', () => {
    const mutateMock = jest.fn();
    (useRegisterMutation as jest.Mock).mockReturnValue({
      mutate: mutateMock,
      isPending: false,
      isError: false,
    });
    (useDemoMutation as jest.Mock).mockReturnValue({
      mutate: jest.fn(),
      isPending: false,
      isError: false,
    });

    renderWithProviders(<SignUp />);
    expect(
      screen.getByRole('button', { name: /Sign Up/i })
    ).toBeInTheDocument();
  });

  it('displays validation error for invalid email', async () => {
    const mutateMock = jest.fn();
    (useRegisterMutation as jest.Mock).mockReturnValue({
      mutate: mutateMock,
      isPending: false,
      isError: false,
    });
    (useDemoMutation as jest.Mock).mockReturnValue({
      mutate: jest.fn(),
      isPending: false,
      isError: false,
    });

    renderWithProviders(<SignUp />);

    // Submit with invalid email
    fireEvent.change(screen.getByPlaceholderText(/Enter your email/i), {
      target: { value: 'invalid-email' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter your password/i), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/Enter a valid email address/i)
      ).toBeInTheDocument();
    });
  });

  it('displays validation error for short password', async () => {
    const mutateMock = jest.fn();
    (useRegisterMutation as jest.Mock).mockReturnValue({
      mutate: mutateMock,
      isPending: false,
      isError: false,
    });
    (useDemoMutation as jest.Mock).mockReturnValue({
      mutate: jest.fn(),
      isPending: false,
      isError: false,
    });

    renderWithProviders(<SignUp />);

    // Submit with short password
    fireEvent.change(screen.getByPlaceholderText(/Enter your email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter your password/i), {
      target: { value: '12' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/Password must be at least 3 characters long/i)
      ).toBeInTheDocument();
    });
  });

  it('calls mutate with correct data on form submit', async () => {
    const mutateMock = jest.fn();
    (useRegisterMutation as jest.Mock).mockReturnValue({
      mutate: mutateMock,
      isPending: false,
      isError: false,
    });
    (useDemoMutation as jest.Mock).mockReturnValue({
      mutate: jest.fn(),
      isPending: false,
      isError: false,
    });

    renderWithProviders(<SignUp />);

    fireEvent.change(screen.getByPlaceholderText(/Enter your email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Enter your password/i), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));

    await waitFor(() => {
      expect(mutateMock).toHaveBeenCalledWith(
        { email: 'test@example.com', password: 'password123' },
        expect.anything()
      );
    });
  });

  it('shows loading state when mutation is pending', async () => {
    const mutateMock = jest.fn();
    (useRegisterMutation as jest.Mock).mockReturnValue({
      mutate: mutateMock,
      isPending: true,
      isError: false,
    });
    (useDemoMutation as jest.Mock).mockReturnValue({
      mutate: jest.fn(),
      isPending: false,
      isError: false,
    });

    renderWithProviders(<SignUp />);

    const loadingSpinner = screen.getByRole('img', { name: /loading/i });
    expect(loadingSpinner).toBeInTheDocument();
  });

  it('displays error alert when mutation fails', async () => {
    const mutateMock = jest.fn();
    (useRegisterMutation as jest.Mock).mockReturnValue({
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

    renderWithProviders(<SignUp />);

    expect(screen.getByText(/Invalid credentials/i)).toBeInTheDocument();
  });
});
