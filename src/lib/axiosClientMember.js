// axiosClientMember.js
import axios from 'axios';

// Utility: Extract a named cookie from `document.cookie`
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return decodeURIComponent(parts.pop().split(';').shift());
  return null;
}

// Create Axios instance
const axiosClientMember = axios.create({
  baseURL: 'http://localhost:8000', // Change to your production API base URL
  withCredentials: true,            // Required for Sanctum session + CSRF
  timeout: 10000,                   // Optional: 10s timeout for slow networks
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

// Request interceptor – Add CSRF token automatically
axiosClientMember.interceptors.request.use(
  (config) => {
    const csrfToken = getCookie('XSRF-TOKEN');
    if (csrfToken) {
      config.headers['X-XSRF-TOKEN'] = csrfToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);



export default axiosClientMember;
