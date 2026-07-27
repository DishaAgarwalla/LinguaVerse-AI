import { FaMicrophone, FaWaveSquare, FaLanguage } from "react-icons/fa";
import SpeechCard from "../../components/speech/SpeechCard";

const Speech = () => {
  return (
    <div className="space-y-8 animate-slideUp">
      <div>
        <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 px-4 py-1.5 text-sm font-semibold text-purple-600 border border-purple-200/50">
          <FaMicrophone className="w-4 h-4" />
          Speech Translation
        </div>
        <h1 className="mt-4 text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          🎤 Speech Translator
        </h1>
        <p className="mt-2 text-gray-500 max-w-2xl">
          Speak naturally, translate instantly, and listen to the translated speech using your browser.
          Experience real-time voice translation powered by AI.
        </p>
        
        {/* Quick stats */}
        <div className="mt-4 flex flex-wrap gap-4">
          <div className="inline-flex items-center gap-2 rounded-xl bg-purple-50 px-4 py-2 border border-purple-100">
            <FaWaveSquare className="w-4 h-4 text-purple-500" />
            <span className="text-sm font-medium text-purple-700">Real-time</span>
          </div>
          <div className="inline-flex items-center gap-2 rounded-xl bg-blue-50 px-4 py-2 border border-blue-100">
            <FaLanguage className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium text-blue-700">100+ Languages</span>
          </div>
          <div className="inline-flex items-center gap-2 rounded-xl bg-green-50 px-4 py-2 border border-green-100">
            <span className="text-sm font-medium text-green-700">🔊 Text-to-Speech</span>
          </div>
        </div>
      </div>

      <SpeechCard />
    </div>
  );
};

export default Speech;