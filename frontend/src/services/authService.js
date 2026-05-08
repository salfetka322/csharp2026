import axios from 'axios';
import $api, { API_URL } from '../http/http';

export const login = async (email, password) => {
  return $api.post('/auth/login', { email, password });
};

export const registration = async (email, password) => {
  return $api.post('/auth/register', { email, password });
};

export const logout = async () => {
  return $api.post('/auth/logout');
};

export const googleAuth = async (idToken) => {
  return $api.post('/auth/google', { idToken });
};

export const checkAuth = async (setAuth, setUser) => {
  try {
    const token = localStorage.getItem('token');
    if (!token || token === 'null' || token === 'undefined') {
      throw new Error('No token found');
    }

    const response = await axios.get(`${API_URL}/refresh`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    if (response.data?.accessToken) {
      localStorage.setItem('token', response.data.accessToken);
      setAuth(true);
      if (response.data.user) {
        setUser(response.data.user);
      }
    } else {
      throw new Error('Invalid response from server');
    }
  } catch (error) {
    console.error('Auth check error:', error.response?.data?.message || error.message);
    localStorage.removeItem('token');
    throw error;
  }
};
