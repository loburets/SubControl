import React, { useEffect } from 'react';
import {
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  InputNumber,
  Checkbox,
  Radio,
  theme,
  Grid,
} from 'antd';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../router/routes';
import { Currency, Period } from '../../utils/subscriptionsHelper';
import dayjs from 'dayjs';
import { FormContainer } from './FormContainer';

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
  const screens = Grid.useBreakpoint();

  // Add state for cancelled checkbox
  const [isCancelled, setIsCancelled] = React.useState(
    !!initialValues?.cancelledAt
  );

  // Update cancelledAt when checkbox changes
  useEffect(() => {
    if (isCancelled) {
      form.setFieldValue('cancelledAt', dayjs(new Date()));
    } else {
      form.setFieldValue('cancelledAt', null);
    }
  }, [isCancelled, form]);

  const handleSubmit = async (values: any) => {
    const { pricePerPeriod, ...restValues } = values;

    try {
      await onSubmit({
        ...restValues,
        startedAt: values.startedAt.toDate(),
        cancelledAt: values.cancelledAt?.toDate() || null,
        centsPerPeriod: Math.round(pricePerPeriod * 100),
      });
    } catch (error) {
      // Error handling should be done by the parent component
    }
  };

  return (
    <FormContainer>
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
                pricePerPeriod: initialValues.centsPerPeriod / 100,
              }
            : {
                period: Period.MONTHLY,
                currency: Currency.USD,
                startedAt: dayjs(),
                cancelledAt: null,
              }
        }
      >
        <Form.Item
          name="period"
          label="Billing Period"
          required={false}
          rules={[{ required: true, message: 'Please select billing period' }]}
        >
          <Radio.Group>
            <Radio.Button value={Period.WEEKLY}>Weekly</Radio.Button>
            <Radio.Button value={Period.MONTHLY}>Monthly</Radio.Button>
            <Radio.Button value={Period.YEARLY}>Yearly</Radio.Button>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name="name"
          label="Name"
          required={false}
          rules={[
            { required: true, message: 'Please enter subscription name' },
          ]}
        >
          <Input placeholder="Netflix, Spotify, etc." />
        </Form.Item>

        <Form.Item
          name="startedAt"
          label="Start Date"
          required={false}
          rules={[{ required: true, message: 'Please select start date' }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item>
          <Checkbox
            checked={isCancelled}
            onChange={(e) => setIsCancelled(e.target.checked)}
          >
            Subscription is cancelled
          </Checkbox>
        </Form.Item>

        {isCancelled && (
          <Form.Item name="cancelledAt" label="Cancellation Date">
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
        )}

        <Form.Item
          required={false}
          name="pricePerPeriod"
          label="Price per the period"
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
          required={false}
          rules={[{ required: true, message: 'Please select currency' }]}
        >
          <Select listHeight={480}>
            {Object.values(Currency).map((currency) => (
              <Select.Option
                key={currency}
                value={currency}
                style={{
                  padding: screens.md ? undefined : '14px 12px',
                }}
              >
                {currency}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button onClick={() => navigate(ROUTES.HOME)}>Cancel</Button>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              {submitText}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </FormContainer>
  );
};
