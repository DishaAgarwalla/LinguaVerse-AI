import pdf from "pdf-parse";
import mammoth from "mammoth";

import prisma from "../config/prisma";
import { translateText } from "./translate.service";

export const processDocument = async (
  file: Express.Multer.File,
  targetLang: string,
  userId: string
) => {

  let extractedText = "";

  if (file.mimetype === "application/pdf") {

    const data = await pdf(file.buffer);

extractedText = data.text;

  } else {

    const result = await mammoth.extractRawText({
      buffer: file.buffer,
    });

    extractedText = result.value;
  }

  const translated = await translateText(
  extractedText,
  "English",
  targetLang
);

  await prisma.translation.create({
    data: {
      userId,
      sourceText: extractedText,
      translated,
      sourceLang: "English",
      targetLang,
    },
  });

  return {
    extractedText,
    translated,
  };
};