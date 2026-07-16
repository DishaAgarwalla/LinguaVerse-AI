import Groq from "groq-sdk";

import prisma from "../config/prisma";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

interface ExplainResult {
  word: string;
  language: string;
  meaning: string;
  pronunciation: string;
  grammar: string;
  example: string;
  tips: string;
}

export const explainText = async (
  text: string,
  language: string,
  userId: string
): Promise<ExplainResult> => {
  console.log("=================================");
  console.log("AI EXPLAIN REQUEST");
  console.log("=================================");
  console.log("Text :", text);
  console.log("Language :", language);

  const prompt = `
Explain the following word or sentence.

Text:
${text}

Language:
${language}

Return ONLY valid JSON.

{
  "word": "",
  "language": "",
  "meaning": "",
  "pronunciation": "",
  "grammar": "",
  "example": "",
  "tips": ""
}
`;

  const completion =
    await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0.3,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

  const content =
    completion.choices[0].message.content ?? "";

  const cleaned = content
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  const result: ExplainResult =
    JSON.parse(cleaned);

  await prisma.translation.create({
    data: {
      userId,
      sourceText: text,
      translated: result.meaning,
      sourceLang: language,
      targetLang: "explain",
    },
  });

  console.log("=================================");
  console.log("AI EXPLAIN SUCCESS");
  console.log(result);
  console.log("=================================");

  return result;
};