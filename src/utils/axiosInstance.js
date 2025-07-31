import axios from 'axios';
import conf from '../conf/conf';

const API_URL = conf.API_URL;

const API = axios.create({
  baseURL: `${API_URL}`,
  withCredentials: true, // Important for cookies
});

// Request Interceptor
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken'); // Fetch from memory/context
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

// Response Interceptor for Token Refresh
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        // Refresh Token API Call
        const res = await axios.post(`${API_URL}`, {}, { withCredentials: true });

        // Store New Access Token
        localStorage.setItem('accessToken', res.data.accessToken);

        // Retry Failed Request
        error.config.headers.Authorization = `Bearer ${res.data.accessToken}`;
        return axios(error.config);
      } catch (err) {
        console.error('Session Expired. Please Login Again.');
        window.location.href = '/login'; // Redirect to Login
      }
    }
    return Promise.reject(error);
  }
);

export default API;
