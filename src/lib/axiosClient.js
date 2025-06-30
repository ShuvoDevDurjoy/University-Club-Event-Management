// axiosClient.js
import axios from 'axios';

// Utility: Extract a named cookie from `document.cookie`
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return decodeURIComponent(parts.pop().split(';').shift());
  return null;
}

// Create Axios instance
const axiosClient = axios.create({
  baseURL: 'http://localhost:8000', // Change to your production API base URL
  withCredentials: true,            // Required for Sanctum session + CSRF
  timeout: 10000,                   // Optional: 10s timeout for slow networks
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

// Request interceptor – Add CSRF token automatically
axiosClient.interceptors.request.use(
  (config) => {
    const csrfToken = getCookie('XSRF-TOKEN');
    const auth_token = getCookie('auth_token_executive');
    const executive_club = getCookie('executive_club');
    if (csrfToken) {
      config.headers['X-XSRF-TOKEN'] = csrfToken;
    }
    if(auth_token){
      config.headers['auth_token_executive'] = auth_token;
    }
    if(executive_club){
      config.headers['executive_club'] = executive_club;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);



export default axiosClient;
