import { useEffect, useRef } from "react";

import type { ChatMessage } from "../../types/chat";

import MessageBubble from "./MessageBubble";

interface ChatWindowProps {
  messages: ChatMessage[];
  currentUserId: string;
}

export default function ChatWindow({
  messages,
  currentUserId,
}: ChatWindowProps) {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-gray-50 space-y-4">
      {messages.length === 0 ? (
        <div className="h-full flex items-center justify-center text-gray-400">
          No messages yet.
        </div>
      ) : (
        messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            currentUserId={currentUserId}
          />
        ))
      )}

      <div ref={bottomRef} />
    </div>
  );
}