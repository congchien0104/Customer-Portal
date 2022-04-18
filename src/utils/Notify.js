import { toast } from "react-toastify"

export const SuccessNotify = (message) => {
    return toast.success(message);
}
export const ErrorNotify = (message) => {
    return toast.error(message);
}