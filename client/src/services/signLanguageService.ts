import api from "./api";

import type {
  DetectionResponse,
} from "../types/signLanguage";

export const detectSign = async (
  frames: string[]
): Promise<DetectionResponse> => {
  const res = await api.post(
    "/sign-language/detect",
    {
      frames,
    }
  );

  return res.data;
};