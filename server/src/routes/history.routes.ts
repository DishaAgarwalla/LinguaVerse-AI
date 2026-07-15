import { Router } from "express";

import authMiddleware from "../middleware/auth.middleware";

import {
  history,
  deleteTranslation,
  clearAllHistory,
} from "../controllers/history.controller";

const router = Router();

router.get(
  "/",
  authMiddleware,
  history
);

router.delete(
  "/:id",
  authMiddleware,
  deleteTranslation
);

router.delete(
  "/",
  authMiddleware,
  clearAllHistory
);

export default router;