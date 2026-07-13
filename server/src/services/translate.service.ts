import { spawn } from "child_process";
import path from "path";

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

    const python = spawn("python", [
      pythonScript,
      sourceText,
      sourceLang,
      targetLang,
    ]);

    let translated = "";
    let error = "";

    python.stdout.on("data", (data) => {
      translated += data.toString();
    });

    python.stderr.on("data", (data) => {
      error += data.toString();
    });

    python.on("close", (code) => {
      if (code !== 0) {
        return reject(new Error(error));
      }

      resolve(translated.trim());
    });
  });
};