import axios from 'axios';

export const API_URL = `http://localhost:8080/api`;

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token && token !== 'null' && token !== 'undefined') {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

$api.interceptors.response.use(
  (response => {
    return response;
  }),
  async error => {
    const originalRequest = error.config;
    
    if (
      error.response &&
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const token = localStorage.getItem('token');
        if (token && token !== 'null' && token !== 'undefined') {
          const response = await axios.get(`${API_URL}/refresh`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          });
          
          if (response.data?.accessToken) {
            localStorage.setItem('token', response.data.accessToken);
            return $api.request(originalRequest);
          }
        }
      } catch (e) {
        console.error('Token refresh failed:', e);
        localStorage.removeItem('token');
      }
    }
    
    throw error;
  }
);

export default $api;
