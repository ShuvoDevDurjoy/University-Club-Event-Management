// axiosClientStudent.js
import axios from 'axios';

// Utility: Extract a named cookie from `document.cookie`
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return decodeURIComponent(parts.pop().split(';').shift());
  return null;
}

// Create Axios instance
const axiosClientStudent = axios.create({
  baseURL: 'http://localhost:8000', // Change to your production API base URL
  withCredentials: true,            // Required for Sanctum session + CSRF
  timeout: 10000,                   // Optional: 10s timeout for slow networks
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

// Request interceptor – Add CSRF token automatically
axiosClientStudent.interceptors.request.use(
  (config) => {
    const csrfToken = getCookie('XSRF-TOKEN');
    const auth_token = getCookie('auth_token_student');
    const student_club = getCookie('student_club');
    if (csrfToken) {
      config.headers['X-XSRF-TOKEN'] = csrfToken;
    }
    if(auth_token){
      config.headers['auth_token_student'] = auth_token;
    }
    if(student_club){
      config.headers['student_club'] = student_club;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);



export default axiosClientStudent;
