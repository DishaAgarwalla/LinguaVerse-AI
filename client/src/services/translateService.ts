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

  console.log("=================================");
  console.log("FRONTEND TRANSLATION REQUEST");
  console.log("Text   :", sourceText);
  console.log("Source :", sourceLang);
  console.log("Target :", targetLang);
  console.log("=================================");

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

  console.log("=================================");
  console.log("FRONTEND TRANSLATION RESPONSE");
  console.log(data);
  console.log("=================================");

  return data;
};