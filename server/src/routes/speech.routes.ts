import { Router } from "express";

import authMiddleware from "../middleware/auth.middleware";

import {
  translateSpeech,
} from "../controllers/speech.controller";

const router = Router();

router.post(
  "/translate",
  authMiddleware,
  translateSpeech
);

export default router;