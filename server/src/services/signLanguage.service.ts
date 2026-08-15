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
// PYTHON PATH
// ============================================================

const getPythonExecutable = (): string => {
  /**
   * When the Node server is started while the Python virtual
   * environment is active, "python" will normally work.
   *
   * However, Node does not automatically know which terminal
   * environment was activated.
   *
   * Therefore we first check for:
   *
   * server/venv/Scripts/python.exe
   *
   * and then fall back to "python".
   */

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
// PYTHON SCRIPT PATH
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
  // VALIDATE INPUT
  // ==========================================================

  /**
   * The existing controller calls this value "image".
   *
   * For the new sequence-based system:
   *
   * image = string[]
   *
   * containing exactly 30 base64 frames.
   *
   * We temporarily support a single string as well so the
   * service does not immediately crash if an older frontend
   * request is sent.
   */

  const frames: string[] = Array.isArray(image)
    ? image
    : [image];


  // ==========================================================
  // FRAME COUNT
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
  // PYTHON SCRIPT
  // ==========================================================

  validatePythonScript();

  const pythonExecutable =
    getPythonExecutable();

  const pythonScript =
    getPythonScript();


  // ==========================================================
  // PYTHON INPUT
  // ==========================================================

  const payload = JSON.stringify({
    frames,
  });


  // ==========================================================
  // EXECUTE PYTHON
  // ==========================================================

  return new Promise<DetectionResponse>(
    (resolve, reject) => {

      const python = spawn(
        pythonExecutable,
        [
          pythonScript,
        ],
        {
          cwd: process.cwd(),
          windowsHide: true,
        }
      );


      // ======================================================
      // OUTPUT
      // ======================================================

      let stdout = "";

      let stderr = "";


      // ======================================================
      // COLLECT STDOUT
      // ======================================================

      python.stdout.on(
        "data",
        (chunk: Buffer) => {

          stdout += chunk.toString();
        }
      );


      // ======================================================
      // COLLECT STDERR
      // ======================================================

      python.stderr.on(
        "data",
        (chunk: Buffer) => {

          stderr += chunk.toString();
        }
      );


      // ======================================================
      // PYTHON ERROR
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
      // PYTHON FINISHED
      // ======================================================

      python.on(
        "close",
        (code) => {

          // -----------------------------------------------
          // Python returned an error
          // -----------------------------------------------

          if (code !== 0) {

            console.error(
              "Python sign detection error:"
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


          // -----------------------------------------------
          // Empty response
          // -----------------------------------------------

          if (!stdout.trim()) {

            reject(
              new Error(
                "Python sign detection returned no output."
              )
            );

            return;
          }


          // -----------------------------------------------
          // Parse JSON
          // -----------------------------------------------

          try {

            const result =
              JSON.parse(
                stdout.trim()
              ) as DetectionResponse;


            // ---------------------------------------------
            // Validate response
            // ---------------------------------------------

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


            // ---------------------------------------------
            // Python reported an error
            // ---------------------------------------------

            if (!result.success) {

              reject(
                new Error(
                  result.message ??
                  "Python sign detection failed."
                )
              );

              return;
            }


            // ---------------------------------------------
            // Success
            // ---------------------------------------------

            resolve(
              result
            );

          } catch (error) {

            console.error(
              "Unable to parse Python response:"
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
      // SEND DATA TO PYTHON
      // ======================================================

      python.stdin.write(
        payload
      );

      python.stdin.end();
    }
  );
};