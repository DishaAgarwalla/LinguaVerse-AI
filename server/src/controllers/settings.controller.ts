import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";

import { updateSettingsSchema } from "../validation/settings.validation";

import {
  getUserSettings,
  updateUserSettings,
} from "../services/settings.service";

/* ===========================
   Get Settings
=========================== */

export const getSettings = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const settings = await getUserSettings(
      req.user!.id
    );

    return res.status(200).json({
      success: true,
      settings,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to fetch settings",
    });
  }
};

/* ===========================
   Update Settings
=========================== */

export const updateSettings = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const data =
      updateSettingsSchema.parse(req.body);

    const settings =
      await updateUserSettings(
        req.user!.id,
        data
      );

    return res.status(200).json({
      success: true,
      message:
        "Settings updated successfully",
      settings,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message:
        error.message ||
        "Failed to update settings",
    });
  }
};