// utils/toastService.js
import { toast } from 'react-toastify';

export const notify = {
  success: (message = 'Success!', options = {}) => {
    toast.success(message, {
      position: 'top-right',
      autoClose: 3000,
      pauseOnHover: true,
      ...options,
    });
  },

  error: (message = 'Something went wrong.', options = {}) => {
    toast.error(message, {
      position: 'top-right',
      autoClose: 3000,
      pauseOnHover: true,
      ...options,
    });
  },

  info: (message = 'Just FYI...', options = {}) => {
    toast.info(message, {
      position: 'top-right',
      autoClose: 3000,
      pauseOnHover: true,
      ...options,
    });
  },

  warn: (message = 'Warning!', options = {}) => {
    toast.warn(message, {
      position: 'top-right',
      autoClose: 3000,
      pauseOnHover: true,
      ...options,
    });
  },
};
