import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import http from "http";

import { initializeSocket } from "./socket/socket";

import authRoutes from "./routes/auth.routes";
import translateRoutes from "./routes/translate.routes";
import ocrRoutes from "./routes/ocr.routes";
import documentRoutes from "./routes/document.routes";
import speechRoutes from "./routes/speech.routes";
import chatRoutes from "./routes/chat.routes";
import historyRoutes from "./routes/history.routes";
dotenv.config();

const app = express();

const server = http.createServer(app);

initializeSocket(server);

app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
    ],
    credentials: true,
  })
);

app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "uploads"))
);

app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "LinguaVerse AI Backend Running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/translate", translateRoutes);
app.use("/api/ocr", ocrRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/speech", speechRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/history", historyRoutes);

const PORT = Number(process.env.PORT) || 5000;

server.listen(PORT, () => {
  console.log(`
=========================================
🚀 LinguaVerse AI Backend Started
🌐 Server Running: http://localhost:${PORT}
=========================================
`);
});