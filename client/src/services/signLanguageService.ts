import api from "./api";

import type {
  DetectionResponse,
} from "../types/signLanguage";

export const detectSign = async (
  frames: string[]
): Promise<DetectionResponse> => {

  if (frames.length !== 30) {
    throw new Error(
      `Expected 30 frames, received ${frames.length}`
    );
  }

  const res = await api.post(
    "/sign-language/detect",
    {
      frames,
    }
  );

  return res.data;
};