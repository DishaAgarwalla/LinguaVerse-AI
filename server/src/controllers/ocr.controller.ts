import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import { processOCR } from "../services/ocr.service";
import { ocrSchema } from "../validation/ocr.validation";

export const ocr = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    const { targetLang } = ocrSchema.parse(req.body);

    const result = await processOCR(
      req.file.path,
      targetLang,
      req.user!.id
    );

    res.json({
      success: true,
      ...result,
    });

  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};