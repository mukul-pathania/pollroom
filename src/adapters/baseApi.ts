import axios from 'axios';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000';

const refreshToken = async (): Promise<string> => {
  try {
    const res = await axios.get<{ token: string }>(
      `${baseUrl}/auth/refresh_token`,
      {
        withCredentials: true,
      },
    );
    return res.data.token;
  } catch (error) {
    return '';
  }
};

const api = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  async (response) => response,
  async (error) => {
    const ogReq = error.config;
    if (
      ogReq.url !== 'auth/login' &&
      error.response.status === 401 &&
      !ogReq._retry
    ) {
      ogReq._retry = true;
      const token = await refreshToken();
      api.defaults.headers.Authorization = `Bearer ${token}`;
      if (token) {
        return api(ogReq); // retry original request
      }
    } else {
      return Promise.reject(error);
    }
  },
);

export default api;
