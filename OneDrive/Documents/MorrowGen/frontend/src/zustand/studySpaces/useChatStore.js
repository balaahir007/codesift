import { create } from "zustand";

const useChatStore = create((set, get) => ({
  chatMessages: {},

  connectionStatus: {},
  sockets: {},
  addMessage: (spaceId, message) =>
    set((state) => {
      const prevMessages = state.chatMessages[spaceId] || [];
      return {
        chatMessages: {
          ...state.chatMessages,
          [spaceId]: [...prevMessages, message],
        },
      };
    }),

  setMessages: (spaceId, messages) =>
    set((state) => ({
      chatMessages: {
        ...state.chatMessages,
        [spaceId]: Array.isArray(messages) ? messages : [],
      },
    })),

  setConnectionStatus: (spaceId, status) =>
    set((state) => ({
      connectionStatus: {
        ...state.connectionStatus,
        [spaceId]: { ...state.connectionStatus[spaceId], ...status },
      },
    })),
  setSocket: (userId, socket) =>
    set((state) => ({
      sockets: {
        ...state.sockets,
        [userId]: socket,
      },
    })),

  getMessages: (spaceId) => get().chatMessages[spaceId] || [],

  getConnectionStatus: (spaceId) =>
    get().connectionStatus[spaceId] || { isConnected: false, error: null },

  getSocket: (userId) => get().sockets[userId],

  clearMessages: (spaceId) =>
    set((state) => ({
      chatMessages: {
        ...state.chatMessages,
        [spaceId]: [],
      },
    })),

  cleanup: (userId) =>
    set((state) => {
      const newSockets = { ...state.sockets };
      const newConnectionStatus = { ...state.connectionStatus };

      if (newSockets[userId]) {
        newSockets[userId].disconnect();
        delete newSockets[userId];
      }

      // Remove connection status for all spaces this user had
      Object.keys(newConnectionStatus).forEach((spaceId) => {
        if (newConnectionStatus[spaceId]?.userId === userId) {
          delete newConnectionStatus[spaceId];
        }
      });

      return {
        sockets: newSockets,
        connectionStatus: newConnectionStatus,
      };
    }),
}));

export default useChatStore;
