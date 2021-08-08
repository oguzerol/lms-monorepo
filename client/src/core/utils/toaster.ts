import toast from "react-hot-toast";
import { ENV } from ".";

export const toastError = (message: String) => toast.error(`${message}`);
export const toastLocalDebug = (message: String) => {
  ENV.isDev && toast(`${message}`);
};
