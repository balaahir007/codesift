import express from "express";
import serverConfig from "./config/serverConfig";
import { Server } from "socket.io";
import cors from "cors";
import http from "http";

const app = express();
app.use(cors());

// Create HTTP server from Express app
const server = http.createServer(app);

// Attach socket.io to the HTTP server
const io = new Server(server, {
  cors: {
    origin: "*", // allow all origins (you can restrict later)
  },
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// Start server
server.listen(serverConfig.PORT, () => {
  console.log(`Server is running on http://localhost:${serverConfig.PORT}`);
});
