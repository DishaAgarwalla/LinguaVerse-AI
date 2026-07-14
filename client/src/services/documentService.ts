import axios from "axios";

const API_URL = "http://localhost:5000/api/documents";

export const uploadDocument = async (
  file: File,
  targetLang: string,
  token: string
) => {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("targetLang", targetLang);

  const response = await axios.post(API_URL, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data.result;
};