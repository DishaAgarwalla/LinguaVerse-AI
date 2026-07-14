import Tesseract from "tesseract.js";
import fs from "fs";
import prisma from "../config/prisma";
import { translateText } from "./translate.service";

export const processOCR = async (
  imagePath: string,
  targetLang: string,
  userId: string
) => {
  const result = await Tesseract.recognize(imagePath, "eng");

  const extractedText = result.data.text.trim();

  const translated = await translateText(
    extractedText,
    "English",
    targetLang,
    userId
  );

  fs.unlinkSync(imagePath);

  return {
    extractedText,
    translated,
  };
};