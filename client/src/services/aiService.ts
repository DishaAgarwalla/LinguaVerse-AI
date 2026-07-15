import api from "./api";

export interface AIMessageOptions {
  message: string;
  grammar: boolean;
  tone: "normal" | "formal" | "casual";
}

export const processMessage = async (
  data: AIMessageOptions,
  token: string
) => {
  const response = await api.post(
    "/chat/ai/process",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};