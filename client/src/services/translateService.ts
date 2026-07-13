import axios from "axios";

const API = "http://localhost:5000/api/translate";

export interface TranslateResponse {
  success: boolean;
  translated: string;
}

export const translate = async (
  sourceText: string,
  sourceLang: string,
  targetLang: string
): Promise<TranslateResponse> => {
  const token = localStorage.getItem("token");

  const { data } = await axios.post(
    API,
    {
      sourceText,
      sourceLang,
      targetLang,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};