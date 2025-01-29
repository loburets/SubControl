import React from 'react';
import { Form, Input, Typography } from 'antd';
import { SmallContentCard } from '../components/UI/SmallContentCard';
import { useRegisterMutation } from '../queries/auth.query';
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
import { FormContainer } from '../components/UI/FormContainer';

const { Text } = Typography;

interface LoginFormValues {
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const [form] = Form.useForm<LoginFormValues>();
  const registerMutation = useRegisterMutation();
  const navigate = useNavigate();

  const onFinish = (values: LoginFormValues) => {
    registerMutation.mutate(values, {
      onSuccess: () => {
        navigate(ROUTES.HOME);
      },
    });
  };

  return (
    <ContainerForCentered>
      <SmallContentCard>
        <StyledTitle level={3}>Sign Up</StyledTitle>
        {registerMutation.isError && (
          <StyledAlert
            message={getErrorMessages(registerMutation.error)}
            type="error"
            showIcon
            closable
          />
        )}

        <FormContainer>
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  message: 'Email is required',
                },
                {
                  type: 'email',
                  message: 'Enter a valid email address',
                },
              ]}
            >
              <Input placeholder="Enter your email" />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: 'Password is required',
                },
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
                style={{ marginTop: 32 }}
                loading={registerMutation.isPending}
              >
                Sign Up
              </StyledButton>
            </Form.Item>
          </Form>
        </FormContainer>

        <StyledAdditionalText>
          <Text>Already have an account?</Text>{' '}
          <Link to={ROUTES.LOGIN}>Log in</Link>
        </StyledAdditionalText>
      </SmallContentCard>
    </ContainerForCentered>
  );
};

export default SignUp;
