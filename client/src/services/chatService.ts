import api from "./api";

import type {
  ChatRoom,
  ChatMessage,
  SendMessageRequest,
} from "../types/chat";

export const createRoom = async (
  name: string,
  token: string
): Promise<ChatRoom> => {
  const res = await api.post(
    "/chat/room",
    { name },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data.room;
};

export const getRooms = async (
  token: string
): Promise<ChatRoom[]> => {
  const res = await api.get("/chat/rooms", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data.rooms;
};

export const getMessages = async (
  roomId: string,
  token: string
): Promise<ChatMessage[]> => {
  const res = await api.get(
    `/chat/messages/${roomId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data.messages;
};

export const sendMessage = async (
  payload: SendMessageRequest,
  token: string
): Promise<ChatMessage> => {
  const res = await api.post(
    "/chat/message",
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data.message;
};