import { Router } from "express";

import authMiddleware from "../middleware/auth.middleware";

import {
  fetchProfile,
  editProfile,
} from "../controllers/profile.controller";

const router = Router();

/*
GET PROFILE
GET /api/profile
*/
router.get(
  "/",
  authMiddleware,
  fetchProfile
);

/*
UPDATE PROFILE
PUT /api/profile
*/
router.put(
  "/",
  authMiddleware,
  editProfile
);

export default router;