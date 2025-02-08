import React from 'react';
import { MainContentWrapper } from '../components/Layout/MainContentWrapper';
import { Title } from '../components/UI/Title';
import { SubscriptionForm } from '../components/UI/SubscriptionForm';
import { useNavigate, useParams } from 'react-router';
import { ROUTES } from '../router/routes';
import { Alert, Modal } from 'antd';
import { getErrorMessages } from '../utils/errorConvertor';
import { SubscriptionRequestDto } from '@subcontrol/shared-dtos/subscriptions';
import {
  useSubscription,
  useUpdateSubscription,
} from '../queries/subscriptions.query';
import { ContainerForCentered } from '../components/Layout/ContainerForCentered';
import { SubscriptionSkeleton } from '../components/UI/SubscriptionSkeleton';

const SubscriptionEdit: React.FC = () => {
  const { subscriptionId: subscriptionIdRaw } = useParams();
  const subscriptionId = Number(subscriptionIdRaw);
  const navigate = useNavigate();
  const {
    data: subscription,
    error,
    isLoading,
  } = useSubscription(subscriptionId);

  const updateMutation = useUpdateSubscription();

  const handleSubmit = async (values: SubscriptionRequestDto) => {
    try {
      await updateMutation.mutateAsync({ data: values, subscriptionId });
      navigate(ROUTES.HOME);
    } catch (error) {
      Modal.error({
        title: 'Failed to update subscription',
        content: getErrorMessages(error as Error),
        centered: true,
      });
    }
  };

  if (error) {
    return (
      <ContainerForCentered>
        <Alert
          message="Failed to load subscription."
          description={getErrorMessages(error)}
          type="error"
        />
      </ContainerForCentered>
    );
  }

  if (isLoading || !subscription) {
    return (
      <MainContentWrapper>
        <Title level={2}>Loading...</Title>
        <SubscriptionSkeleton />
      </MainContentWrapper>
    );
  }

  return (
    <MainContentWrapper>
      <Title level={2}>Edit Subscription</Title>
      <SubscriptionForm
        initialValues={subscription}
        onSubmit={handleSubmit}
        isLoading={updateMutation.isPending}
        submitText="Save Changes"
      />
    </MainContentWrapper>
  );
};

export default SubscriptionEdit;
