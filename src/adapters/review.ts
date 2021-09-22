import { AxiosError } from 'axios';
import api from './baseApi';

type reviewEmail = { message: string; error: boolean };
export const sendReviewEmail = async (
  email: string,
  name: string,
  message: string,
  hCaptchaToken: string,
): Promise<reviewEmail> => {
  try {
    const response = await api.post<reviewEmail>('/review/email', {
      email,
      name,
      message,
      hCaptchaToken,
    });
    return response.data;
  } catch (error) {
    const err = error as AxiosError;
    if (err.response) {
      return err.response.data;
    }
    return {
      message: 'An error occured while processing your request',
      error: true,
    };
  }
};
