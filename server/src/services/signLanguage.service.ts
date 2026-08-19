import { spawn } from "child_process";
import path from "path";
import fs from "fs";

export interface RecognitionResult {
  label: string;
  confidence: number;
}

export interface TranslationResult {
  language: string;
  text: string;
}

export interface DetectionResponse {
  success: boolean;
  message?: string;

  recognition: RecognitionResult;

  translations: TranslationResult[];

  details?: {
    rawLabel?: string;
    rawConfidence?: number;
    margin?: number;
    accepted?: boolean;
  };
}


// ============================================================
// CONFIGURATION
// ============================================================

const SEQUENCE_LENGTH = 30;


// ============================================================
// PYTHON EXECUTABLE
// ============================================================

const getPythonExecutable = (): string => {
  const virtualEnvironmentPython = path.join(
    process.cwd(),
    "venv",
    "Scripts",
    "python.exe"
  );

  if (fs.existsSync(virtualEnvironmentPython)) {
    return virtualEnvironmentPython;
  }

  return "python";
};


// ============================================================
// PYTHON SCRIPT
// ============================================================

const getPythonScript = (): string => {
  return path.join(
    process.cwd(),
    "python",
    "sign_language.py"
  );
};


// ============================================================
// VALIDATE PYTHON SCRIPT
// ============================================================

const validatePythonScript = (): void => {
  const pythonScript = getPythonScript();

  if (!fs.existsSync(pythonScript)) {
    throw new Error(
      `Python sign language script not found: ${pythonScript}`
    );
  }
};


// ============================================================
// DETECT SIGN
// ============================================================

export const detectSign = async (
  image: string | string[]
): Promise<DetectionResponse> => {

  // ==========================================================
  // NORMALIZE INPUT
  // ==========================================================

  const frames: string[] = Array.isArray(image)
    ? image
    : [image];


  // ==========================================================
  // VALIDATE FRAME COUNT
  // ==========================================================

  if (frames.length !== SEQUENCE_LENGTH) {
    throw new Error(
      `Exactly ${SEQUENCE_LENGTH} frames are required. Received ${frames.length}.`
    );
  }


  // ==========================================================
  // VALIDATE FRAMES
  // ==========================================================

  for (let index = 0; index < frames.length; index++) {

    if (
      typeof frames[index] !== "string" ||
      frames[index].trim().length === 0
    ) {
      throw new Error(
        `Frame ${index + 1} is empty or invalid.`
      );
    }
  }


  // ==========================================================
  // PATHS
  // ==========================================================

  validatePythonScript();

  const pythonExecutable =
    getPythonExecutable();

  const pythonScript =
    getPythonScript();


  console.log(
    `🤟 Sending ${frames.length} frames to Python AI...`
  );


  // ==========================================================
  // PYTHON INPUT
  // ==========================================================

  const payload = JSON.stringify({
    frames,
  });


  // ==========================================================
  // START PYTHON
  // ==========================================================

  return new Promise<DetectionResponse>(
    (resolve, reject) => {

      const python = spawn(
        pythonExecutable,
        [pythonScript],
        {
          cwd: process.cwd(),

          windowsHide: true,

          // IMPORTANT:
          // Force Python input/output encoding to UTF-8.
          env: {
            ...process.env,
            PYTHONIOENCODING: "utf-8",
            PYTHONUTF8: "1",
          },
        }
      );


      // ======================================================
      // OUTPUT BUFFERS
      // ======================================================

      let stdout = "";
      let stderr = "";


      // ======================================================
      // STDOUT
      // ======================================================

      python.stdout.on(
        "data",
        (chunk: Buffer) => {

          stdout += chunk.toString("utf8");
        }
      );


      // ======================================================
      // STDERR
      // ======================================================

      python.stderr.on(
        "data",
        (chunk: Buffer) => {

          stderr += chunk.toString("utf8");
        }
      );


      // ======================================================
      // PYTHON PROCESS ERROR
      // ======================================================

      python.on(
        "error",
        (error) => {

          reject(
            new Error(
              `Unable to start Python process: ${error.message}`
            )
          );
        }
      );


      // ======================================================
      // PYTHON PROCESS FINISHED
      // ======================================================

      python.on(
        "close",
        (code) => {

          console.log(
            `🐍 Python process exited with code ${code}`
          );


          // ==================================================
          // PYTHON ERROR
          // ==================================================

          if (code !== 0) {

            console.error(
              "❌ Python sign detection error:"
            );

            if (stderr.trim()) {
              console.error(
                stderr
              );
            }

            reject(
              new Error(
                `Python process exited with code ${code}.`
              )
            );

            return;
          }


          // ==================================================
          // EMPTY OUTPUT
          // ==================================================

          if (!stdout.trim()) {

            reject(
              new Error(
                "Python sign detection returned no output."
              )
            );

            return;
          }


          // ==================================================
          // PARSE PYTHON JSON
          // ==================================================

          try {

            const result =
              JSON.parse(
                stdout.trim()
              ) as DetectionResponse;


            // =================================================
            // VALIDATE RESPONSE
            // =================================================

            if (
              typeof result.success !==
              "boolean"
            ) {

              reject(
                new Error(
                  "Invalid response from Python sign detection."
                )
              );

              return;
            }


            // =================================================
            // PYTHON RETURNED ERROR
            // =================================================

            if (!result.success) {

              reject(
                new Error(
                  result.message ??
                  "Python sign detection failed."
                )
              );

              return;
            }


            // =================================================
            // SUCCESS
            // =================================================

            console.log(
              "✅ Python sign detection successful."
            );

            resolve(result);

          } catch (error) {

            console.error(
              "❌ Unable to parse Python response:"
            );

            console.error(
              stdout
            );

            if (stderr.trim()) {

              console.error(
                "Python stderr:"
              );

              console.error(
                stderr
              );
            }

            reject(
              new Error(
                `Invalid JSON returned by Python: ${
                  error instanceof Error
                    ? error.message
                    : String(error)
                }`
              )
            );
          }
        }
      );


      // ======================================================
      // SEND JSON TO PYTHON
      // ======================================================

      python.stdin.write(
        payload,
        "utf8"
      );

      python.stdin.end();
    }
  );
};