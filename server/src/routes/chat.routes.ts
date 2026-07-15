import { Router } from "express";

import authMiddleware from "../middleware/auth.middleware";

import {
  createChatRoom,
  fetchRooms,
  fetchMessages,
  createMessage,
} from "../controllers/chat.controller";

const router = Router();

router.post(
  "/room",
  authMiddleware,
  createChatRoom
);

router.get(
  "/rooms",
  authMiddleware,
  fetchRooms
);

router.get(
  "/messages/:roomId",
  authMiddleware,
  fetchMessages
);

router.post(
  "/message",
  authMiddleware,
  createMessage
);

export default router;