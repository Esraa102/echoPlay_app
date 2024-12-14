import toast from "react-hot-toast";

export const BASE_URL = "http://localhost:5000/api/v1";

export const createToast = (type: string, message: string) => {
  return type === "error" ? toast.error(message) : toast.success(message);
};
