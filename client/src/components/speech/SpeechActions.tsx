import { useState } from "react";
import { FaCopy, FaVolumeUp, FaCheck } from "react-icons/fa";
import { speakText } from "../../services/textToSpeechService";

interface Props {
  translated: string;
  language?: string;
}

const SpeechActions = ({ translated, language = "en" }: Props) => {
  const [copied, setCopied] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(translated);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const speak = () => {
    setIsPlaying(true);
    speakText(translated, language);
    setTimeout(() => setIsPlaying(false), translated.length * 100);
  };

  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={copy}
        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 px-5 py-2.5 font-medium text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105"
      >
        {copied ? (
          <>
            <FaCheck className="w-4 h-4" />
            Copied!
          </>
        ) : (
          <>
            <FaCopy className="w-4 h-4" />
            Copy
          </>
        )}
      </button>

      <button
        onClick={speak}
        disabled={isPlaying}
        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 px-5 py-2.5 font-medium text-white shadow-lg shadow-green-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/40 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FaVolumeUp className={`w-4 h-4 ${isPlaying ? 'animate-pulse' : ''}`} />
        {isPlaying ? "Playing..." : "Listen"}
      </button>
    </div>
  );
};

export default SpeechActions;