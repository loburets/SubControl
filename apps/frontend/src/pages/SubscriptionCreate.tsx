import React from 'react';
import { MainContentWrapper } from '../components/Layout/MainContentWrapper';
import { Title } from '../components/UI/Title';
import { SubscriptionForm } from '../components/UI/SubscriptionForm';
import { useNavigate } from 'react-router';
import { ROUTES } from '../router/routes';
import { Modal } from 'antd';
import { getErrorMessages } from '../utils/errorConvertor';
import { SubscriptionRequestDto } from '@subcontrol/shared-dtos/subscriptions';
import { useCreateSubscription } from '../queries/subscriptions.query';

const SubscriptionCreate: React.FC = () => {
  const navigate = useNavigate();
  const createMutation = useCreateSubscription();

  const handleSubmit = async (values: SubscriptionRequestDto) => {
    try {
      await createMutation.mutateAsync(values);
      navigate(ROUTES.HOME);
    } catch (error) {
      Modal.error({
        title: 'Failed to create subscription',
        content: getErrorMessages(error as Error),
        centered: true,
      });
    }
  };

  return (
    <MainContentWrapper>
      <Title level={2}>Create Subscription</Title>
      <SubscriptionForm
        onSubmit={handleSubmit}
        isLoading={createMutation.isPending}
        submitText="Create"
      />
    </MainContentWrapper>
  );
};

export default SubscriptionCreate;
