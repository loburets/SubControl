import React from 'react';
import { Form, Input, Select, DatePicker, Button, InputNumber } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../router/routes';
import dayjs from 'dayjs';
import { Currency, Period } from '../../utils/subscriptionsHelper';

interface SubscriptionFormProps {
  initialValues?: {
    name: string;
    period: Period;
    centsPerPeriod: number;
    currency: Currency;
    startedAt: Date;
    cancelledAt?: Date | null;
  };
  onSubmit: (values: {
    name: string;
    period: Period;
    centsPerPeriod: number;
    currency: Currency;
    startedAt: Date;
    cancelledAt?: Date | null;
  }) => Promise<void>;
  isLoading?: boolean;
  submitText?: string;
}

export const SubscriptionForm: React.FC<SubscriptionFormProps> = ({
  initialValues,
  onSubmit,
  isLoading,
  submitText = 'Save',
}) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleSubmit = async (values: any) => {
    try {
      await onSubmit({
        ...values,
        startedAt: values.startedAt.toDate(),
        cancelledAt: values.cancelledAt?.toDate() || null,
        centsPerPeriod: Math.round(values.centsPerPeriod * 100), // Convert to cents
      });
    } catch (error) {
      // Error handling is done by the parent component
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={
        initialValues
          ? {
              ...initialValues,
              startedAt: dayjs(initialValues.startedAt),
              cancelledAt: initialValues.cancelledAt
                ? dayjs(initialValues.cancelledAt)
                : null,
              centsPerPeriod: initialValues.centsPerPeriod / 100, // Convert from cents
            }
          : {
              period: Period.MONTHLY,
              currency: Currency.USD,
              startedAt: dayjs(),
            }
      }
    >
      <Form.Item
        name="name"
        label="Name"
        rules={[{ required: true, message: 'Please enter subscription name' }]}
      >
        <Input placeholder="Netflix, Spotify, etc." />
      </Form.Item>

      <Form.Item
        name="period"
        label="Billing Period"
        rules={[{ required: true, message: 'Please select billing period' }]}
      >
        <Select>
          <Select.Option value={Period.WEEKLY}>Weekly</Select.Option>
          <Select.Option value={Period.MONTHLY}>Monthly</Select.Option>
          <Select.Option value={Period.YEARLY}>Yearly</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="centsPerPeriod"
        label="Price per period"
        rules={[
          { required: true, message: 'Please enter price' },
          {
            type: 'number',
            min: 0.01,
            message: 'Price must be greater than 0',
          },
        ]}
      >
        <InputNumber
          style={{ width: '100%' }}
          placeholder="9.99"
          step={0.01}
          precision={2}
        />
      </Form.Item>

      <Form.Item
        name="currency"
        label="Currency"
        rules={[{ required: true, message: 'Please select currency' }]}
      >
        <Select>
          {Object.values(Currency).map((currency) => (
            <Select.Option key={currency} value={currency}>
              {currency}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="startedAt"
        label="Start Date"
        rules={[{ required: true, message: 'Please select start date' }]}
      >
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item name="cancelledAt" label="Cancellation Date">
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item>
        <Button.Group style={{ width: '100%' }}>
          <Button
            style={{ width: '50%' }}
            onClick={() => navigate(ROUTES.HOME)}
          >
            Cancel
          </Button>
          <Button
            style={{ width: '50%' }}
            type="primary"
            htmlType="submit"
            loading={isLoading}
          >
            {submitText}
          </Button>
        </Button.Group>
      </Form.Item>
    </Form>
  );
};
