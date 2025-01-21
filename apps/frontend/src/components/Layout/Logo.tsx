import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StyledLogoIcon, StyledLogo } from './Logo.styled';
import { ROUTES } from '../../router/routes';
import { theme } from 'antd';

const { useToken } = theme;

export const Logo: React.FC = () => {
  const navigate = useNavigate();
  const { token } = useToken();

  return (
    <StyledLogo onClick={() => navigate(ROUTES.HOME)} $token={token}>
      <StyledLogoIcon $token={token} />
      SubControl
    </StyledLogo>
  );
};
