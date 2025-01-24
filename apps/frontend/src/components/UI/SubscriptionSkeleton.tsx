import React from 'react';
import { Card } from 'antd';

export const SubscriptionSkeleton: React.FC = () => {
  return <Card title=" " type="inner" loading></Card>;
};
