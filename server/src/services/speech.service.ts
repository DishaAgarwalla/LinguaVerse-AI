import { translateText } from "./translate.service";

export const translateSpeech = async (
  text: string,
  sourceLang: string,
  targetLang: string
) => {
  if (!text.trim()) {
    throw new Error("No speech text received.");
  }

  const translated = await translateText(
    text,
    sourceLang,
    targetLang
  );

  return {
    success: true,
    original: text,
    translated,
    detectedLanguage: sourceLang,
  };
};