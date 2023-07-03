import { TYPE, useToast } from "vue-toastification";
import { ToastOptions } from "vue-toastification/dist/types/types";

export const useToasts = () => {
  const toast = useToast();

  const toastSuccess = (text: string, options?: ToastOptions) => {
    toast.success(text, { ...options, type: TYPE.SUCCESS });
  };

  const toastWarning = (text: string, options?: ToastOptions) => {
    toast.warning(text, { ...options, type: TYPE.WARNING });
  };

  const toastError = (text: string, options?: ToastOptions) => {
    toast.error(text, { ...options, type: TYPE.ERROR });
  };

  const toastInfo = (text: string, options?: ToastOptions) => {
    toast.info(text, { ...options, type: TYPE.INFO });
  };

  return { toastWarning, toastError, toastSuccess, toastInfo };
};
