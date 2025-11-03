import { io } from "socket.io-client";
import useChatStore from "../zustand/studySpaces/useChatStore";

class SocketService {
  constructor() {
    this.sockets = new Map(); // key: spaceId:userId
    this.chatStore = null;
    this.typingListenersAttachedKeys = new Set();
  }

  initializeStore() {
    if (!this.chatStore) {
      this.chatStore = useChatStore.getState();
    }
  }

  getSocket(spaceId, userId) {
    const key = `${spaceId}:${userId}`;
    return this.sockets.get(key);
  }

  connectToSpace(spaceId, userId) {
    this.initializeStore();
    const key = `${spaceId}:${userId}`;

    if (this.sockets.has(key)) {
      console.log(`🔄 Already connected: ${key}`);
      return this.sockets.get(key);
    }

    console.log(`🔌 Connecting to space ${spaceId} for user ${userId}`);

    const socket = io("http://localhost:5000", {
      withCredentials: true,
      transports: ["websocket", "polling"],
    });

    this.sockets.set(key, socket);
    useChatStore.getState().setSocket(userId, socket);

    this.setupEventHandlers(socket, spaceId);

    return socket;
  }

  setupEventHandlers(socket, spaceId) {
    const { addMessage, setMessages, setConnectionStatus } =
      useChatStore.getState();

    socket.on("connect", () => {
      console.log(`✅ Connected to space ${spaceId}:`, socket.id);
      setConnectionStatus(spaceId, { isConnected: true, error: null });

      socket.emit("join-space", spaceId);
      socket.emit("fetchall-chat-msg", spaceId);
    });

    socket.on("connect_error", (err) => {
      console.error(`❌ Connection error for space ${spaceId}:`, err.message);
      setConnectionStatus(spaceId, { isConnected: false, error: err.message });
    });

    socket.on("disconnect", (reason) => {
      console.log(`❌ Socket disconnected from space ${spaceId}:`, reason);
      setConnectionStatus(spaceId, { isConnected: false, error: null });

      if (reason === "io server disconnect") {
        socket.connect(); // You might want to throttle this if needed
      }
    });

    socket.on("error", (error) => {
      console.error(`❌ Socket error for space ${spaceId}:`, error);
      setConnectionStatus(spaceId, {
        isConnected: false,
        error: error.message || "Socket error occurred",
      });
    });
    socket.on("receive-chat-msg", (newMsg) => {
      console.log(`📨 Received chat message for spac`);
      addMessage(spaceId, newMsg);
    });
    socket.off("receive-fetchall-chat-msg");
    socket.on("receive-fetchall-chat-msg", (messages) => {
      console.log(`📂 Fetched messages for space ${spaceId}:`, messages);
      if (Array.isArray(messages)) {
        setMessages(spaceId, messages);
      } else {
        console.warn("⚠️ Received non-array messages:", messages);
      }
    });

    socket.off("user-joined");
    socket.on("user-joined", (data) => {
      console.log(`👥 ${data.username} joined space ${spaceId}`);
    });

    socket.off("user-left");
    socket.on("user-left", (data) => {
      console.log(`👋 ${data.username} left space ${spaceId}`);
    });
  }

  sendMessage(spaceId, userId, messagePayload) {
    const key = `${spaceId}:${userId}`;
    const socket = this.sockets.get(key);
    if (socket && socket.connected) {
      console.log(`📤 Sending message to space ${spaceId}:`, messagePayload);
      socket.emit("send-chat-msg", messagePayload);
      return true;
    } else {
      console.warn(`⚠️ Cannot send message: not connected to space ${spaceId}`);
      return false;
    }
  }
  typingStatus(spaceId, userId, setTypingUsers) {
    const key = `${spaceId}:${userId}`;
    const socket = this.sockets.get(key);

    if (
      !socket ||
      !socket.connected ||
      this.typingListenersAttachedKeys.has(key)
    )
      return;

    this.typingListenersAttachedKeys.add(key);

    socket.on("user-typing", ({ userInfo, userId }) => {
      setTypingUsers((prev) => {
        let updated = new Map(prev);
        updated.set(userId, userInfo);
        return updated;
      });
    });

    socket.on("user-stop-typing", ({ userId }) => {
      setTypingUsers((prev) => {
        let updated = new Map(prev);
        updated.delete(userId);
        return updated;
      });
    });
  }

  emitTyping(spaceId, userId) {
    const key = `${spaceId}:${userId}`;
    const socket = this.sockets.get(key);
    if (socket && socket.connected) {
      socket.emit("typing", { spaceId });
    }
  }

  emitStopTyping(spaceId, userId) {
    const key = `${spaceId}:${userId}`;
    const socket = this.sockets.get(key);
    if (socket && socket.connected) {
      socket.emit("stop-typing", { spaceId });
    }
  }

  disconnectFromSpace(spaceId, userId) {
    const key = `${spaceId}:${userId}`;
    const socket = this.sockets.get(key);

    if (socket) {
      console.log(`🔌 Disconnecting from space ${spaceId}`);
      socket.emit("leave-space", spaceId);
      socket.disconnect();
      this.sockets.delete(key);

      useChatStore.getState().cleanup(spaceId);
    }
  }

  disconnectAll() {
    console.log("🧹 Disconnecting from all spaces");
    this.sockets.forEach((socket, key) => {
      const [spaceId] = key.split(":");
      socket.emit("leave-space", spaceId);
      socket.disconnect();
      useChatStore.getState().cleanup(spaceId);
    });

    this.sockets.clear();
  }

  isConnectedToSpace(spaceId, userId) {
    const key = `${spaceId}:${userId}`;
    const socket = this.sockets.get(key);
    return socket && socket.connected;
  }
}

const socketService = new SocketService();

export default socketService;
