import styled from 'styled-components';
import { GlobalToken, theme, Tag as AntTag } from 'antd';
import React, { PropsWithChildren } from 'react';
import { TagProps } from 'antd/es/tag';

const { useToken } = theme;

const TagStyled = styled(AntTag)<{
  $token: GlobalToken;
  $size?: 'big' | 'default';
}>`
  ${({ $size }) =>
    $size === 'big' &&
    `
      margin-bottom: 24px;
      font-size: 16px;
      padding: 4px 8px;
    `}
`;

export const Tag: React.FC<
  PropsWithChildren & TagProps & { size?: 'big' | 'default' }
> = ({ children, size, ...rest }) => {
  const { token } = useToken();

  return (
    <TagStyled $token={token} $size={size} {...rest}>
      {children}
    </TagStyled>
  );
};
