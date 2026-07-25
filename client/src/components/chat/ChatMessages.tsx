import { useEffect, useRef } from "react";
import type { ChatMessage } from "../../types/chat";
import { FaUser, FaRobot, FaClock } from "react-icons/fa";

interface Props {
  messages: ChatMessage[];
  currentUserId: string;
}

export default function ChatMessages({ messages, currentUserId }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const formatTime = (date: string) => {
    return new Date(date).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="flex-1 overflow-y-auto bg-gradient-to-br from-gray-50 via-white to-blue-50/20 p-6">
      <div className="mx-auto flex max-w-5xl flex-col gap-4">
        {messages.length === 0 && (
          <div className="mt-20 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 mb-4">
              <FaRobot className="w-10 h-10 text-blue-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-700">No messages yet</h2>
            <p className="mt-2 text-gray-500 max-w-sm mx-auto">
              Start the conversation and AI will translate every message instantly.
            </p>
          </div>
        )}

        {messages.map((msg) => {
          const own = msg.senderId === currentUserId;
          return (
            <div key={msg.id} className={`flex ${own ? "justify-end" : "justify-start"} animate-slideUp`}>
              <div
                className={`max-w-[80%] rounded-2xl px-5 py-3 shadow-lg transition-all duration-300 hover:shadow-xl ${
                  own
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-blue-500/20"
                    : "bg-white border border-gray-100 shadow-gray-100/50"
                }`}
              >
                {/* Sender */}
                {!own && (
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">
                      {msg.sender?.name?.charAt(0) || "U"}
                    </div>
                    <span className="text-xs font-semibold text-blue-600">
                      {msg.sender?.name || "User"}
                    </span>
                  </div>
                )}

                {/* Original Message */}
                <div>
                  <p className={`text-sm font-medium ${own ? "text-white" : "text-gray-800"}`}>
                    {msg.originalText}
                  </p>
                </div>

                {/* AI Translation */}
                {msg.translatedText && msg.translatedText !== msg.originalText && (
                  <div
                    className={`mt-3 rounded-xl p-3 ${
                      own ? "bg-white/10" : "bg-gradient-to-r from-blue-50 to-indigo-50"
                    }`}
                  >
                    <p className={`mb-1 text-xs font-semibold uppercase opacity-70 flex items-center gap-1 ${own ? "text-white" : "text-blue-600"}`}>
                      <FaRobot className="w-3 h-3" />
                      AI Translation
                    </p>
                    <p className={`text-sm ${own ? "text-white" : "text-gray-700"}`}>
                      {msg.translatedText}
                    </p>
                  </div>
                )}

                {/* Languages & Timestamp */}
                <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        own ? "bg-white/20 text-white" : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {msg.sourceLang?.toUpperCase()}
                    </span>
                    <span className={`text-xs ${own ? "text-white/50" : "text-gray-400"}`}>→</span>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        own ? "bg-green-500/30 text-white" : "bg-green-100 text-green-700"
                      }`}
                    >
                      {msg.targetLang?.toUpperCase()}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <FaClock className={`w-3 h-3 ${own ? "text-white/50" : "text-gray-400"}`} />
                    <p className={`text-xs ${own ? "text-white/70" : "text-gray-400"}`}>
                      {formatTime(msg.createdAt)}
                    </p>
                    {own && (
                      <span className="text-xs text-green-400">✓✓</span>
                    )}
                  </div>
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