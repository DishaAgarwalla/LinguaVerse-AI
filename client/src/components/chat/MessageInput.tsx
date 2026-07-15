import { useState } from "react";

import LanguageSelector from "./LanguageSelector";
import GrammarSuggestion from "./GrammarSuggestion";
import ToneSelector from "./ToneSelector";

interface MessageInputProps {
  onSend: (
    message: string,
    sourceLang: string,
    targetLang: string,
    grammar: boolean,
    tone: "normal" | "formal" | "casual"
  ) => void;

  sending?: boolean;
}

export default function MessageInput({
  onSend,
  sending = false,
}: MessageInputProps) {
  const [message, setMessage] = useState("");

  // Language codes
  const [sourceLang, setSourceLang] =
    useState("auto");

  const [targetLang, setTargetLang] =
    useState("hi");

  const [grammar, setGrammar] =
    useState(true);

  const [tone, setTone] = useState<
    "normal" | "formal" | "casual"
  >("normal");

  const handleSend = () => {
    if (!message.trim()) return;

    onSend(
      message,
      sourceLang,
      targetLang,
      grammar,
      tone
    );

    setMessage("");
  };

  return (
    <div className="space-y-4 border-t bg-white p-4">

      <div className="grid grid-cols-2 gap-4">

        <LanguageSelector
          value={sourceLang}
          onChange={setSourceLang}
        />

        <LanguageSelector
          value={targetLang}
          onChange={setTargetLang}
        />

      </div>

      <div className="flex items-center justify-between rounded-lg bg-gray-100 p-4">

        <GrammarSuggestion
          enabled={grammar}
          onToggle={setGrammar}
        />

        <ToneSelector
          value={tone}
          onChange={setTone}
        />

      </div>

      <div className="flex gap-3">

        <input
          type="text"
          value={message}
          disabled={sending}
          placeholder="Type your message..."
          onChange={(e) =>
            setMessage(e.target.value)
          }
          onKeyDown={(e) => {
            if (
              e.key === "Enter" &&
              !sending
            ) {
              handleSend();
            }
          }}
          className="
            flex-1
            rounded-lg
            border
            px-4
            py-3
            outline-none
            transition
            focus:border-blue-500
            disabled:cursor-not-allowed
            disabled:bg-gray-100
          "
        />

        <button
          onClick={handleSend}
          disabled={
            sending || !message.trim()
          }
          className="
            rounded-lg
            bg-blue-600
            px-6
            py-3
            font-medium
            text-white
            transition
            hover:bg-blue-700
            disabled:cursor-not-allowed
            disabled:bg-gray-400
          "
        >
          {sending
            ? "Sending..."
            : "Send"}
        </button>

      </div>

    </div>
  );
}