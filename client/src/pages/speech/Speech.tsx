import { FaMicrophone, FaWaveSquare, FaLanguage } from "react-icons/fa";
import SpeechCard from "../../components/speech/SpeechCard";

const Speech = () => {
  return (
    <div className="space-y-8 animate-slideUp">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 rounded-full border border-purple-200/50 bg-gradient-to-r from-purple-100 to-pink-100 px-4 py-1.5 text-sm font-semibold text-purple-600 dark:border-purple-700 dark:from-purple-900/40 dark:to-pink-900/40 dark:text-purple-300">
          <FaMicrophone className="h-4 w-4" />
          Speech Translation
        </div>

        <h1 className="mt-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-3xl font-bold text-transparent dark:from-white dark:to-gray-300 md:text-4xl">
          🎤 Speech Translator
        </h1>

        <p className="mt-2 max-w-2xl text-gray-500 dark:text-gray-400">
          Speak naturally, translate instantly, and listen to the translated
          speech using your browser. Experience real-time voice translation
          powered by AI.
        </p>

        {/* Feature Highlights */}
        <div className="mt-6 flex flex-wrap gap-4">
          <div className="inline-flex items-center gap-2 rounded-xl border border-purple-100 bg-purple-50 px-4 py-2 dark:border-purple-700 dark:bg-purple-900/30">
            <FaWaveSquare className="h-4 w-4 text-purple-500 dark:text-purple-300" />
            <span className="text-sm font-medium text-purple-700 dark:text-purple-200">
              Real-time Recognition
            </span>
          </div>

          <div className="inline-flex items-center gap-2 rounded-xl border border-blue-100 bg-blue-50 px-4 py-2 dark:border-blue-700 dark:bg-blue-900/30">
            <FaLanguage className="h-4 w-4 text-blue-500 dark:text-blue-300" />
            <span className="text-sm font-medium text-blue-700 dark:text-blue-200">
              100+ Languages
            </span>
          </div>

          <div className="inline-flex items-center gap-2 rounded-xl border border-green-100 bg-green-50 px-4 py-2 dark:border-green-700 dark:bg-green-900/30">
            <span className="text-sm font-medium text-green-700 dark:text-green-200">
              🔊 Text-to-Speech
            </span>
          </div>
        </div>
      </div>

      {/* Speech Translator Card */}
      <SpeechCard />
    </div>
  );
};

export default Speech;