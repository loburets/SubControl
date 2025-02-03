import React from 'react';
import { Form, Input, Typography } from 'antd';
import { SmallContentCard } from '../components/UI/SmallContentCard';
import { useLoginMutation } from '../queries/auth.query';
import { Link, useNavigate } from 'react-router';
import { ROUTES } from '../router/routes';
import { getErrorMessages } from '../utils/errorConvertor';
import {
  AnimatedDemoButton,
  StyledAdditionalText,
  StyledAlert,
  StyledButton,
  StyledDivider,
  StyledTitle,
} from '../components/UI/AuthElementsStyled';
import { ContainerForCentered } from '../components/Layout/ContainerForCentered';
import { FormElementsAdjuster } from '../components/UI/FormElementsAdjuster';
import { useDemo } from '../hooks/useDemo';

const { Text } = Typography;

interface LoginFormValues {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [form] = Form.useForm<LoginFormValues>();
  const loginMutation = useLoginMutation();
  const { demoError, isDemoLoading, startDemo } = useDemo();
  const navigate = useNavigate();

  const onFinish = (values: LoginFormValues) => {
    loginMutation.mutate(values, {
      onSuccess: () => {
        navigate(ROUTES.HOME);
      },
    });
  };

  return (
    <ContainerForCentered>
      <SmallContentCard>
        <StyledTitle level={3}>Login</StyledTitle>
        {(loginMutation.isError || demoError) && (
          <StyledAlert
            message={getErrorMessages(
              loginMutation.error || demoError || new Error()
            )}
            type="error"
            showIcon
            closable
          />
        )}

        <FormElementsAdjuster>
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Email is required' },
                { type: 'email', message: 'Enter a valid email address' },
              ]}
            >
              <Input placeholder="Enter your email" />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: 'Password is required' },
                {
                  min: 3,
                  message: 'Password must be at least 3 characters long',
                },
              ]}
            >
              <Input.Password placeholder="Enter your password" />
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
        </FormElementsAdjuster>

        <StyledDivider>OR</StyledDivider>

        <AnimatedDemoButton
          block
          onClick={startDemo}
          loading={isDemoLoading}
          color="purple"
          variant="solid"
        >
          Try Demo Mode
        </AnimatedDemoButton>

        <StyledAdditionalText>
          <Text>Don't have an account?</Text>{' '}
          <Link to={ROUTES.SIGNUP}>Sign up</Link>
        </StyledAdditionalText>
      </SmallContentCard>
    </ContainerForCentered>
  );
};

export default Login;
