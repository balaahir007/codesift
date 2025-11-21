import { create } from "zustand";

const useThemeStore = create((set) => ({
  mode: localStorage.getItem("mode") || "light",
  toggleTheme: () =>
    set((state) => {
      console.log("mode : ",state.mode)
      const newMode = state.mode === "light" ? "dark" : "light";
      localStorage.setItem("mode", newMode);
      if (newMode === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return { mode: newMode };
    }),
}));

export default useThemeStore;
