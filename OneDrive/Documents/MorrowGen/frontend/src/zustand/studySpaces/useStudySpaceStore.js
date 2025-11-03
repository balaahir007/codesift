import axiosInstance from "../../utils/axiosInstance";
import { create } from "zustand";

const useStudySpacesStore = create((set) => ({
  studySpace: null,
  studySpaceAdmin: null,
  allStudySpaces: [],
  publicStudySpaces: [],
  status: {
    checkStudySpace: { isLoading: false, error: null },
    create: { isLoading: false, error: null },
    fetchStudySpaceAdmin: { isLoading: false, error: null },
    exitSpace: { isLoading: false, error: null },
  },

  checkStudySpaceAuth: async (spaceId) => {
    set((state) => ({
      status: {
        ...state.status,
        checkStudySpace: { isLoading: true, error: null },
      },
    }));

    try {
      const res = await axiosInstance.get(`/study-space/${spaceId}`);
      set((state) => ({
        studySpace: res.data.data,
        status: {
          ...state.status,
          checkStudySpace: { isLoading: false, error: null },
        },
      }));
    } catch (error) {
      console.log("Check study space auth failed", error?.response?.data);
      set((state) => ({
        status: {
          ...state.status,
          checkStudySpace: {
            isLoading: false,
            error: error?.response?.data || "Something went wrong",
          },
        },
      }));
    }
  },
  fetchStudySpace: async () => {
    set((state) => ({
      stutus: {
        ...state.status,
        checkStudySpace: { isLoading: true, error: null },
      },
    }));
    try {
      const res = await axiosInstance.get("/study-space/fetch");
      set((state) => ({
        studySpace: res.data.data,
        status: {
          ...state.status,
          checkStudySpace: { isLoading: false, error: null },
        },
      }));
      
    } catch (error) {
      if (error?.response?.data) {
        console.error("Fetch study space failed", error.response.data);
        set((state) => ({
          status: {
            ...state.status,
            checkStudySpace: {
              isLoading: false,
              error: error.response.data || "Something went wrong",
            },
          },
        }));
      }
    }
  },

  createStudySpace: async (formData) => {
    set((state) => ({
      status: {
        ...state.status,
        create: { isLoading: true, error: null },
      },
    }));

    try {
      const res = await axiosInstance.post("/study-space/create", formData);
      set((state) => ({
        studySpace: res.data.studySpace,
        status: {
          ...state.status,
          create: { isLoading: false, error: null },
        },
      }));
      return res.data;
    } catch (error) {
      console.error("Create study space failed", error);
      set((state) => ({
        status: {
          ...state.status,
          create: {
            isLoading: false,
            error: error?.response?.data?.message || "Something went wrong",
          },
        },
      }));
      throw error;
    }
  },
  getAllStudySpaces: async () => {
    try {
      const res = await axiosInstance.get("/study-space/getAll");
      set({
        allStudySpaces: Array.isArray(res.data.data)
          ? res.data.data
          : [res.data.data],
      });
      return res.data.data
    } catch (error) {
      console.error("Get all study spaces failed", error);
    }
  },
  fetchPublicStudySpaces: async () => {
    try {
      const res = await axiosInstance.get("/study-space/getAll/public");
      set({
      publicStudySpaces: Array.isArray(res.data.data)
          ? res.data.data
          : [res.data.data],
      });
      return res.data.data
    } catch (error) {
      console.error("Get all study spaces failed", error);
    }
  },
  getStudySpaceAdmin: async (spaceId) => {
    try {
      set((state) => ({
        status: {
          ...state.status,
          fetchStudySpaceAdmin: {
            isLoading: true,
            error: null,
          },
        },
      }));

      const res = await axiosInstance.get(
        `/study-space/get-adminId/${spaceId}`
      );

      if (res.data) {
        set((state) => ({
          ...state.status,
          fetchStudySpaceAdmin: {
            error: null,
            isLoading: false,
          },
          studySpaceAdmin: res.data.data,
        }));
      }
    } catch (error) {
      console.log("error store", error);
      set((state) => ({
        status: {
          ...state.status,
          fetchStudySpaceAdmin: {
            isLoading: false,
            error: error.response.data,
          },
        },
      }));
    }
  },

  exitStudySpace: async (spaceId) => {
    try {
      set((state) => ({
        ...state.status,
        exitSpace: { isLoading: true, error: null },
      }));
      const res = await axiosInstance.delete(
        `/study-space/exit-space/${spaceId}`
      );
      if (res.data) {
        set((state) => ({
          ...state.status,
          studySpace: null,
          exitSpace: { isLoading: false, error: null },
        }));
      }
    } catch (error) {
      set((state) => ({
        ...state.status,
        exitSpace: { isLoading: false, error: error.response.data || null },
      }));
    }
  },
}));

export default useStudySpacesStore;
