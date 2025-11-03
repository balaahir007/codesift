import { create } from "zustand";
import { persist } from "zustand/middleware";
import axiosInstance from "../../utils/axiosInstance";

const parseError = (error) => {
  if (error?.response?.data) {
    const errorData = error.response.data;
    
    // Handle AppError format
    if (errorData.errorCode) {
      return errorData.message || errorData.error || "An error occurred.";
    }
    
    // Handle old format
    return errorData.error || errorData.message || "An error occurred.";
  } else if (error?.request) {
    return "Network error, please try again later.";
  } else {
    return `Error: ${error.message}`;
  }
};

const useAuthStore = create(
  persist(
    (set, get) => ({
      authUser: null,
      loginStatus: { isLoading: false, failureReason: "", success: false },
      registerState: { isLoading: false, failureReason: "", success: false },
      logoutState: { isLoading: false, failureReason: "", success: false },
      isCheckingAuth: false,
      premiumStatus: { isLoading: false, failureReason: "", success: false },

      // ✅ Check Authentication
      checkAuth: async () => {
        set({ isCheckingAuth: true });
        try {
          const response = await axiosInstance("/auth/check-auth");
          const userData = response.data;

          // Merge only when valid
          if (userData) {
            set({
              authUser: {
                ...get().authUser,
                ...userData,
                subscription: get().authUser?.subscription || null,
              },
            });
          }
        } catch (error) {
          console.error("Auth check failed:", error);
          set({ authUser: null });
        } finally {
          set({ isCheckingAuth: false });
        }
      },

      // ✅ Register User
      register: async (data) => {
        set({
          registerState: { isLoading: true, failureReason: "", success: false },
        });
        try {
          const res = await axiosInstance.post("/auth/register", data);
          set({
            authUser: res.data,
            registerState: { isLoading: false, success: true, failureReason: "" },
          });

          return res.data
        } catch (error) {
          set({
            registerState: {
              isLoading: false,
              failureReason: parseError(error),
              success: false,
            },
          });
        }
      },

      // ✅ Login User
      login: async (data) => {
        set({
          loginStatus: { isLoading: true, failureReason: "", success: false },
        });
        try {
          const res = await axiosInstance.post("/auth/login", data);
          set({
            authUser: res.data,
            loginStatus: { isLoading: false, success: true, failureReason: "" },
          });
          return res.data;
        } catch (error) {
          set({
            loginStatus: {
              isLoading: false,
              failureReason: parseError(error),
              success: false,
            },
          });
        }
      },

      // ✅ Logout
      logout: async () => {
        set({
          logoutState: { isLoading: true, failureReason: "", success: false },
        });
        try {
          const res = await axiosInstance.post("/auth/logout");
          if (res?.data) {
            set({
              authUser: null,
              loginStatus: { isLoading: false, failureReason: "", success: false },
              registerState: { isLoading: false, failureReason: "", success: false },
              logoutState: { isLoading: false, success: true, failureReason: "" },
            });
          }
        } catch (error) {
          set({
            logoutState: {
              isLoading: false,
              failureReason: parseError(error),
              success: false,
            },
          });
        }
      },

      // ✅ Check Premium Plan
      checkPremium: async () => {
        set({
          premiumStatus: { isLoading: true, failureReason: "", success: false },
        });
        try {
          const premiumData = await axiosInstance.get("/plans/user");
          const planId = premiumData?.data?.planId || false;
          set({
            authUser: {
              ...get().authUser,
              subscription: planId,
            },
            premiumStatus: { isLoading: false, failureReason: "", success: true },
          });
        } catch (error) {
          set({
            premiumStatus: {
              isLoading: false,
              failureReason: parseError(error),
              success: false,
            },
          });
        }
      },

      // ✅ Create Premium Plan
      createPremium: async (planId) => {
        set({
          premiumStatus: { isLoading: true, failureReason: "", success: false },
        });
        try {
          const response = await axiosInstance.post("/plans", { planId });
          const { subscription } = response.data;

          set({
            authUser: {
              ...get().authUser,
              subscription,
              isPremium: subscription.plan !== "basic",
            },
            premiumStatus: { isLoading: false, failureReason: "", success: true },
          });
          return response.data;
        } catch (error) {
          set({
            premiumStatus: {
              isLoading: false,
              failureReason: parseError(error),
              success: false,
            },
          });
        }
      },
    }),
    {
      name: "auth-storage", // 🔒 localStorage key
      partialize: (state) => ({ authUser: state.authUser }), // only persist user info
    }
  )
);

export default useAuthStore;
