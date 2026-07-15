import { Response } from "express";
import prisma from "../config/prisma";
import { AuthRequest } from "../middleware/auth.middleware";

import { translateSchema } from "../validation/translate.validation";
import { translateText } from "../services/translate.service";

export const translate = async (
 req: AuthRequest,
  res: Response
) => {
  try {
    console.log("=================================");
    console.log("TRANSLATE REQUEST RECEIVED");
    console.log("=================================");
    console.log("Request Body:");
    console.log(req.body);
    console.log("=================================");

    const {
      sourceText,
      sourceLang,
      targetLang,
    } = translateSchema.parse(req.body);

    console.log("Validated Input:");
    console.log("Text   :", sourceText);
    console.log("Source :", sourceLang);
    console.log("Target :", targetLang);
    console.log("=================================");

    const translated = await translateText(
      sourceText,
      sourceLang,
      targetLang
    );
    await prisma.translation.create({
  data: {
    sourceText,
    translated,
    sourceLang,
    targetLang,
    userId: req.user!.id,
  },
});

    console.log("Translation Success:");
    console.log(translated);
    console.log("=================================");

    return res.status(200).json({
      success: true,
      translated,
    });

  } catch (error: any) {

    console.error("=================================");
    console.error("TRANSLATION CONTROLLER ERROR");
    console.error("=================================");
    console.error(error);
    console.error("=================================");

    return res.status(500).json({
      success: false,
      message:
        error.message || "Translation failed",
    });

  }
};