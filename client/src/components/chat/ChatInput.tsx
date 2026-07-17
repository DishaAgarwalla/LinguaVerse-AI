import { useState } from "react";

interface Props {
  onSend: (
    text: string,
    sourceLang: string,
    targetLang: string,
    grammar: boolean,
    tone: "normal" | "formal" | "casual"
  ) => void;

  sending: boolean;

  onTyping?: () => void;
}

const ChatInput = ({
  onSend,
  sending,
  onTyping,
}: Props) => {
  const [message, setMessage] =
    useState("");

  const handleSend = () => {
    if (!message.trim()) return;

    onSend(
      message,
      "auto",
      "en",
      false,
      "normal"
    );

    setMessage("");
  };

  return (
    <div className="border-t bg-white p-4">

      <div className="flex gap-3">

        <input
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            onTyping?.();
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
          placeholder="Type your message..."
          className="flex-1 rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
        />

        <button
          disabled={sending}
          onClick={handleSend}
          className="rounded-xl bg-blue-600 px-6 text-white transition hover:bg-blue-700 disabled:opacity-50"
        >
          {sending ? "Sending..." : "Send"}
        </button>

      </div>

    </div>
  );
};

export default ChatInput;