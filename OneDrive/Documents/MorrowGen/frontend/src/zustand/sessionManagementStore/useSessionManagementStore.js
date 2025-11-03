import { create } from "zustand";
import axiosInstance from "../../utils/axiosInstance";

const useSessionManagementStore = create((set, get) => ({
  isLoading: false,
  sessionData: [],
  participants: [],
  groupsData: [],
  isSendSessionLoading: false,
  isScheduleSessionLoading: false,
  isCreateGroupLoading: false,
  isUpdateSessionLoading: false,
  isremoveSessionLoading: false,
  isPublishSessionLoading: false,
  participantLoading: false,
  groupLoading: false,

  sendSession: async (formData) => {
    console.log("Generating questions with formData:", formData);
    set({ isSendSessionLoading: true });

    try {
      const res = await axiosInstance.post("/session/send-session", formData);
      if (res?.data) {
        set({ sessionData: [...get().sessionData, res.data] });
      }
    } catch (error) {
      throw new Error(
        error?.response?.data?.error ||
          (error.request
            ? "No response received from the server"
            : "An unexpected error occurred")
      );
    } finally {
      set({ isSendSessionLoading: false });
    }
  },
 publishSession: async (formData) => {
    console.log("Zustand: publishSession called with formData:", formData);
    set({ isPublishSessionLoading: true }); // Updated loading state

    try {
      await axiosInstance.post("/session/send-session", formData);
   
    } catch (error) {
      console.error("Zustand: Error in publishSession:", error);
      throw new Error(
        error?.response?.data?.error ||
          (error.request
            ? "No response received from the server"
            : "An unexpected error occurred")
      );
    } finally {
      set({ isPublishSessionLoading: false }); // Updated loading state
    }
  },


  

  scheduleSession: async (formData) => {
    console.log(formData);
    console.log("sheduleSession with formData:", formData);
    set({ isScheduleSessionLoading: true });

    try {
      const res = await axiosInstance.post(
        "/session/schedule-session",
        formData
      );
      if (res?.data) {
        set({ sessionData: [...get().sessionData, res.data] });
      }
    } catch (error) {
      throw new Error(
        error?.response?.data?.error ||
          (error.request
            ? "No response received from the server"
            : "An unexpected error occurred")
      );
    } finally {
      set({ isScheduleSessionLoading: false });
    }
  },

  removeSession: async (sessionId) => {
    console.log("Zustand: removeSession called for sessionId:", sessionId);
    set({ isremoveSessionLoading: true });

    try {
      // Log sessionData BEFORE deletion attempt
      console.log(
        "Zustand: sessionData BEFORE filter (count, IDs):",
        get().sessionData.length,
        get().sessionData.map((s) => s.id)
      );
      console.log("Zustand: Attempting to remove ID:", sessionId);

      await axiosInstance.delete(`/session/remove/${sessionId}`);

      // Filter the sessionData locally
      const updatedSessions = get().sessionData.filter((session) => {
        // Add a log to see each session's ID during filtering
        // console.log(`  Filtering: session.id=${session.id}, targetId=${sessionId}, match=${session.id === sessionId}`);
        return session.id !== sessionId;
      });

      // Log sessionData AFTER filtering, but BEFORE setting state
      console.log(
        "Zustand: sessionData AFTER filter, BEFORE set (count, IDs):",
        updatedSessions.length,
        updatedSessions.map((s) => s.id)
      );

      set({ sessionData: updatedSessions });

      // Log sessionData AFTER setting state to confirm the store's new state
      console.log(
        "Zustand: sessionData AFTER set (count, IDs):",
        get().sessionData.length,
        get().sessionData.map((s) => s.id)
      );
    } catch (error) {
      console.error(
        "Zustand: Error during session removal (backend or filter issue):",
        error?.response?.data?.error || error.message,
        "Full error:",
        error
      );
      throw new Error(
        error?.response?.data?.error ||
          (error.request
            ? "No response received from the server"
            : "An unexpected error occurred")
      );
    } finally {
      set({ isremoveSessionLoading: false });
    }
  },

  updateSession: async (sessionData) => {
    console.log("Zustand: updateSession called for sessionData:", sessionData);
    set({ isUpdateSessionLoading: true });

    try {
      const res = await axiosInstance.put(
        `/session/update/${sessionData.id}`,
        sessionData
      );
      if (res?.data) {
        const updatedSessions = get().sessionData.map((session) =>
          session.id === sessionData.id ? res.data : session
        );
        set({ sessionData: updatedSessions });
        console.log(
          "Zustand: Session updated. Current sessionData count:",
          get().sessionData.length
        );
      }
    } catch (error) {
      console.error("Zustand: Error updating session:", error);
      throw new Error(
        error?.response?.data?.error ||
          (error.request
            ? "No response received from the server"
            : "An unexpected error occurred")
      );
    } finally {
      set({ isUpdateSessionLoading: false });
    }
  },

  getAllSession: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance("/session/fetchAll-session");
      if (res?.data) {
        console.log("all session", res?.data);
        set({ sessionData: res.data });
      }
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

  addParticipant: async (data) => {
    set({ participantLoading: true });
    try {
      const res = await axiosInstance.post("/session/add-participant", data);
      if (res?.data) {
        set({ participants: [...get().participants, res.data] });
      }
    } catch (error) {
      throw new Error(
        error?.response?.data?.error ||
          (error.request
            ? "No response received from the server"
            : "An unexpected error occurred")
      );
    } finally {
      set({ participantLoading: false });
    }
  },

  getAllParticipants: async () => {
    set({ participantLoading: true });
    try {
      const res = await axiosInstance("/session/fetchAll-participant");
      if (res?.data) {
        set({ participants: res.data });
      }
    } catch (error) {
      throw new Error(
        error?.response?.data?.error ||
          (error.request
            ? "No response received from the server"
            : "An unexpected error occurred")
      );
    } finally {
      set({ participantLoading: false });
    }
  },

  getAllGroups: async () => {
    set({ groupLoading: true });
    try {
      const res = await axiosInstance("/session/getAll-groups");
      if (res?.data) {
        set({ groupsData: res.data });
      }
    } catch (error) {
      throw new Error(
        error?.response?.data?.error ||
          (error.request
            ? "No response received from the server"
            : "An unexpected error occurred")
      );
    } finally {
      set({ groupLoading: false });
    }
  },

  createNewGroup: async (data) => {
    set({ isCreateGroupLoading: true });
    try {
      const res = await axiosInstance.post("/session/create-group", data);
      if (res?.data) {
        set({ groupsData: [...get().groupsData, res.data] });
      }
    } catch (error) {
      throw new Error(
        error?.response?.data?.error ||
          (error.request
            ? "No response received from the server"
            : "An unexpected error occurred")
      );
    } finally {
      set({ isCreateGroupLoading: false });
    }
  },
}));

export default useSessionManagementStore;
