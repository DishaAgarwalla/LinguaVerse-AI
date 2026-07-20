import { useState } from "react";
import type { Socket } from "socket.io-client";

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

  const [grammarEnabled, setGrammarEnabled] =
    useState(false);

  const [tone, setTone] = useState<
    "normal" | "formal" | "casual"
  >("normal");

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

    await onSend(
      message,
      grammarEnabled,
      tone
    );

    setMessage("");

    socket?.emit("stop-typing", roomId);
  };

  return (
    <div className="border-t bg-white p-4">

      <div className="mb-4 flex flex-wrap items-center gap-4">

        <label className="flex items-center gap-2 text-sm">

          <input
            type="checkbox"
            checked={grammarEnabled}
            onChange={(e) =>
              setGrammarEnabled(e.target.checked)
            }
          />

          Grammar Correction

        </label>

        <div className="flex items-center gap-2">

          <span className="text-sm">
            Tone
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
            className="rounded-lg border px-3 py-2 text-sm"
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

      <div className="flex gap-3">

        <input
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            emitTyping();
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
          placeholder="Type your message..."
          className="
            flex-1
            rounded-xl
            border
            border-gray-300
            px-4
            py-3
            outline-none
            focus:border-blue-500
          "
        />

        <button
          onClick={handleSend}
          disabled={sending || !message.trim()}
          className="
            rounded-xl
            bg-blue-600
            px-6
            py-3
            font-semibold
            text-white
            transition
            hover:bg-blue-700
            disabled:cursor-not-allowed
            disabled:bg-gray-400
          "
        >
          {sending ? "Sending..." : "Send"}
        </button>

      </div>

    </div>
  );
}