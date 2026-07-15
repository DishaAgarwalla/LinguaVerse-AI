import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";

import {
  getHistory,
  deleteHistory,
  clearHistory,
} from "../services/history.service";

export const history = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const translations = await getHistory(req.user!.id);

    res.json({
      success: true,
      translations,
    });

  } catch (error: any) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

export const deleteTranslation = async (
  req: AuthRequest,
  res: Response
) => {
  try {

    await deleteHistory(
  req.params.id as string,
  req.user!.id
);

    res.json({
      success: true,
      message: "Translation deleted",
    });

  } catch (error: any) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

export const clearAllHistory = async (
  req: AuthRequest,
  res: Response
) => {
  try {

    await clearHistory(req.user!.id);

    res.json({
      success: true,
      message: "History cleared",
    });

  } catch (error: any) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};