import Tesseract from "tesseract.js";
import fs from "fs";

import prisma from "../config/prisma";
import { translateText } from "./translate.service";

export const processOCR = async (
  imagePath: string,
  targetLang: string,
  userId: string
) => {
  try {
    // OCR
    const result = await Tesseract.recognize(
      imagePath,
      "eng"
    );

    const extractedText = result.data.text.trim();

    if (!extractedText) {
      throw new Error(
        "No text could be extracted from the image."
      );
    }

    // Translate using language codes
    const translated = await translateText(
      extractedText,
      "en",
      targetLang
    );

    // Save history
    await prisma.translation.create({
      data: {
        userId,
        sourceText: extractedText,
        translated,
        sourceLang: "en",
        targetLang,
      },
    });

    // Delete uploaded image
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    return {
      extractedText,
      translated,
    };
  } catch (error) {
    // Delete image even if OCR fails
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    throw error;
  }
};