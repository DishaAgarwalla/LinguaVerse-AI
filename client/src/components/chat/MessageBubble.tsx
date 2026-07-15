import type { ChatMessage } from "../../types/chat";

interface MessageBubbleProps {
  message: ChatMessage;
  currentUserId: string;
}

export default function MessageBubble({
  message,
  currentUserId,
}: MessageBubbleProps) {
  const mine = message.sender.id === currentUserId;

  return (
    <div
      className={`flex ${
        mine ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-lg rounded-xl p-4 shadow ${
          mine
            ? "bg-blue-500 text-white"
            : "bg-gray-100"
        }`}
      >
        {!mine && (
          <p className="text-xs font-semibold mb-2">
            {message.sender.name}
          </p>
        )}

        <p className="font-medium">
          {message.originalText}
        </p>

        <hr className="my-2 opacity-30" />

        <p className="italic">
          {message.translatedText}
        </p>

        <div className="mt-2 text-xs opacity-70">
          {message.sourceLang} → {message.targetLang}
        </div>

        <div className="text-[11px] mt-1 opacity-60">
          {new Date(message.createdAt).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}