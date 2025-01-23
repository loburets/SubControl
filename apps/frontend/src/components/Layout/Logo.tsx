import React from 'react';
import { useNavigate } from 'react-router';
import { StyledLogoIcon, StyledLogo } from './Logo.styled';
import { ROUTES } from '../../router/routes';
import { theme } from 'antd';

const { useToken } = theme;

interface LogoProps {
  mobileOnly?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ mobileOnly }) => {
  const navigate = useNavigate();
  const { token } = useToken();

  return (
    <StyledLogo
      onClick={() => navigate(ROUTES.HOME)}
      $token={token}
      $mobileOnly={mobileOnly}
    >
      <StyledLogoIcon $token={token} />
      SubControl
    </StyledLogo>
  );
};
