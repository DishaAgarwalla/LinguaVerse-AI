import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";import { processDocument } from "../services/document.service";

export const uploadDocument = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No document uploaded.",
      });
    }

    const { targetLang } = req.body;

const userId = req.user!.id;

const result = await processDocument(
  req.file,
  targetLang,
  userId
);
    return res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Document translation failed.",
    });
  }
};