import React from 'react';
import { Form, Input, Button, Typography, theme } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { CenteredRow } from '../components/Layout/CenteredRow';
import { SmallCenterCard } from '../components/UI/SmallCenterCard';

const { Title } = Typography;
const { useToken } = theme;

interface LoginFormValues {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { token } = useToken();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const onSubmit = (data: LoginFormValues) => {
    console.log('Form Data:', data);
  };

  return (
    <CenteredRow>
      <SmallCenterCard>
        <Title level={3} style={{ textAlign: 'center' }}>
          Login
        </Title>
        <Form
          layout="vertical"
          onFinish={handleSubmit(onSubmit)}
          style={{ marginTop: 24 }}
        >
          {/* Email Field */}
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

          {/* Password Field */}
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
                  value: 6,
                  message: 'Password must be at least 6 characters long',
                },
              }}
              render={({ field }) => (
                <Input.Password {...field} placeholder="Enter your password" />
              )}
            />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              style={{ marginTop: 16 }}
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
