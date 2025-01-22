import React from 'react';
import { Form, Input, Button, Typography, Alert } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { CenteredRow } from '../components/Layout/CenteredRow';
import { SmallCenterCard } from '../components/UI/SmallCenterCard';
import { useLoginMutation } from '../queries/auth.query';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../router/routes';
import { AxiosError } from 'axios';
import { getErrorMessages } from '../utils/errorConvertor';

const { Title } = Typography;

interface LoginFormValues {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const loginMutation = useLoginMutation();
  const navigate = useNavigate();

  const onSubmit = (data: LoginFormValues) => {
    loginMutation.mutate(data, {
      onSuccess: () => {
        navigate(ROUTES.HOME);
      },
    });
  };

  return (
    <CenteredRow>
      <SmallCenterCard>
        <Title
          level={3}
          style={{ textAlign: 'center', marginBottom: 24, marginTop: 4 }}
        >
          Login
        </Title>
        {loginMutation.isError && (
          <Alert
            message={getErrorMessages(loginMutation.error)}
            type="error"
            style={{ textAlign: 'center', marginBottom: 24, marginTop: 4 }}
            showIcon
            closable
          />
        )}

        <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
          <Form.Item
            label="Email"
            validateStatus={errors.email ? 'error' : ''}
            help={errors.email?.message}
          >
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Enter a valid email address',
                },
              }}
              render={({ field }) => (
                <Input {...field} type="email" placeholder="Enter your email" />
              )}
            />
          </Form.Item>

          <Form.Item
            label="Password"
            validateStatus={errors.password ? 'error' : ''}
            help={errors.password?.message}
          >
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{
                required: 'Password is required',
                minLength: {
                  value: 3,
                  message: 'Password must be at least 3 characters long',
                },
              }}
              render={({ field }) => (
                <Input.Password {...field} placeholder="Enter your password" />
              )}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              style={{ marginTop: 32 }}
              loading={loginMutation.isPending}
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </SmallCenterCard>
    </CenteredRow>
  );
};

export default Login;
