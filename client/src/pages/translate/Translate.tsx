import TranslateCard from "../../components/translate/TranslateCard";

const Translate = () => {
  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-4xl font-bold">
          AI Translator
        </h1>

        <p className="mt-2 text-gray-500">
          Translate text into multiple languages
          using Gemini AI.
        </p>

      </div>

      <TranslateCard />

    </div>
  );
};

export default Translate;