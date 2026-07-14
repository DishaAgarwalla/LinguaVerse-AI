import { Router } from "express";

import authMiddleware from "../middleware/auth.middleware";
import documentUpload from "../middleware/documentUpload.middleware";
import { uploadDocument } from "../controllers/document.controller";

const router = Router();

router.post(
  "/",
  authMiddleware,
  documentUpload.single("file"),
  uploadDocument
);

export default router;