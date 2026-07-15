import { spawn } from "child_process";
import path from "path";

export const detectLanguage = async (
  text: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const pythonScript = path.join(
      process.cwd(),
      "python",
      "detect_language.py"
    );

    const python = spawn("python", [
      pythonScript,
      text,
    ]);

    let detected = "";
    let error = "";

    python.stdout.on("data", (data) => {
      detected += data.toString();
    });

    python.stderr.on("data", (data) => {
      error += data.toString();
    });

    python.on("error", (err) => {
      console.error("Language Detection Error:", err);
      reject(err);
    });

    python.on("close", (code) => {
      if (code !== 0) {
        return reject(
          new Error(
            error || `Python exited with code ${code}`
          )
        );
      }

      resolve(detected.trim());
    });
  });
};