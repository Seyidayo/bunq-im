import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  const requiresNoToken = config.headers.noToken;

  const newConfig = { ...config };
  delete newConfig.headers.noToken;

  if (!token || requiresNoToken) return newConfig;

  newConfig.headers = {
    ...newConfig.headers,
    Authorization: `Bearer ${token}`,
  };

  return newConfig;
});

export default api;
