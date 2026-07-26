import { FiGlobe } from "react-icons/fi";
import TranslateCard from "../../components/translate/TranslateCard";

const Translate = () => {
  return (
    <div className="space-y-8 animate-slideUp">
      <div>
        <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 px-4 py-1.5 text-sm font-semibold text-blue-600 border border-blue-200/50">
          <FiGlobe className="w-4 h-4" />
          Translation
        </div>
        <h1 className="mt-4 text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          AI Text Translator
        </h1>
        <p className="mt-2 text-gray-500 max-w-2xl">
          Translate text into multiple languages using advanced AI technology.
          Supports over 100 languages with high accuracy.
        </p>
      </div>

      <TranslateCard />
    </div>
  );
};

export default Translate;