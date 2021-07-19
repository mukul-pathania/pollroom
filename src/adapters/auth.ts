import api from './baseApi';

type authResponse = {
  message: string;
  isAuthenticated: boolean;
  error: boolean;
};

export const checkAuthWithServer = async (): Promise<boolean> => {
  try {
    const response = await api.get<authResponse>('auth/verify');
    if (response.data.error) {
      throw new Error(response.data.message);
    }
    return response.data.isAuthenticated;
  } catch (error) {
    return false;
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
    console.log(error);
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
    console.log(error);
    return {
      error: true,
      message: 'An error occured while processing your request',
    };
  }
};
