import { Router } from "express";

import authMiddleware from "../middleware/auth.middleware";
import { explain } from "../controllers/explain.controller";

const router = Router();

router.post(
  "/",
  authMiddleware,
  explain
);

export default router;