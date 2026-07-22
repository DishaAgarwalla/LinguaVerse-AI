import { Router } from "express";

import { detectSignController } from "../controllers/signLanguage.controller";

const router = Router();

/**
 * POST
 * /api/sign-language/detect
 */

router.post(
  "/detect",
  detectSignController
);

export default router;