import { Response } from "express";

import { AuthRequest } from "../middleware/auth.middleware";
import { translateSpeech as speechTranslator } from "../services/speech.service";

export const translateSpeech = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    console.log("=================================");
    console.log("SPEECH TRANSLATION REQUEST");
    console.log("=================================");
    console.log("Request Body:");
    console.log(req.body);
    console.log("=================================");

    const {
      text,
      sourceLang,
      targetLang,
    } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({
        success: false,
        message: "Speech text is required.",
      });
    }

    if (!targetLang) {
      return res.status(400).json({
        success: false,
        message: "Target language is required.",
      });
    }

    console.log("Validated Input:");
    console.log("Text   :", text);
    console.log("Source :", sourceLang || "en");
    console.log("Target :", targetLang);
    console.log("User   :", req.user?.id);
    console.log("=================================");

    const result = await speechTranslator(
      text,
      sourceLang || "en",
      targetLang,
      req.user!.id
    );

    console.log("=================================");
    console.log("SPEECH TRANSLATION SUCCESS");
    console.log(result);
    console.log("=================================");

    return res.status(200).json(result);

  } catch (error: any) {

    console.error("=================================");
    console.error("SPEECH TRANSLATION ERROR");
    console.error("=================================");
    console.error(error);
    console.error("=================================");

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Speech translation failed.",
    });

  }
};