import React, { useEffect } from 'react';
import { Skeleton } from 'antd';
import { SmallContentCard } from '../components/UI/SmallContentCard';
import { ContainerForCentered } from '../components/Layout/ContainerForCentered';
import { StyledAlert, StyledTitle } from '../components/UI/AuthElementsStyled';
import { useDemo } from '../hooks/useDemo';
import { getErrorMessages } from '../utils/errorConvertor';

const Login: React.FC = () => {
  const { demoError, isDemoLoading, startDemo } = useDemo();
  useEffect(() => {
    if (demoError || isDemoLoading) {
      return;
    }

    startDemo();
  }, [startDemo, demoError, isDemoLoading]);

  return (
    <ContainerForCentered>
      <SmallContentCard>
        <StyledTitle level={3}>
          {isDemoLoading ? 'Loading demo...' : 'Demo'}
        </StyledTitle>
        {demoError && (
          <StyledAlert
            message={getErrorMessages(demoError)}
            type="error"
            showIcon
            closable
          />
        )}
        {isDemoLoading && <Skeleton />}
      </SmallContentCard>
    </ContainerForCentered>
  );
};

export default Login;
