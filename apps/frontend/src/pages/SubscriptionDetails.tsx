import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Alert, Button, Space, Modal } from 'antd';
import { CalendarOutlined, CaretLeftOutlined } from '@ant-design/icons';
import { MainContentWrapper } from '../components/Layout/MainContentWrapper';
import { Title } from '../components/UI/Title';
import { ContainerForCentered } from '../components/Layout/ContainerForCentered';
import {
  useSubscription,
  useDeleteSubscription,
} from '../queries/subscriptions.query';
import { getErrorMessages } from '../utils/errorConvertor';
import { getSubscriptionUiData, Period } from '../utils/subscriptionsHelper';
import { ROUTES } from '../router/routes';
import { Tag } from '../components/UI/Tag';
import { SubscriptionDetailsCard } from '../components/UI/Subscription';
const SubscriptionDetails: React.FC = () => {
  const { subscriptionId } = useParams();
  const navigate = useNavigate();
  const {
    isLoading,
    data: subscription,
    error,
  } = useSubscription(Number(subscriptionId));
  const deleteSubscription = useDeleteSubscription();
  const subscriptionUiData = useMemo(
    () => (subscription ? getSubscriptionUiData(subscription) : null),
    [subscription]
  );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      await deleteSubscription.mutateAsync(Number(subscriptionId));
      navigate(ROUTES.HOME);
    } catch (error) {
      Modal.error({
        title: 'Failed to delete subscription',
        content: getErrorMessages(error as Error),
        centered: true,
      });
    } finally {
      setIsDeleting(false);
      setIsDeleteModalOpen(false);
    }
  };

  if (error) {
    return (
      <ContainerForCentered>
        <Alert
          message="Failed to load subscription details."
          description={getErrorMessages(error)}
          type="error"
        />
      </ContainerForCentered>
    );
  }

  const titleLevel = 2;

  if (isLoading || !subscription || !subscriptionUiData) {
    return (
      <MainContentWrapper>
        <Title level={titleLevel} isLink onClick={() => navigate(ROUTES.HOME)}>
          Loading...
        </Title>

        <SubscriptionDetailsCard loading></SubscriptionDetailsCard>
      </MainContentWrapper>
    );
  }

  return (
    <MainContentWrapper>
      <Space>
        <Title level={titleLevel} onClick={() => navigate(ROUTES.HOME)} isLink>
          <CaretLeftOutlined />
          {subscription.name}
        </Title>
      </Space>

      <SubscriptionDetailsCard isCancelled={!!subscription.cancelledAt}>
        <Tag
          size={'big'}
          color={subscriptionUiData.periodTagColor}
          icon={<CalendarOutlined />}
        >
          {subscriptionUiData.periodText}
        </Tag>

        <div style={{ marginBottom: 24 }}>
          <Title level={4} embedMargins>
            Cost
          </Title>
          <p>
            {subscription.period === Period.WEEKLY && (
              <>
                {`${subscriptionUiData.currencySymbol}${subscriptionUiData.price}`}
                /week
                <br />
                or
                <br />
              </>
            )}
            {`${subscriptionUiData.currencySymbol}${subscriptionUiData.costPerMonth}`}
            /month
            <br />
            or
            <br />
            {`${subscriptionUiData.currencySymbol}${subscriptionUiData.costPerYear}`}
            /year
          </p>
        </div>

        {subscriptionUiData.nextPaymentDate && (
          <div style={{ marginBottom: 24 }}>
            <Title level={4} embedMargins>
              Next Payment
            </Title>
            <p>
              {subscriptionUiData.nextPaymentDate} —{' '}
              {subscriptionUiData.currencySymbol}
              {subscriptionUiData.price}
            </p>
          </div>
        )}

        <div style={{ marginBottom: 24 }}>
          <Title level={4} embedMargins>
            Total Spent
          </Title>
          <p>{`${subscriptionUiData.currencySymbol}${subscriptionUiData.spentAmount}`}</p>
        </div>

        {subscriptionUiData.cancelledDate && (
          <div style={{ marginBottom: 16 }}>
            <Title level={4} embedMargins>
              Cancellation Date
            </Title>
            <p>{subscriptionUiData.cancelledDate}</p>
          </div>
        )}

        <Space style={{ marginTop: 24 }}>
          <Button danger onClick={() => setIsDeleteModalOpen(true)}>
            Delete
          </Button>
          <Button
            type="primary"
            onClick={() =>
              navigate(
                ROUTES.SUBSCRIPTION_EDIT.replace(
                  ':subscriptionId',
                  subscription.id.toString()
                )
              )
            }
          >
            Edit / {subscription.cancelledAt ? 'Re-activate' : 'Cancel'}
          </Button>
        </Space>

        <Modal
          title="Delete"
          open={isDeleteModalOpen}
          onCancel={() => setIsDeleteModalOpen(false)}
          okText="Delete"
          okType="danger"
          cancelText="Cancel"
          confirmLoading={isDeleting}
          onOk={handleDelete}
          centered
          width={400}
        >
          Are you sure you want to delete this subscription?
        </Modal>
      </SubscriptionDetailsCard>
    </MainContentWrapper>
  );
};

export default SubscriptionDetails;
