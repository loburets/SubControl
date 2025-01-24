import React from 'react';
import { Form, Input, Typography } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { SmallContentCard } from '../components/UI/SmallContentCard';
import { useLoginMutation } from '../queries/auth.query';
import { Link, useNavigate } from 'react-router';
import { ROUTES } from '../router/routes';
import { getErrorMessages } from '../utils/errorConvertor';
import {
  StyledAdditionalText,
  StyledAlert,
  StyledButton,
  StyledTitle,
} from '../components/UI/AuthElementsStyled';
import { ContainerForCentered } from '../components/Layout/ContainerForCentered';

const { Text } = Typography;

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
    <ContainerForCentered>
      <SmallContentCard>
        <StyledTitle level={3}>Login</StyledTitle>
        {loginMutation.isError && (
          <StyledAlert
            message={getErrorMessages(loginMutation.error)}
            type="error"
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
            <StyledButton
              type="primary"
              htmlType="submit"
              block
              loading={loginMutation.isPending}
            >
              Login
            </StyledButton>
          </Form.Item>
        </Form>

        <StyledAdditionalText>
          <Text>Don't have an account?</Text>{' '}
          <Link to={ROUTES.SIGNUP}>Sign up</Link>
        </StyledAdditionalText>
      </SmallContentCard>
    </ContainerForCentered>
  );
};

export default Login;
