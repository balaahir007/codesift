import { create } from "zustand";
import axiosInstance from "../../utils/axiosInstance";

const useInterviewStore = create((set, get) => ({
  isLoading: false,
  interviewData: {},

  formGenerateQuestions: async (formData) => {
    console.log("Generating questions with formData:", formData);

    set({
      isLoading: true,
      interviewData: {
        ...get().interviewData,
        candidateData: formData,
      },
    });

    try {
      const res = await axiosInstance.post(
        "/interview/formGenerate-questions",
        formData
      );

      console.log("response Data : ", res.data);

      const parsedQuestions =
        typeof res.data?.questions === "string"
          ? JSON.parse(res.data)
          : res.data?.questions;

      if (res?.data) {
        set((data) => ({
          interviewData: {
            ...data.interviewData,
            question: parsedQuestions,
          },
        }));
      }
      return res?.data?.sessionId;
    } catch (error) {
      throw new Error(
        error?.response?.data?.error ||
          (error.request
            ? "No response received from the server"
            : "An unexpected error occurred")
      );
    } finally {
      set({ isLoading: false });
    }
  },

  resumeGenerateQuestion: async (formData) => {
    set({
      isLoading: true,
      interviewData: {
        ...get().interviewData,
        candidateData: formData,
      },
    });

    try {
      const res = await axiosInstance.post(
        "/interview/resumeGenerate-questions",
        formData
      );

      // should be true

      const parsedQuestions =
        typeof res.data?.questions === "string"
          ? JSON.parse(res.data)
          : res.data?.questions;

      if (res?.data) {
        set((data) => ({
          interviewData: {
            ...data.interviewData,
            question: parsedQuestions,
          },
        }));
        console.log("Stored Questions:", get().interviewData.question);
        console.log("Is array?", Array.isArray(get().interviewData.question));
      }
      return res?.data?.sessionId;
    } catch (error) {
      throw new Error(
        error?.response?.data?.error ||
          (error.request
            ? "No response received from the server"
            : "An unexpected error occurred")
      );
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useInterviewStore;
