interface SpeechPanelProps {
  text: string;
}

const SpeechPanel = ({
  text,
}: SpeechPanelProps) => {
  const speak = () => {
    if (!text) return;

    const speech =
      new SpeechSynthesisUtterance(text);

    speech.lang = "en-US";

    window.speechSynthesis.speak(speech);
  };

  return (
    <div className="rounded-xl bg-white p-5 shadow">

      <h2 className="mb-5 text-lg font-semibold">
        🔊 Speech Output
      </h2>

      <div className="rounded-lg border bg-gray-50 p-4">

        <p className="min-h-[60px]">
          {text || "Nothing to speak yet."}
        </p>

      </div>

      <button
        onClick={speak}
        disabled={!text}
        className="mt-5 w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:bg-gray-400"
      >
        ▶ Play Audio
      </button>

    </div>
  );
};

export default SpeechPanel;