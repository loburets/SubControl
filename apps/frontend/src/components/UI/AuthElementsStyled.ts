import styled from 'styled-components';
import { Alert, Typography } from 'antd';
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
  margin-top: 32px;
`;

export const StyledAdditionalText = styled.div`
  text-align: center;
  margin-top: 16px;
`;
