import { FaCopy, FaVolumeUp, FaCheck, FaLanguage } from "react-icons/fa";
import { speakText } from "../../services/textToSpeechService";
import { useState } from "react";

interface Props {
  original: string;
  translated: string;
  detectedLanguage: string;
}

const SpeechResult = ({ original, translated, detectedLanguage }: Props) => {
  const [copied, setCopied] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const copyText = () => {
    navigator.clipboard.writeText(translated);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const listen = () => {
    setIsPlaying(true);
    speakText(translated, detectedLanguage);
    setTimeout(() => setIsPlaying(false), translated.length * 100);
  };

  return (
    <div className="space-y-6">
      {/* Detected Language */}
      <div className="rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 p-4">
        <div className="flex items-center gap-2 text-sm font-medium text-blue-700">
          <FaLanguage className="w-4 h-4" />
          Detected Language
        </div>
        <input
          readOnly
          value={detectedLanguage}
          className="mt-2 w-full rounded-lg border border-blue-200 bg-white/50 px-4 py-2.5 text-sm font-medium text-gray-700 outline-none"
        />
      </div>

      {/* Original Speech */}
      <div>
        <h3 className="mb-2 text-sm font-semibold text-gray-700 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
          Original Speech
        </h3>
        <textarea
          readOnly
          rows={3}
          value={original}
          className="w-full rounded-xl border border-gray-200 bg-gray-50/50 p-4 text-gray-700 resize-none outline-none transition-all duration-200 focus:border-blue-500"
        />
      </div>

      {/* Translation */}
      <div>
        <h3 className="mb-2 text-sm font-semibold text-gray-700 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
          Translation
        </h3>
        <textarea
          readOnly
          rows={3}
          value={translated}
          className="w-full rounded-xl border border-gray-200 bg-gray-50/50 p-4 text-gray-700 resize-none outline-none transition-all duration-200 focus:border-green-500"
        />
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3 pt-2">
        <button
          onClick={copyText}
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
          onClick={listen}
          disabled={isPlaying}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 px-5 py-2.5 font-medium text-white shadow-lg shadow-green-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/40 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FaVolumeUp className={`w-4 h-4 ${isPlaying ? 'animate-pulse' : ''}`} />
          {isPlaying ? "Playing..." : "Listen"}
        </button>
      </div>
    </div>
  );
};

export default SpeechResult;