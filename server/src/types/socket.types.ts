import { Socket } from "socket.io";

export interface SocketUser {
  userId: string;
  roomId: string;
}

export interface JoinRoomPayload {
  roomId: string;
}

export interface LeaveRoomPayload {
  roomId: string;
}

export interface SendMessagePayload {
  roomId: string;
  senderId: string;
  message: string;
  sourceLang: string;
  targetLang: string;
}

export interface AuthenticatedSocket extends Socket {
  user?: {
    id: string;
    email: string;
  };
}