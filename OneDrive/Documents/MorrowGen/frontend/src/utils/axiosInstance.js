import axios from "axios";
import useAuthStore from "../zustand/auth/useAuthStore";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const { authUser } = useAuthStore.getState();
    if (authUser?.token) {
      config.headers.Authorization = `Bearer ${authUser.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
