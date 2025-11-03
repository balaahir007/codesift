import { SOCKET_EVENTS } from "../constants/meetEvents";
import socketService from "./socketService";

class MeetClientService {
  constructor() {
    this.registeredHandlers = new Map();
    this.activeMeets = new Map(); // meetId -> meetData
    this.connectionTimeouts = new Map(); // meetId -> timeout
  }
  registerMeetHandlers = (
    spaceId,
    userId,
    onNewMeet,
    onMeetJoined,
    onMeetLeft,
    onMeetEnded,
    onMeetError,
    onJoinError
  ) => {
    const socket = socketService.getSocket(spaceId, userId);

    if (!socket) {
      console.warn("⚠️ No socket found for space:", spaceId);
      return false;
    }

    // Check if handlers are already registered for this space
    if (this.registeredHandlers.has(spaceId)) {
      console.log("ℹ️ Handlers already registered for space:", spaceId);
      return true;
    }

    console.log("🎯 Registering meet handlers for space:", spaceId);

    // Remove existing listeners to prevent duplicates
    this.removeHandlers(spaceId, userId);

    // Register new handlers
    socket.on(SOCKET_EVENTS.ON.NEW_MEET, onNewMeet);
    socket.on(SOCKET_EVENTS.ON.MEET_JOINED, onMeetJoined);
    socket.on(SOCKET_EVENTS.ON.MEET_LEFT, onMeetLeft);
    socket.on(SOCKET_EVENTS.ON.MEET_ENDED, onMeetEnded);
    socket.on(SOCKET_EVENTS.ON.MEET_ERROR, onMeetError);
    socket.on(SOCKET_EVENTS.ON.JOIN_ERROR, onJoinError);

    // Store handlers info
    this.registeredHandlers.set(spaceId, {
      userId,
      handlers: [
        SOCKET_EVENTS.ON.NEW_MEET,
        SOCKET_EVENTS.ON.MEET_JOINED,
        SOCKET_EVENTS.ON.MEET_LEFT,
        SOCKET_EVENTS.ON.MEET_ENDED,
        SOCKET_EVENTS.ON.MEET_ERROR,
        SOCKET_EVENTS.ON.JOIN_ERROR,
      ],
    });

    console.log("✅ Meet handlers registered successfully for space:", spaceId);
    return true;
  };

  // Remove handlers for a specific space
  removeHandlers = (spaceId, userId) => {
    const socket = socketService.getSocket(spaceId, userId);
    if (!socket) return;

    const handlerInfo = this.registeredHandlers.get(spaceId);
    if (handlerInfo) {
      handlerInfo.handlers.forEach((event) => {
        socket.off(event);
      });
      this.registeredHandlers.delete(spaceId);
      console.log("🧹 Removed meet handlers for space:", spaceId);
    }
  };

