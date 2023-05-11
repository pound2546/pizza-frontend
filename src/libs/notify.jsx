import { toast } from "react-toastify";

export default (text, color) => {
    return toast(text, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        style: {
            color: color
        }
    });
};
