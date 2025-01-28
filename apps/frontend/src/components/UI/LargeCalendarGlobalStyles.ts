import { createGlobalStyle } from 'styled-components';
import { GlobalToken } from 'antd';
import { extraSmallMobileFooterMaxWidth } from '../Layout/Layout.styled';

export const LargeCalendarGlobalStyles = createGlobalStyle<{
  $token: GlobalToken;
}>`
  .custom-large-calendar-popup .ant-picker-date-panel {
      width: 400px;
  }
  .custom-large-calendar-popup .ant-picker-header button {
    font-size: 18px;
    padding: 4px 16px;
    transform: scale(1.2);
  }
  .custom-large-calendar-popup .ant-picker-now {
      font-size: 20px!important;
      padding: 4px !important; 
  }
  .custom-large-calendar-popup .ant-picker-cell-inner {
      padding: 8px 12px;
      height: 40px !important;
  }
  //mobile
  @media (max-width: ${({ $token }) => $token.screenSMMax}px) {
    .custom-large-calendar-popup .ant-picker-date-panel {
      width: calc(100vw - 32px);
    }
  }

  @media (max-width: ${extraSmallMobileFooterMaxWidth}px) {
    .custom-large-calendar-popup .ant-picker-header button {
        font-size: 16px;
        padding: 0 12px;
        transform: scale(1.1);
    }
    .custom-large-calendar-popup .ant-picker-now {
        font-size: 18px!important;
        padding: 2px !important;
    }
    .custom-large-calendar-popup .ant-picker-cell-inner {
        padding: 4px 8px;
        height: 32px !important;
    }
    .custom-large-calendar-popup .ant-picker-date-panel {
        width: calc(100vw - 16px);
    }
  }
`;
