import api from "./api";

import type {
  DetectionResponse,
} from "../types/signLanguage";

export const detectSign = async (
  image: string
): Promise<DetectionResponse> => {
  const res = await api.post(
    "/sign-language/detect",
    {
      image,
    }
  );

  return res.data;
};