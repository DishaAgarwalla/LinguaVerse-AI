import { Request, Response } from "express";

import { translateSpeech as speechTranslator } from "../services/speech.service";

export const translateSpeech = async (
  req: Request,
  res: Response
) => {
  try {
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

    const result = await speechTranslator(
      text,
      sourceLang || "en",
      targetLang
    );

    return res.status(200).json(result);

  } catch (error: any) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        error.message || "Speech translation failed.",
    });

  }
};