import React from 'react';
import { Form, Input, Button, Typography, Card, Row, Col } from 'antd';
import { useForm, Controller } from 'react-hook-form';

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

  const onSubmit = (data: LoginFormValues) => {
    console.log('Form Data:', data);
  };

  return (
    <Row
      justify="center"
      align="middle"
      style={{
        height: '100vh',
        backgroundColor: '#f0f2f5',
      }}
    >
      <Col xs={22} sm={16} md={12} lg={8} xl={6}>
        <Card
          bordered={false}
          style={{
            borderRadius: 8,
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
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
                  <Input
                    {...field}
                    type="email"
                    placeholder="Enter your email"
                  />
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
                  <Input.Password
                    {...field}
                    placeholder="Enter your password"
                  />
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
        </Card>
      </Col>
    </Row>
  );
};

export default Login;
