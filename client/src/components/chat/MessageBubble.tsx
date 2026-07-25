import type { ChatMessage } from "../../types/chat";
import { FaRobot, FaClock } from "react-icons/fa";

interface MessageBubbleProps {
  message: ChatMessage;
  currentUserId: string;
}

export default function MessageBubble({ message, currentUserId }: MessageBubbleProps) {
  const mine = message.sender?.id === currentUserId;
  const senderName = message.sender?.name || "User";
  const senderInitial = senderName.charAt(0).toUpperCase();

  return (
    <div className={`flex ${mine ? "justify-end" : "justify-start"} animate-slideUp`}>
      <div
        className={`max-w-lg rounded-2xl p-4 shadow-lg transition-all duration-300 hover:shadow-xl ${
          mine
            ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-blue-500/20"
            : "bg-white border border-gray-100 shadow-gray-100/50"
        }`}
      >
        {!mine && (
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">
              {senderInitial}
            </div>
            <span className="text-xs font-semibold text-blue-600">
              {senderName}
            </span>
          </div>
        )}

        <p className={`text-sm font-medium ${mine ? "text-white" : "text-gray-800"}`}>
          {message.originalText}
        </p>

        {message.translatedText && message.translatedText !== message.originalText && (
          <>
            <hr className={`my-2 ${mine ? "border-white/20" : "border-gray-200"}`} />
            <div className={`flex items-start gap-1.5 ${mine ? "text-white/90" : "text-gray-700"}`}>
              <FaRobot className={`w-3 h-3 mt-0.5 ${mine ? "text-white/50" : "text-blue-500"}`} />
              <p className="text-sm italic">{message.translatedText}</p>
            </div>
          </>
        )}

        <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                mine ? "bg-white/20 text-white" : "bg-gray-100 text-gray-600"
              }`}
            >
              {message.sourceLang || "auto"}
            </span>
            <span className={`text-xs ${mine ? "text-white/50" : "text-gray-400"}`}>→</span>
            <span
              className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                mine ? "bg-green-500/30 text-white" : "bg-green-100 text-green-700"
              }`}
            >
              {message.targetLang || "en"}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <FaClock className={`w-3 h-3 ${mine ? "text-white/40" : "text-gray-400"}`} />
            <span className={`text-xs ${mine ? "text-white/60" : "text-gray-400"}`}>
              {new Date(message.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}