import { AxiosError } from 'axios';

type ErrorResponse = {
  message?: string | string[];
};

export const getErrorMessages = (error: Error) => {
  const apiMessage = (error as AxiosError<ErrorResponse>).response?.data
    .message;

  if (typeof apiMessage === 'string') {
    return apiMessage;
  }

  if (Array.isArray(apiMessage)) {
    return apiMessage.join(', ');
  }

  if (error.message) {
    return error.message;
  }

  return 'Unknown error';
};
