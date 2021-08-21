import api from './baseApi';

type authResponse = {
  message: string;
  isAuthenticated: boolean;
  error: boolean;
  username: string;
  email: string;
};

export const checkAuthWithServer = async (): Promise<authResponse> => {
  try {
    const response = await api.get<authResponse>('auth/verify');
    if (response.data.error) {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (error) {
    return {
      message: 'You are not authenticated',
      isAuthenticated: false,
      error: true,
      username: '',
      email: '',
    };
  }
};

type logoutResponse = {
  message: string;
  error: boolean;
};

export const logout = async (): Promise<void> => {
  try {
    await api.get<logoutResponse>('auth/logout');
  } catch (error) {
    return;
  }
};

type loginResponse = {
  message: string;
  error: boolean;
  token?: string;
};

type signUpResponse = loginResponse;

export const loginWithEmailPassword = async (
  email: string,
  password: string,
): Promise<loginResponse> => {
  try {
    const response = await api.post<loginResponse>('auth/login', {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    return {
      message: 'An error occured while processing your request',
      error: true,
    };
  }
};

export const signUpWithEmailPassword = async (
  email: string,
  username: string,
  password: string,
): Promise<signUpResponse> => {
  try {
    const response = await api.post<signUpResponse>('/auth/signup', {
      email,
      password,
      username,
    });
    return response.data;
  } catch (error) {
    return {
      error: true,
      message: 'An error occured while processing your request',
    };
  }
};

type verifyEmailResponse = { message: string; error: boolean };
export const verifyEmail = async (
  token: string,
): Promise<verifyEmailResponse> => {
  try {
    const response = await api.post<verifyEmailResponse>('/auth/email/verify', {
      token,
    });
    return response.data;
  } catch (error) {
    return {
      error: true,
      message: 'An error occured while processing your request',
    };
  }
};

type sendResetPasswordResponse = { message: string; error: boolean };
export const sendResetPasswordEmail = async (
  email: string,
): Promise<sendResetPasswordResponse> => {
  try {
    const response = await api.post<sendResetPasswordResponse>(
      '/auth/password/reset/email',
      { email },
    );
    return response.data;
  } catch (error) {
    return {
      error: true,
      message: 'An error occured while processing your request',
    };
  }
};

type resetPasswordResponse = { message: string; error: boolean };
export const resetPassword = async (
  token: string,
  password: string,
): Promise<resetPasswordResponse> => {
  try {
    const response = await api.post<resetPasswordResponse>(
      '/auth/password/reset/change',
      {
        token,
        password,
      },
    );
    return response.data;
  } catch (error) {
    return {
      error: true,
      message: 'An error occured while processing your request',
    };
  }
};
