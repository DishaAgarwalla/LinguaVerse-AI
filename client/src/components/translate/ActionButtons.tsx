import { useState } from "react";
import {
  FaCopy,
  FaVolumeUp,
  FaCheck,
  FaDownload,
} from "react-icons/fa";

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

const ActionButtons = ({
  translated,
  targetLang,
}: Props) => {
  const [copied, setCopied] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(translated);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error(error);
      alert("Failed to copy.");
    }
  };

  const speak = () => {
    if (!translated) return;

    setIsPlaying(true);

    const utterance = new SpeechSynthesisUtterance(
      translated
    );

    utterance.lang =
      languageCodes[targetLang] || "en-US";

    utterance.rate = 0.9;

    const voices =
      speechSynthesis.getVoices();

    const voice = voices.find((v) =>
      v.lang.startsWith(
        utterance.lang.split("-")[0]
      )
    );

    if (voice) {
      utterance.voice = voice;
    }

    utterance.onend = () => {
      setIsPlaying(false);
    };

    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
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

      {/* Copy */}

      <button
        onClick={copyText}
        className="
          inline-flex
          items-center
          gap-2
          rounded-xl
          bg-gradient-to-r
          from-blue-500
          to-indigo-600
          px-4
          py-2.5
          text-sm
          font-medium
          text-white
          shadow-lg
          shadow-blue-500/20
          transition-all
          duration-300

          hover:scale-105
          hover:shadow-xl

          dark:shadow-blue-900/30
        "
      >
        {copied ? (
          <>
            <FaCheck className="h-4 w-4" />
            Copied!
          </>
        ) : (
          <>
            <FaCopy className="h-4 w-4" />
            Copy
          </>
        )}
      </button>

      {/* Listen */}

      <button
        onClick={speak}
        disabled={isPlaying}
        className="
          inline-flex
          items-center
          gap-2
          rounded-xl
          bg-gradient-to-r
          from-green-500
          to-emerald-600
          px-4
          py-2.5
          text-sm
          font-medium
          text-white
          shadow-lg
          shadow-green-500/20
          transition-all
          duration-300

          hover:scale-105
          hover:shadow-xl

          disabled:cursor-not-allowed
          disabled:opacity-60

          dark:shadow-green-900/30
        "
      >
        <FaVolumeUp
          className={`h-4 w-4 ${
            isPlaying ? "animate-pulse" : ""
          }`}
        />

        {isPlaying
          ? "Playing..."
          : "Listen"}
      </button>

      {/* Download */}

      <button
        onClick={download}
        className="
          inline-flex
          items-center
          gap-2
          rounded-xl
          bg-gradient-to-r
          from-purple-500
          to-pink-600
          px-4
          py-2.5
          text-sm
          font-medium
          text-white
          shadow-lg
          shadow-purple-500/20
          transition-all
          duration-300

          hover:scale-105
          hover:shadow-xl

          dark:shadow-purple-900/30
        "
      >
        <FaDownload className="h-4 w-4" />
        Download
      </button>

    </div>
  );
};

export default ActionButtons;