  // Create a new meet
  createNewMeet = async (spaceId, userId, name = "Default Meet") => {
    const socket = socketService.getSocket(spaceId, userId);
    if (!socket) {
      throw new Error("No socket connection available");
    }

    if (!socket.connected) {
      throw new Error("Socket not connected");
    }

    console.log("🎥 Creating new meet:", { spaceId, name });

    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        cleanup();
        reject(new Error("Meet creation timeout"));
      }, 15000);

      const cleanup = () => {
        clearTimeout(timeout);
        socket.off(SOCKET_EVENTS.ON.MEET_CREATED, successHandler);
        socket.off(SOCKET_EVENTS.ON.MEET_ERROR, errorHandler);
      };

      // Success handler
      const successHandler = (meetData) => {
        cleanup();
        console.log("✅ Meet created:", meetData);
        this.activeMeets.set(meetData.id, meetData);
        resolve(meetData);
      };

      // Error handler
      const errorHandler = (error) => {
        cleanup();
        console.error("❌ Meet creation failed:", error);
        reject(new Error(error.message || error));
      };

      socket.once(SOCKET_EVENTS.ON.MEET_CREATED, successHandler);
      socket.once(SOCKET_EVENTS.ON.MEET_ERROR, errorHandler);

      // Emit to server
      socket.emit(SOCKET_EVENTS.EMIT.MEET_CREATE, { spaceId, name });
    });
  };

  // Join a user to a meet
  joinUser = async (meetId, spaceId, userId) => {
    const socket = socketService.getSocket(spaceId, userId);

    if (!socket) {
      throw new Error("No socket connection available for join");
    }
    
    if (!socket.connected) {
      throw new Error("Socket not connected");
    }

    console.log("🔄 Joining meet:", { meetId, spaceId, userId });

    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        cleanup();
        reject(new Error("Join meet timeout"));
      }, 20000);

      const cleanup = () => {
        clearTimeout(timeout);
        socket.off(SOCKET_EVENTS.ON.MEET_JOINED, successHandler);
        socket.off(SOCKET_EVENTS.ON.JOIN_ERROR, errorHandler);
        this.connectionTimeouts.delete(meetId);
      };

      const successHandler = (participantData) => {
        cleanup();
        console.log("✅ Successfully joined meet:", participantData);
        resolve(participantData);
      };

      const errorHandler = (error) => {
        cleanup();
        console.error("❌ Failed to join meet:", error);
        reject(new Error(error));
      };

      socket.once(SOCKET_EVENTS.ON.MEET_JOINED, successHandler);
      socket.once(SOCKET_EVENTS.ON.JOIN_ERROR, errorHandler);

      // Store timeout for cleanup
      this.connectionTimeouts.set(meetId, timeout);

      // Emit join request
      socket.emit(SOCKET_EVENTS.EMIT.MEET_JOIN, { meetId });
    });
  };

  // Leave a meet
  leftUser = async (meetId, spaceId, userId) => {
    const socket = socketService.getSocket(spaceId, userId);

    if (!socket) {
      throw new Error("No socket connection available for leave");
    }

    if (!socket.connected) {
      throw new Error("Socket not connected");
    }

    console.log("🚪 Leaving meet:", { meetId, spaceId, userId });

    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        cleanup();
        reject(new Error("Leave meet timeout"));
      }, 10000);

      const cleanup = () => {
        clearTimeout(timeout);
        socket.off(SOCKET_EVENTS.ON.MEET_LEFT, successHandler);
        socket.off(SOCKET_EVENTS.ON.MEET_ERROR, errorHandler);
      };

      const successHandler = (data) => {
        cleanup();
        console.log("✅ Successfully left meet:", data);
        this.activeMeets.delete(meetId);
        resolve(data);
      };

      const errorHandler = (error) => {
        cleanup();
        console.error("❌ Failed to leave meet:", error);
        reject(new Error(error.message || error));
      };

      socket.once(SOCKET_EVENTS.ON.MEET_LEFT, successHandler);
      socket.once(SOCKET_EVENTS.ON.MEET_ERROR, errorHandler);

      // Emit leave request
      socket.emit(SOCKET_EVENTS.EMIT.MEET_LEFT, { meetId });
    });
  };

  // End a meet (for hosts/admins)
  endMeet = async (meetId, spaceId, userId) => {
    const socket = socketService.getSocket(spaceId, userId);

    if (!socket) {
      throw new Error("No socket connection available for end meet");
    }

    if (!socket.connected) {
      throw new Error("Socket not connected");
    }

    console.log("🔚 Ending meet:", { meetId, spaceId, userId });

    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        cleanup();
        reject(new Error("End meet timeout"));
      }, 10000);

      const cleanup = () => {
        clearTimeout(timeout);
        socket.off(SOCKET_EVENTS.ON.MEET_ENDED, successHandler);
        socket.off(SOCKET_EVENTS.ON.MEET_ERROR, errorHandler);
      };

      const successHandler = (data) => {
        cleanup();
        console.log("✅ Meet ended successfully:", data);
        this.activeMeets.delete(meetId);
        resolve(data);
      };

      const errorHandler = (error) => {
        cleanup();
        console.error("❌ Failed to end meet:", error);
        reject(new Error(error.message || error));
      };

      socket.once(SOCKET_EVENTS.ON.MEET_ENDED, successHandler);
      socket.once(SOCKET_EVENTS.ON.MEET_ERROR, errorHandler);

      socket.emit(SOCKET_EVENTS.EMIT.MEET_ENDED, { meetId });
    });
  };

  // Check socket connection status
  isConnected = (spaceId, userId) => {
    const socket = socketService.getSocket(spaceId, userId);
    return socket && socket.connected;
  };

  // Get active meet data
  getActiveMeet = (meetId) => {
    return this.activeMeets.get(meetId);
  };

  // Get all active meets
  getActiveMeets = () => {
    return Array.from(this.activeMeets.values());
  };

  // Get registered spaces
  getRegisteredSpaces = () => {
    return Array.from(this.registeredHandlers.keys());
  };

  // Cancel pending operations for a meet
  cancelMeetOperation = (meetId) => {
    const timeout = this.connectionTimeouts.get(meetId);
    if (timeout) {
      clearTimeout(timeout);
      this.connectionTimeouts.delete(meetId);
      console.log("🚫 Cancelled pending operation for meet:", meetId);
    }
  };

  // Clean up all handlers and timeouts
  cleanup = () => {
    console.log("🧹 Cleaning up meet client service");

    // Clear all timeouts
    this.connectionTimeouts.forEach((timeout, meetId) => {
      clearTimeout(timeout);
      console.log("🚫 Cleared timeout for meet:", meetId);
    });
    this.connectionTimeouts.clear();

    // Remove handlers
    this.registeredHandlers.forEach((info, spaceId) => {
      this.removeHandlers(spaceId, info.userId);
    });

    this.registeredHandlers.clear();
    this.activeMeets.clear();

    console.log("✅ Meet client service cleaned up");
  };
}

// Create singleton instance
const meetClientService = new MeetClientService();

// Cleanup on page unload
if (typeof window !== "undefined") {
  window.addEventListener("beforeunload", () => {
    meetClientService.cleanup();
  });
}

export default meetClientService;
