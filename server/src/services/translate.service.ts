import { spawn } from "child_process";
import path from "path";

const languageMap: Record<string, string> = {
  english: "en",
  hindi: "hi",
  bengali: "bn",
  spanish: "es",
  french: "fr",
  german: "de",
  japanese: "ja",
  korean: "ko",
  chinese: "zh",
  russian: "ru",
  arabic: "ar",

  en: "en",
  hi: "hi",
  bn: "bn",
  es: "es",
  fr: "fr",
  de: "de",
  ja: "ja",
  ko: "ko",
  zh: "zh",
  ru: "ru",
  ar: "ar",

  auto: "en",
};

export const translateText = async (
  sourceText: string,
  sourceLang: string,
  targetLang: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const pythonScript = path.join(
      process.cwd(),
      "python",
      "translate.py"
    );

    const source =
      languageMap[sourceLang.toLowerCase()] ??
      sourceLang.toLowerCase();

    const target =
      languageMap[targetLang.toLowerCase()] ??
      targetLang.toLowerCase();

    console.log("=================================");
    console.log("Running Translation");
    console.log("Script :", pythonScript);
    console.log("Text   :", sourceText);
    console.log("Source :", source);
    console.log("Target :", target);
    console.log("=================================");

    const python = spawn("python", [
      pythonScript,
      sourceText,
      source,
      target,
    ]);

    let translated = "";
    let error = "";

    python.stdout.on("data", (data) => {
      translated += data.toString();
    });

    python.stderr.on("data", (data) => {
      error += data.toString();
    });

    python.on("error", (err) => {
      reject(err);
    });

    python.on("close", (code) => {
      if (code !== 0) {
        return reject(
          new Error(
            translated ||
              error ||
              `Python exited with code ${code}`
          )
        );
      }

      resolve(translated.trim());
    });
  });
};