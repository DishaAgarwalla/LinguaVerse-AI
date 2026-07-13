import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware";
import upload from "../middleware/upload.middleware";
import { ocr } from "../controllers/ocr.controller";

const router = Router();

router.post(
  "/",
  authMiddleware,
  upload.single("image"),
  ocr
);

export default router;