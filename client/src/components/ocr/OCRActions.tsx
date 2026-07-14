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

const OCRActions = ({
  translated,
  targetLang,
}: Props) => {
  const copy = async () => {
    await navigator.clipboard.writeText(translated);

    alert("Copied!");
  };

  const speak = () => {
    const utterance =
      new SpeechSynthesisUtterance(translated);

    utterance.lang =
      languageCodes[targetLang] || "en-US";

    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="mt-8 flex gap-4">

      <button
        onClick={copy}
        className="rounded-lg bg-blue-600 px-5 py-2 text-white"
      >
        Copy
      </button>

      <button
        onClick={speak}
        className="rounded-lg bg-green-600 px-5 py-2 text-white"
      >
        Speak
      </button>

    </div>
  );
};

export default OCRActions;