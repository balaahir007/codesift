import { create } from "zustand";
import axiosInstance from "../../utils/axiosInstance";
const useJobStore = create((set) => ({
  jobs: [],
  loading: false,
  error: null,

  publicJobs : [],

  fetchRecruiterJobs: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get("/jobs/recruiter");
      set({ jobs: res.data, loading: false });
    } catch (err) {
      set({
        error: err.response?.data?.error || "Failed to fetch jobs",
        loading: false,
      });
    }
  },
  fetchJobs: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get("/jobs");
      set({ publicJobs: res.data, loading: false });
    } catch (err) {
      set({
        error: err.response?.data?.error || "Failed to fetch jobs",
        loading: false,
      });
    }
  },

  getJobById: async (id) => {
    set({ loading: true, error: null });
    try {
      console.log("getting the Id : ",id)
      const res = await axiosInstance.get(`/jobs/${id}`);
      console.log("response Data : ",res.data)
      set({ loading: false });
      return res.data;
    } catch (err) {
      set({
        error: err.response?.data?.error || "Failed to fetch job",
        loading: false,
      });
    }
  },
  updateJobById: async (id, data) => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.put(`/jobs/${id}`, data);
         set((state) => ({
      jobs: state.jobs.map((job) =>
        job.id === id ? { ...job, ...res.data } : job
      ),
      loading: false,
    }));
      return res.data;
    } catch (err) {
      set({
        error: err.response?.data?.error || "Failed to fetch job",
        loading: false,
      });
    }
  },

  createJob: async (jobData) => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.post("/jobs", jobData);
      set((state) => ({
        jobs: [...state.jobs, res.data],
      }));
    } catch (err) {
      throw new Error(err.response?.data?.error || "Failed to create job");
    }
  },

  // ✅ Delete job
  deleteJob: async (id) => {
    set({ loading: true, error: null });
    try {
      await axiosInstance.delete(`/jobs/${id}`);
      set((state) => ({
        jobs: state.jobs.filter((job) => job.id !== id),
        loading: false,
      }));
    } catch (err) {
      set({
        error: err.response?.data?.error || "Failed to delete job",
        loading: false,
      });
    }
  },
}));

export default useJobStore;
