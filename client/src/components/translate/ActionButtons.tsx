import { useState } from "react";
import { FaCopy, FaVolumeUp, FaCheck, FaDownload } from "react-icons/fa";

interface Props {
  translated: string;
  targetLang: string;
}

const languageCodes: Record<string, string> = {
  English: "en-US",
  Hindi: "hi-IN",
  Bengali: "bn-IN",
  Spanish: "es-ES",
  French: "fr-FR",
  German: "de-DE",
  Japanese: "ja-JP",
  Chinese: "zh-CN",
  Korean: "ko-KR",
  Russian: "ru-RU",
  Arabic: "ar-SA",
  Tamil: "ta-IN",
  Telugu: "te-IN",
  Marathi: "mr-IN",
  Gujarati: "gu-IN",
  Punjabi: "pa-IN",
};

const ActionButtons = ({ translated, targetLang }: Props) => {
  const [copied, setCopied] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(translated);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error(error);
      alert("Failed to copy.");
    }
  };

  const speak = () => {
    if (!translated) return;

    setIsPlaying(true);
    const utterance = new SpeechSynthesisUtterance(translated);
    utterance.lang = languageCodes[targetLang] || "en-US";
    utterance.rate = 0.9;

    const voices = speechSynthesis.getVoices();
    const voice = voices.find((v) =>
      v.lang.startsWith(utterance.lang.split("-")[0])
    );
    if (voice) {
      utterance.voice = voice;
    }

    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
    
    setTimeout(() => setIsPlaying(false), Math.max(translated.length * 100, 1000));
  };

  const download = () => {
    const blob = new Blob([translated], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `translation_${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={copyText}
        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105"
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
        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-green-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/40 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FaVolumeUp className={`w-4 h-4 ${isPlaying ? "animate-pulse" : ""}`} />
        {isPlaying ? "Playing..." : "Listen"}
      </button>

      <button
        onClick={download}
        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-purple-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/40 hover:scale-105"
      >
        <FaDownload className="w-4 h-4" />
        Download
      </button>
    </div>
  );
};

export default ActionButtons;