import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  }
});

export function getReceiverSocketId (reciverId){
    return userSocketMap[reciverId]
}
const userSocketMap = {};

io.on('connection', (socket) => {  
  const userId = socket.handshake.query.userId;

  if(userId) userSocketMap[userId] = socket.id
  console.log("USer IDs ",Object.keys(userSocketMap));
  
  io.emit("getOnlineUsers",Object.keys(userSocketMap))

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    delete userSocketMap[userId]
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, server,io };
