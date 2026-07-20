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

      <div className="mx-auto flex max-w-5xl flex-col gap-5">

        {messages.length === 0 && (
          <div className="mt-20 text-center text-gray-500">
            <h2 className="text-lg font-semibold">
              No messages yet
            </h2>

            <p className="mt-2 text-sm">
              Start the conversation and AI will
              translate every message instantly.
            </p>
          </div>
        )}

        {messages.map((msg) => {
          const own =
            msg.senderId === currentUserId;

          return (
            <div
              key={msg.id}
              className={`flex ${
                own
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-3 shadow-md transition ${
                  own
                    ? "bg-blue-600 text-white"
                    : "border bg-white"
                }`}
              >
                {!own && (
                  <p className="mb-2 text-xs font-bold text-blue-600">
                    👤 {msg.sender?.name ?? "User"}
                  </p>
                )}

                {/* Original Message */}

                <div>

                  <p className="text-sm font-medium">
                    {msg.originalText}
                  </p>

                </div>

                {/* AI Translation */}

                {msg.translatedText &&
                  msg.translatedText !==
                    msg.originalText && (
                    <div
                      className={`mt-3 rounded-xl p-3 ${
                        own
                          ? "bg-blue-500/30"
                          : "bg-gray-100"
                      }`}
                    >
                      <p className="mb-1 text-xs font-semibold uppercase opacity-70">
                        🌍 AI Translation
                      </p>

                      <p className="text-sm">
                        {msg.translatedText}
                      </p>
                    </div>
                  )}

                {/* Languages */}

                <div className="mt-3 flex flex-wrap gap-2">

                  <span
                    className={`rounded-full px-2 py-1 text-xs ${
                      own
                        ? "bg-blue-500/40"
                        : "bg-gray-200"
                    }`}
                  >
                    {msg.sourceLang?.toUpperCase()}
                  </span>

                  <span className="text-xs">
                    →
                  </span>

                  <span
                    className={`rounded-full px-2 py-1 text-xs ${
                      own
                        ? "bg-green-500/40"
                        : "bg-green-100"
                    }`}
                  >
                    {msg.targetLang?.toUpperCase()}
                  </span>

                </div>

                {/* Timestamp */}

                <div className="mt-3 flex items-center justify-between">

                  <p
                    className={`text-xs ${
                      own
                        ? "text-blue-100"
                        : "text-gray-500"
                    }`}
                  >
                    {new Date(
                      msg.createdAt
                    ).toLocaleTimeString()}
                  </p>

                  {own && (
                    <span className="text-xs">
                      ✓✓
                    </span>
                  )}

                </div>

              </div>
            </div>
          );
        })}

        <div ref={bottomRef} />

      </div>

    </div>
  );
}