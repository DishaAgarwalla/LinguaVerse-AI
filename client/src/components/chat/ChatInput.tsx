import { useState } from "react";
import type { Socket } from "socket.io-client";
import { 
  FaPaperPlane, 
  FaCheckCircle, 
  FaSlidersH,
  FaTimes
} from "react-icons/fa";
import { MdAutoAwesome } from "react-icons/md";

interface Props {
  onSend: (
    message: string,
    grammar: boolean,
    tone: "normal" | "formal" | "casual"
  ) => Promise<void> | void;
  sending: boolean;
  socket: Socket | null;
  roomId: string;
  username: string;
}

export default function ChatInput({
  onSend,
  sending,
  socket,
  roomId,
  username,
}: Props) {
  const [message, setMessage] = useState("");
  const [grammarEnabled, setGrammarEnabled] = useState(false);
  const [tone, setTone] = useState<"normal" | "formal" | "casual">("normal");
  const [showOptions, setShowOptions] = useState(false);

  const emitTyping = () => {
    if (!socket || !roomId) return;
    socket.emit("typing", { roomId, username });
    setTimeout(() => {
      socket.emit("stop-typing", roomId);
    }, 1000);
  };

  const handleSend = async () => {
    if (!message.trim()) return;
    await onSend(message, grammarEnabled, tone);
    setMessage("");
    socket?.emit("stop-typing", roomId);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
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
        <div className="mb-4 p-4 rounded-xl bg-gradient-to-r from-gray-50 to-blue-50/30 border border-gray-200 animate-slideDown">
          <div className="flex flex-wrap items-center gap-6">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer group">
              <input
                type="checkbox"
                checked={grammarEnabled}
                onChange={(e) => setGrammarEnabled(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2 transition-all duration-200 cursor-pointer"
              />
              <span className="group-hover:text-blue-600 transition-colors duration-200">
                <MdAutoAwesome className="inline w-3 h-3 mr-1" />
                Grammar Correction
              </span>
            </label>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Tone:</span>
              <select
                value={tone}
                onChange={(e) =>
                  setTone(e.target.value as "normal" | "formal" | "casual")
                }
                className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 hover:border-blue-300"
              >
                <option value="normal">Normal</option>
                <option value="formal">Formal</option>
                <option value="casual">Casual</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <input
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              emitTyping();
            }}
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
          onClick={handleSend}
          disabled={sending || !message.trim()}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {sending ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Sending...
            </span>
          ) : (
            <>
              <FaPaperPlane className="w-4 h-4" />
              Send
            </>
          )}
        </button>
      </div>
    </div>
  );
}