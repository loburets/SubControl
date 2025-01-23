import React from 'react';
import { Form, Input, Typography } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { CenteredRow } from '../components/Layout/CenteredRow';
import { SmallCenterCard } from '../components/UI/SmallCenterCard';
import { useRegisterMutation } from '../queries/auth.query';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../router/routes';
import { getErrorMessages } from '../utils/errorConvertor';
import {
  StyledAdditionalText,
  StyledAlert,
  StyledButton,
  StyledTitle,
} from '../components/UI/AuthElementsStyled';

const { Text } = Typography;

interface LoginFormValues {
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const registerMutation = useRegisterMutation();
  const navigate = useNavigate();

  const onSubmit = (data: LoginFormValues) => {
    registerMutation.mutate(data, {
      onSuccess: () => {
        navigate(ROUTES.HOME);
      },
    });
  };

  return (
    <CenteredRow>
      <SmallCenterCard>
        <StyledTitle level={3}>Sign Up</StyledTitle>
        {registerMutation.isError && (
          <StyledAlert
            message={getErrorMessages(registerMutation.error)}
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
            <StyledButton
              type="primary"
              htmlType="submit"
              block
              style={{ marginTop: 32 }}
              loading={registerMutation.isPending}
            >
              Sign Up
            </StyledButton>
          </Form.Item>
        </Form>

        <StyledAdditionalText>
          <Text>Already have an account?</Text>{' '}
          <Link to={ROUTES.LOGIN}>Log in</Link>
        </StyledAdditionalText>
      </SmallCenterCard>
    </CenteredRow>
  );
};

export default SignUp;
