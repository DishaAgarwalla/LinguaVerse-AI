import { useState } from "react";
import type { Socket } from "socket.io-client";
import {
  FaPaperPlane,
  FaSlidersH,
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
  const [tone, setTone] =
    useState<"normal" | "formal" | "casual">("normal");
  const [showOptions, setShowOptions] = useState(false);

  const emitTyping = () => {
    if (!socket || !roomId) return;

    socket.emit("typing", {
      roomId,
      username,
    });

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

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-gray-200 bg-white/95 backdrop-blur-sm p-4 transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900/95">

      {/* Toggle */}

      <button
        onClick={() => setShowOptions(!showOptions)}
        className="mb-3 inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
      >
        <FaSlidersH
          className={`h-4 w-4 ${
            showOptions
              ? "text-blue-600 dark:text-blue-400"
              : ""
          }`}
        />

        {showOptions
          ? "Hide options"
          : "Show options"}
      </button>

      {/* Options */}

      {showOptions && (
        <div className="mb-4 animate-slideDown rounded-xl border border-gray-200 bg-gradient-to-r from-gray-50 to-blue-50/30 p-4 dark:border-slate-700 dark:from-slate-800 dark:to-slate-900">

          <div className="flex flex-wrap items-center gap-6">

            <label className="group flex cursor-pointer items-center gap-2 text-sm font-medium text-gray-700 dark:text-slate-300">

              <input
                type="checkbox"
                checked={grammarEnabled}
                onChange={(e) =>
                  setGrammarEnabled(e.target.checked)
                }
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
              />

              <span className="transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
                <MdAutoAwesome className="mr-1 inline h-3 w-3" />
                Grammar Correction
              </span>

            </label>

            <div className="flex items-center gap-2">

              <span className="text-sm font-medium text-gray-700 dark:text-slate-300">
                Tone:
              </span>

              <select
                value={tone}
                onChange={(e) =>
                  setTone(
                    e.target.value as
                      | "normal"
                      | "formal"
                      | "casual"
                  )
                }
                className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200"
              >
                <option value="normal">
                  Normal
                </option>

                <option value="formal">
                  Formal
                </option>

                <option value="casual">
                  Casual
                </option>

              </select>

            </div>

          </div>

        </div>
      )}

      {/* Input */}

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
            className="w-full rounded-xl border border-gray-200 bg-gray-50/70 px-4 py-3 pr-12 text-gray-700 placeholder-gray-400 outline-none transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:placeholder-slate-400"
          />

          {message.length > 0 && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 dark:text-slate-500">
              {message.length}
            </span>
          )}

        </div>

        <button
          onClick={handleSend}
          disabled={sending || !message.trim()}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/40 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
        >
          {sending ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
              Sending...
            </>
          ) : (
            <>
              <FaPaperPlane className="h-4 w-4" />
              Send
            </>
          )}
        </button>

      </div>

    </div>
  );
}