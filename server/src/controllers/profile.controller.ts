import { Response } from "express";

import { AuthRequest } from "../middleware/auth.middleware";

import {
  getProfile,
  updateProfile,
} from "../services/profile.service";

export const fetchProfile = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
      return;
    }

    const profile = await getProfile(req.user.id);

    res.status(200).json({
      success: true,
      profile,
    });
  } catch (error) {
    console.error("PROFILE ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch profile.",
    });
  }
};

export const editProfile = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
      return;
    }

    const { name, avatar } = req.body;

    const profile = await updateProfile(
      req.user.id,
      {
        name,
        avatar,
      }
    );

    res.status(200).json({
      success: true,
      profile,
      message: "Profile updated successfully.",
    });
  } catch (error) {
    console.error("UPDATE PROFILE ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Unable to update profile.",
    });
  }
};