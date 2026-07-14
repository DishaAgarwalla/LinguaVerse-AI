import axios from "axios";

const API = "http://localhost:5000/api/ocr";

export const processOCR = async (
  image: File,
  targetLang: string
) => {
  const token = localStorage.getItem("token");

  const formData = new FormData();

  formData.append("image", image);
  formData.append("targetLang", targetLang);

  const response = await axios.post(API, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};