import api from "./api";

import type {
  ChatRoom,
  ChatMessage,
  SendMessageRequest,
} from "../types/chat";

/* ==========================================
   Default Auth Header
========================================== */

const getConfig = (token: string) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

/* ==========================================
   Create Room
========================================== */

export const createRoom = async (
  name: string,
  token: string
): Promise<ChatRoom> => {
  const res = await api.post(
    "/chat/room",
    { name },
    getConfig(token)
  );

  return res.data.room;
};

/* ==========================================
   Get All Rooms
========================================== */

export const getRooms = async (
  token: string
): Promise<ChatRoom[]> => {
  const res = await api.get(
    "/chat/rooms",
    getConfig(token)
  );

  return res.data.rooms;
};

/* ==========================================
   Get Room Messages
========================================== */

export const getMessages = async (
  roomId: string,
  token: string
): Promise<ChatMessage[]> => {
  const res = await api.get(
    `/chat/messages/${roomId}`,
    getConfig(token)
  );

  return res.data.messages;
};

/* ==========================================
   Send Message
========================================== */

export const sendMessage = async (
  payload: SendMessageRequest,
  token: string
): Promise<ChatMessage> => {
  const res = await api.post(
    "/chat/message",
    payload,
    getConfig(token)
  );

  return res.data.message;
};

/* ==========================================
   Delete Message (Future)
========================================== */

export const deleteMessage = async (
  messageId: string,
  token: string
): Promise<void> => {
  await api.delete(
    `/chat/message/${messageId}`,
    getConfig(token)
  );
};

/* ==========================================
   Edit Message (Future)
========================================== */

export const editMessage = async (
  messageId: string,
  text: string,
  token: string
): Promise<ChatMessage> => {
  const res = await api.put(
    `/chat/message/${messageId}`,
    {
      message: text,
    },
    getConfig(token)
  );

  return res.data.message;
};

/* ==========================================
   Mark Messages Read (Future)
========================================== */

export const markMessagesRead = async (
  roomId: string,
  token: string
): Promise<void> => {
  await api.post(
    `/chat/read/${roomId}`,
    {},
    getConfig(token)
  );
};

/* ==========================================
   Get Online Users (Future)
========================================== */

export const getOnlineUsers = async (
  token: string
): Promise<string[]> => {
  const res = await api.get(
    "/chat/online-users",
    getConfig(token)
  );

  return res.data.users;
};