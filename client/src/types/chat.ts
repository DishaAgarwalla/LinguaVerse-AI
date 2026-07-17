export interface ChatRoom {
  id: string;
  name: string;
  createdAt: string;
}

export interface ChatUser {
  id: string;
  name: string;
  email: string;
}

export interface ChatMessage {
  id: string;

  originalText: string;
  translatedText: string;

  sourceLang: string;
  targetLang: string;

  createdAt: string;

  roomId: string;
  senderId: string;

  sender: ChatUser;
}

export interface SendMessageRequest {
  roomId: string;
  message: string;
  sourceLang: string;
  targetLang: string;
  grammar?: boolean;
  tone?: "normal" | "formal" | "casual";
}