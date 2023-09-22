// ToastMessage.tsx
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// type Info | Success | Error

export const notify = async (type: string, message: string) => {
  switch (type) {
    case "success":
      toast.success(message);
      break;
    case "error":
      toast.error(message);
      break;
    case "info":
      toast.info(message);
      break;
    default:
      toast(message);
      break;
  }
};
