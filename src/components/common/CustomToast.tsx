import type { ToastOptions } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const defaultToastOption: ToastOptions = {
  autoClose: 4000,
  closeOnClick: true,
  pauseOnHover: false,
  closeButton: false,
};

export const CustomToast = {
  info: (message: React.ReactNode, options: ToastOptions = {}) => {
    toast.info(message, {
      ...defaultToastOption,
      icon: () => (
        <span aria-label='search' role='img'>
          🖐️
        </span>
      ),
      ...options,
    });
  },
  success: (message: React.ReactNode, options: ToastOptions = {}) => {
    toast.success(message, {
      ...defaultToastOption,
      icon: () => (
        <span aria-label='check' role='img'>
          ☑️
        </span>
      ),
      ...options,
    });
  },
  error: (message: React.ReactNode, options: ToastOptions = {}) => {
    toast.error(message, {
      ...defaultToastOption,
      icon: () => (
        <span aria-label='error' role='img'>
          📢
        </span>
      ),
      ...options,
    });
  },
};
