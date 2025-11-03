import socketService from "./socketService";

const registerPoolHandlers = () => {
  const socket = socketService.getSocket(spaceId, userId);
  if (!socket) return;

  so
};

const createPool = (spaceId, userId, poolData) => {
  const socket = socketService.getSocket(spaceId, userId);
  if (!socket) return;

  socket.emit("create-pool", poolData);
};

export { createPool };
