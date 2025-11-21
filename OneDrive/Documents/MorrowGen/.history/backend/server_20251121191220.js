import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ExpressPeerServer } from "peer";
import path from "path";
import { fileURLToPath } from "url";
import mainRoutes from "./routes/index.js";
import setupAssociations from "./models/associations.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { initSocket } from "./socket-io.js";
import User from "./models/userSchema.js";
import StudySpace from "./models/studySpaceModel.js";
import { initJoinRequestModel } from "./models/studySpacejoinRequest.js";
import connectDB, { sequelize } from "./config/connectDB.js";

console.log(
  "🔍 DATABASE_URL loaded:",
  process.env.DATABASE_URL ? "✅ Yes" : "❌ No"
);

const IS_MOCK =
  String(process.env.MOCK_SIGNALING || "").toLowerCase() === "true" ||
  process.env.MOCK_SIGNALING === "1";

const app = express();

// Create HTTP + Socket.io server
const server = initSocket(app);

// CORS setup
const allowedOrigins = [
  "http://localhost:5173",
  "https://morrowgen-client.onrender.com",
];
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) callback(null, true);
      else callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

initJoinRequestModel(User, StudySpace);
setupAssociations();

// PeerJS server
const peerServer = ExpressPeerServer(server, {
  path: "/peerjs",
  allow_discovery: true,
});
app.use("/peerjs", peerServer);

app.use("/api", mainRoutes);
// API routes

// ⭐ FIX FOR __dirname IN ES MODULES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.static(path.join(__dirname, "client", "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});
// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

server.listen(PORT, async () => {
  try {
    console.log("IS_MOCK =", IS_MOCK);
    await connectDB();
    await sequelize.sync({ alter: true });
    console.log(`✅ Server running on port ${PORT}`);
  } catch (error) {
    console.error("❌ Error starting server:", error.message);
  }
});
