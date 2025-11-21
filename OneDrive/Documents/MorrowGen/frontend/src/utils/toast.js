import { toast } from "react-toastify";

export const showError = (msg, mode, duration = 3000) => {
  toast.error(msg, {
    position: "top-right",
    style: {
      fontSize: "12px",
      padding: "6px 10px",
      color: mode === "dark" ? "#ffffff" : "#1B2E31",
      borderRadius: "6px",
      background: mode === "dark" ? "#294B4E" : "#ffffff",
      width: "260px",
    },
    icon: "⚠️",
    delay: duration,
  });
};

export const showSuccess = (msg, mode, duration = 3000) => {
  toast.success(msg, {
    position: "top-right",
    style: {
      fontSize: "12px",
      padding: "6px 10px",
      color: mode === "dark" ? "#ffffff" : "#1B2E31",
      borderRadius: "6px",
      background: mode === "dark" ? "#294B4E" : "#ffffff",
      width: "260px",
    },
    icon: "✔️",
    delay: duration,
  });
};
