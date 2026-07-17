import { useEffect, useRef } from "react";
import type { ChatMessage } from "../../types/chat";

interface Props {
  messages: ChatMessage[];
  currentUserId: string;
}

export default function ChatMessages({
  messages,
  currentUserId,
}: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 p-6">
      <div className="mx-auto flex max-w-4xl flex-col gap-4">
        {messages.map((msg) => {
          const own = msg.senderId === currentUserId;

          return (
            <div
              key={msg.id}
              className={`flex ${
                own ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] rounded-2xl px-4 py-3 shadow ${
                  own
                    ? "bg-blue-600 text-white"
                    : "bg-white"
                }`}
              >
                {!own && (
                  <p className="mb-1 text-xs font-semibold text-blue-600">
                    {msg.sender?.name}
                  </p>
                )}

                <p>{msg.originalText}</p>

                {msg.translatedText &&
                  msg.translatedText !== msg.originalText && (
                    <div className="mt-2 rounded-lg bg-black/10 p-2 text-sm">
                      🌍 {msg.translatedText}
                    </div>
                  )}

                <p className="mt-2 text-right text-xs opacity-70">
                  {new Date(msg.createdAt).toLocaleTimeString()}
                </p>
              </div>
            </div>
          );
        })}

        <div ref={bottomRef} />
      </div>
    </div>
  );
}