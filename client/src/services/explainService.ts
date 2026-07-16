import axios from "axios";

const API_URL = "http://localhost:5000/api/explain";

export interface ExplainResponse {
  success: boolean;
  result: {
    word: string;
    language: string;
    meaning: string;
    pronunciation: string;
    grammar: string;
    example: string;
    tips: string;
  };
}

export const explainText = async (
  text: string,
  language: string,
  token: string
): Promise<ExplainResponse> => {
  const { data } = await axios.post<ExplainResponse>(
    API_URL,
    {
      text,
      language,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};