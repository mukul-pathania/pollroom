import axios from 'axios';

const baseUrl = process.env.BASE_URL || 'http://localhost:5000/';

const api = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default api;

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
    const response = await api.get<logoutResponse>('auth/logout');
    if (response.data.error) throw new Error(response.data.message);
  } catch (error) {
    return;
  }
};

type loginResponse = {
  message: string;
  error: boolean;
};

export const login = async (email: string, password: string): Promise<void> => {
  try {
    const response = await api.post<loginResponse>('auth/login', {
      email,
      password,
    });
    if (response.data.error) throw new Error(response.data.message);
  } catch (error) {
    return;
  }
};
