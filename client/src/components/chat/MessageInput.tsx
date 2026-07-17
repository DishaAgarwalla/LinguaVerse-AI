import { useState } from "react";
import { FiSend } from "react-icons/fi";

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

export default function MessageInput({
  sending,
  onSend,
}: Props) {
  const socket = useSocket();

  const username =
    localStorage.getItem("name") || "User";

  const [message, setMessage] =
    useState("");

  const [sourceLang, setSourceLang] =
    useState("en");

  const [targetLang, setTargetLang] =
    useState("hi");

  const [grammar, setGrammar] =
    useState(false);

  const [tone, setTone] = useState<
    "normal" | "formal" | "casual"
  >("normal");

  const handleTyping = (
    value: string
  ) => {
    setMessage(value);

    socket?.emit("typing", {
      username,
    });
  };

  const handleSubmit = () => {
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
    <div className="space-y-3 border-t bg-white p-4">

      <div className="flex gap-3">

        <select
          value={sourceLang}
          onChange={(e) =>
            setSourceLang(e.target.value)
          }
          className="rounded border p-2"
        >
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="fr">French</option>
          <option value="es">Spanish</option>
        </select>

        <select
          value={targetLang}
          onChange={(e) =>
            setTargetLang(e.target.value)
          }
          className="rounded border p-2"
        >
          <option value="hi">Hindi</option>
          <option value="en">English</option>
          <option value="fr">French</option>
          <option value="es">Spanish</option>
        </select>

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
          className="rounded border p-2"
        >
          <option value="normal">Normal</option>
          <option value="formal">Formal</option>
          <option value="casual">Casual</option>
        </select>

      </div>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={grammar}
          onChange={(e) =>
            setGrammar(e.target.checked)
          }
        />

        Grammar Correction
      </label>

      <div className="flex gap-3">

        <input
          value={message}
          onChange={(e) =>
            handleTyping(e.target.value)
          }
          placeholder="Type your message..."
          className="flex-1 rounded-lg border p-3"
        />

        <button
          disabled={sending}
          onClick={handleSubmit}
          className="rounded-lg bg-blue-600 px-5 text-white hover:bg-blue-700"
        >
          <FiSend />
        </button>

      </div>

    </div>
  );
}