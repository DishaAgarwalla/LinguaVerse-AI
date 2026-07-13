import { Router } from "express";
import { translate } from "../controllers/translate.controller";
import authMiddleware from "../middleware/auth.middleware";

const router = Router();

router.post("/", authMiddleware, translate);

export default router;