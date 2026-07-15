import prisma from "../config/prisma";
import { translateText } from "./translate.service";

export const translateSpeech = async (
  text: string,
  sourceLang: string,
  targetLang: string,
  userId?: string
) => {
  if (!text.trim()) {
    throw new Error("No speech text received.");
  }

  const translated = await translateText(
    text,
    sourceLang,
    targetLang
  );

  if (userId) {
    await prisma.translation.create({
      data: {
        userId,
        sourceText: text,
        translated,
        sourceLang,
        targetLang,
      },
    });
  }

  return {
    success: true,
    original: text,
    translated,
    detectedLanguage: sourceLang,
  };
}