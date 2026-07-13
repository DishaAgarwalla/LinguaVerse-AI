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

  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(translated);
      alert("Copied to clipboard!");
    } catch (error) {
      console.error(error);
      alert("Failed to copy.");
    }
  };

  const speak = () => {
    if (!translated) return;

    const utterance = new SpeechSynthesisUtterance(translated);

    utterance.lang = languageCodes[targetLang] || "en-US";

    const voices = speechSynthesis.getVoices();

    const voice = voices.find((v) =>
      v.lang.startsWith(utterance.lang.split("-")[0])
    );

    if (voice) {
      utterance.voice = voice;
    }

    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="mt-6 flex gap-4">
      <button
        onClick={copyText}
        className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
      >
        📋 Copy
      </button>

      <button
        onClick={speak}
        className="rounded-lg bg-green-600 px-5 py-2 text-white hover:bg-green-700"
      >
        🔊 Speak
      </button>
    </div>
  );
};

export default ActionButtons;