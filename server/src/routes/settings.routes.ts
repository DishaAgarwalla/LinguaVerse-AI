import { Router } from "express";

import authMiddleware from "../middleware/auth.middleware";

import {
  getSettings,
  updateSettings,
} from "../controllers/settings.controller";

const router = Router();

/* ===========================
   Settings
=========================== */

router.get(
  "/",
  authMiddleware,
  getSettings
);

router.put(
  "/",
  authMiddleware,
  updateSettings
);

export default router;