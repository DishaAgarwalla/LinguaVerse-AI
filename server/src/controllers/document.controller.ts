import { Response } from "express";

import { AuthRequest } from "../middleware/auth.middleware";
import { processDocument } from "../services/document.service";

export const uploadDocument = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    console.log("=================================");
    console.log("DOCUMENT TRANSLATION REQUEST");
    console.log("=================================");

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No document uploaded.",
      });
    }

    console.log("Filename :", req.file.originalname);
    console.log("MimeType :", req.file.mimetype);
    console.log("Size     :", req.file.size);

    console.log("Body:");
    console.log(req.body);

    const { targetLang } = req.body;

    console.log("Target Language:", targetLang);
    console.log("User:", req.user?.id);

    const result = await processDocument(
      req.file,
      targetLang,
      req.user!.id
    );

    console.log("DOCUMENT TRANSLATION SUCCESS");

    return res.status(200).json({
      success: true,
      extractedText: result.extractedText,
      translated: result.translated,
    });

  } catch (error: any) {

    console.error("=================================");
    console.error("DOCUMENT TRANSLATION ERROR");
    console.error("=================================");
    console.error(error);
    console.error("Message:", error?.message);
    console.error("Stack:");
    console.error(error?.stack);
    console.error("=================================");

    return res.status(500).json({
      success: false,
      message:
        error.message ??
        "Document translation failed.",
    });
  }
};