import styled from 'styled-components';
import { GlobalToken, theme } from 'antd';
import { PropsWithChildren } from 'react';

const { useToken } = theme;

const StyledMainContentWrapper = styled.div<{
  $token: GlobalToken;
}>`
  background: ${({ $token }) => $token.colorBgBase};
  max-width: 1000px;
  padding: 28px;
`;

export const MainContentWrapper: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const { token } = useToken();

  return (
    <StyledMainContentWrapper $token={token}>
      {children}
    </StyledMainContentWrapper>
  );
};
