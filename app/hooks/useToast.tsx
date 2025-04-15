// In your useToast hook (hooks/useToast.ts)
import { useToastContext } from '../component/toastContext'; // Adjust the import path as needed

export const useToast = () => {
  const { addToast } = useToastContext(); // Destructure addToast from the context

  const toastSuccess = (message: string) => {
    addToast(message, 'success', 3000); // Call addToast with the appropriate parameters
  };

  const toastError = (message: string) => {
    addToast(message, 'error', 5000); // Call addToast with the appropriate parameters
  };

  // Add other toast types as needed

  return { toastSuccess, toastError };
};