/* ==========================================
   Chat Room
========================================== */

export interface ChatRoom {
  id: string;
  name: string;
  createdAt: string;
}

/* ==========================================
   User
========================================== */

export interface ChatUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  isOnline?: boolean;
}

/* ==========================================
   Chat Message
========================================== */

export interface ChatMessage {
  id: string;

  roomId: string;

  senderId: string;

  sender?: ChatUser;

  originalText: string;

  translatedText: string;

  sourceLang: string;

  targetLang: string;

  grammar?: boolean;

  tone?: "normal" | "formal" | "casual";

  createdAt: string;

  updatedAt?: string;

  status?: "sending" | "sent" | "delivered" | "read";
}

/* ==========================================
   Send Message
========================================== */

export interface SendMessageRequest {
  roomId: string;

  message: string;

  sourceLang: string;

  targetLang: string;

  grammar?: boolean;

  tone?: "normal" | "formal" | "casual";
}

/* ==========================================
   Create Room
========================================== */

export interface CreateRoomRequest {
  name: string;
}

/* ==========================================
   Socket Message
========================================== */

export interface SocketMessage {
  roomId: string;

  username: string;

  message: ChatMessage;
}

/* ==========================================
   Typing Indicator
========================================== */

export interface TypingPayload {
  roomId: string;

  username: string;
}

/* ==========================================
   Online User
========================================== */

export interface OnlineUser {
  id: string;

  username: string;
}

/* ==========================================
   Meeting Summary (Future Feature)
========================================== */

export interface MeetingSummary {
  summary: string;

  keyPoints: string[];

  actionItems: string[];
}