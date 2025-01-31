import styled, { keyframes } from 'styled-components';
import { Alert, Divider, Typography } from 'antd';
import { Button } from './Button';

const { Title } = Typography;

export const StyledTitle = styled(Title)`
  text-align: center;
  margin-bottom: 24px !important;
  margin-top: 4px !important;
`;

export const StyledAlert = styled(Alert)`
  text-align: center;
  margin-bottom: 24px;
  margin-top: 4px;
`;

export const StyledButton = styled(Button)`
  margin-top: 12px;
`;

export const StyledAdditionalText = styled.div`
  text-align: center;
  margin-top: 16px;
`;

export const StyledDivider = styled(Divider)`
  margin: 24px 0 !important;
  font-size: 14px;
`;

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(103, 58, 183, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(103, 58, 183, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(103, 58, 183, 0);
  }
`;

export const AnimatedDemoButton = styled(Button)`
  animation: ${pulse} 2s infinite;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.02);
    animation: none;
  }

  &:active {
    transform: scale(0.98);
  }
`;
