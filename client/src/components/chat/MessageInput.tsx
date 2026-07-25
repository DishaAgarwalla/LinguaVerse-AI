import { useState } from "react";
import { FaPaperPlane, FaGlobe, FaSlidersH } from "react-icons/fa";
import { MdAutoAwesome } from "react-icons/md";
import useSocket from "../../hooks/useSocket";

interface Props {
  sending: boolean;
  onSend: (
    message: string,
    sourceLang: string,
    targetLang: string,
    grammar: boolean,
    tone: "normal" | "formal" | "casual"
  ) => void;
}

export default function MessageInput({ sending, onSend }: Props) {
  const socket = useSocket();
  const username = localStorage.getItem("name") || "User";

  const [message, setMessage] = useState("");
  const [sourceLang, setSourceLang] = useState("en");
  const [targetLang, setTargetLang] = useState("hi");
  const [grammar, setGrammar] = useState(false);
  const [tone, setTone] = useState<"normal" | "formal" | "casual">("normal");
  const [showOptions, setShowOptions] = useState(false);

  const handleTyping = (value: string) => {
    setMessage(value);
    socket?.emit("typing", { username });
  };

  const handleSubmit = () => {
    if (!message.trim()) return;
    onSend(message, sourceLang, targetLang, grammar, tone);
    setMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="border-t border-gray-200/50 bg-white/95 backdrop-blur-sm p-4">
      {/* Options Toggle */}
      <button
        onClick={() => setShowOptions(!showOptions)}
        className="mb-3 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition-colors duration-200"
      >
        <FaSlidersH className={`w-4 h-4 ${showOptions ? 'text-blue-600' : ''}`} />
        {showOptions ? "Hide options" : "Show options"}
      </button>

      {/* Options */}
      {showOptions && (
        <div className="mb-4 flex flex-wrap items-center gap-4 p-3 rounded-xl bg-gradient-to-r from-gray-50 to-blue-50/30 border border-gray-200 animate-slideDown">
          <select
            value={sourceLang}
            onChange={(e) => setSourceLang(e.target.value)}
            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="fr">French</option>
            <option value="es">Spanish</option>
          </select>

          <span className="text-gray-400">→</span>

          <select
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value)}
            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="hi">Hindi</option>
            <option value="en">English</option>
            <option value="fr">French</option>
            <option value="es">Spanish</option>
          </select>

          <select
            value={tone}
            onChange={(e) => setTone(e.target.value as "normal" | "formal" | "casual")}
            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="normal">Normal</option>
            <option value="formal">Formal</option>
            <option value="casual">Casual</option>
          </select>

          <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              checked={grammar}
              onChange={(e) => setGrammar(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2 transition-all duration-200 cursor-pointer"
            />
            <MdAutoAwesome className="w-3 h-3" />
            Grammar
          </label>
        </div>
      )}

      {/* Input */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <input
            value={message}
            onChange={(e) => handleTyping(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 pr-12 text-gray-700 placeholder-gray-400 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 hover:border-blue-300"
          />
          {message.length > 0 && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
              {message.length}
            </span>
          )}
        </div>

        <button
          disabled={sending}
          onClick={handleSubmit}
          className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {sending ? (
            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          ) : (
            <FaPaperPlane className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );
}