import axios from "axios";

const API = "http://localhost:5000/api/speech";

export interface SpeechResponse {
  success: boolean;
  original: string;
  translated: string;
  detectedLanguage: string;
}

export const translateSpeech = async (
  text: string,
  sourceLang: string,
  targetLang: string
): Promise<SpeechResponse> => {
  const token = localStorage.getItem("token");

  const { data } = await axios.post(
    `${API}/translate`,
    {
      text,
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