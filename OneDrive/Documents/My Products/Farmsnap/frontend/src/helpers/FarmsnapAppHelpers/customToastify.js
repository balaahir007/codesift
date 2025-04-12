import { toast } from "react-toastify";

const customeToastify = (type, content) => {
  const styleWidth = window.innerWidth < 768 ? "80vw" : "350px";

  const baseStyle = {
    width: styleWidth,
    fontSize: "1rem",
    borderRadius: "12px",
    padding: "12px 18px",
    backgroundColor: "#ffffff",
    color: "#333",
  };

  const baseOptions = {
    position: "top-center",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    icon: true,
  };

  switch (type) {
    case "success":
      toast.success(content, {
        ...baseOptions,
        style: {
          ...baseStyle,
          borderLeftColor: "#28a745", 
        },
      });
      break;
    case "info":
      toast.info(content, {
        ...baseOptions,
        style: {
          ...baseStyle,
          borderLeftColor: "#007bff", 
        },
      });
      break;
    case "error":
    default:
      toast.error(content, {
        ...baseOptions,
        style: {
          ...baseStyle,
          borderLeftColor: "#dc3545", 
        },
      });
      break;
  }
};
export default customeToastify


