import { FaGlobe, FaLanguage } from "react-icons/fa";
import { MdAutoAwesome } from "react-icons/md";
import TranslateCard from "../../components/translate/TranslateCard";

const Translate = () => {
  return (
    <div className="space-y-8 animate-slideUp">
      <div>
        <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 px-4 py-1.5 text-sm font-semibold text-blue-600 border border-blue-200/50">
          <FaGlobe className="w-4 h-4" />
          Translation
        </div>
        <h1 className="mt-4 text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          AI Text Translator
        </h1>
        <p className="mt-2 text-gray-500 max-w-2xl">
          Translate text into multiple languages using advanced AI technology.
          Supports over 100 languages with high accuracy.
        </p>
        
        <div className="mt-4 flex flex-wrap gap-4">
          <div className="inline-flex items-center gap-2 rounded-xl bg-blue-50 px-4 py-2 border border-blue-100">
            <MdAutoAwesome className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium text-blue-700">Powered by Gemini AI</span>
          </div>
          <div className="inline-flex items-center gap-2 rounded-xl bg-green-50 px-4 py-2 border border-green-100">
            <FaLanguage className="w-4 h-4 text-green-500" />
            <span className="text-sm font-medium text-green-700">100+ Languages</span>
          </div>
          <div className="inline-flex items-center gap-2 rounded-xl bg-purple-50 px-4 py-2 border border-purple-100">
            <span className="text-sm font-medium text-purple-700">⚡ Real-time</span>
          </div>
        </div>
      </div>

      <TranslateCard />
    </div>
  );
};

export default Translate;