import SpeechCard from "../../components/speech/SpeechCard";

const Speech = () => {
  return (
    <div className="mx-auto max-w-6xl space-y-8 p-6">

      <div>

        <h1 className="text-4xl font-bold">
          🎤 Speech Translator
        </h1>

        <p className="mt-3 text-gray-600">
          Speak naturally, translate instantly, and listen to the translated speech using your browser.
        </p>

      </div>

      <SpeechCard />

    </div>
  );
};

export default Speech;