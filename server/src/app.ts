import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes";
import translateRoutes from "./routes/translate.routes";
import historyRoutes from "./routes/history.routes";
import ocrRoutes from "./routes/ocr.routes";
import documentRoutes from "./routes/document.routes";
import speechRoutes from "./routes/speech.routes";
import chatRoutes from "./routes/chat.routes";
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "🚀 Welcome to LinguaVerse AI Backend",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/translate", translateRoutes);
app.use("/api/ocr", ocrRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/speech", speechRoutes);

app.use("/api/history", historyRoutes);

app.use("/api/chat", chatRoutes);

export default app;