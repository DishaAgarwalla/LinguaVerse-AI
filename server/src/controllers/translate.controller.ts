import { Request, Response } from "express";

import { translateSchema } from "../validation/translate.validation";
import { translateText } from "../services/translate.service";

export const translate = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      sourceText,
      sourceLang,
      targetLang,
    } = translateSchema.parse(req.body);

    const translated = await translateText(
      sourceText,
      sourceLang,
      targetLang
    );

    return res.status(200).json({
      success: true,
      translated,
    });

  } catch (error: any) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        error.message || "Translation failed",
    });

  }
};