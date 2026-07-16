import axios from "axios";

const API_URL = "http://localhost:5000/api/documents";

export interface DocumentResponse {
  success: boolean;
  extractedText: string;
  translated: string;
}

export const uploadDocument = async (
  file: File,
  targetLang: string,
  token: string
): Promise<DocumentResponse> => {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("targetLang", targetLang);

  const { data } = await axios.post<DocumentResponse>(
    API_URL,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log("Document API Response:");
  console.log(data);

  return data;
};