import { FaGlobe, FaLanguage } from "react-icons/fa";
import { MdAutoAwesome } from "react-icons/md";
import TranslateCard from "../../components/translate/TranslateCard";

const Translate = () => {
  return (
    <div className="space-y-8 animate-slideUp">
      {/* Header */}
      <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-gradient-to-r from-blue-100 to-indigo-100 px-4 py-1.5 text-sm font-semibold text-blue-600 dark:border-blue-800 dark:from-blue-900/40 dark:to-indigo-900/40 dark:text-blue-300">
          <FaGlobe className="h-4 w-4" />
          Translation
        </div>

        <h1 className="mt-5 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-3xl font-bold text-transparent md:text-4xl dark:from-white dark:to-slate-300">
          AI Text Translator
        </h1>

        <p className="mt-3 max-w-2xl text-base leading-7 text-gray-600 dark:text-slate-400">
          Translate text into multiple languages using advanced AI technology.
          Supports over 100 languages with high accuracy and natural context.
        </p>

        {/* Badges */}
        <div className="mt-6 flex flex-wrap gap-4">
          <div className="inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-2 dark:border-blue-800 dark:bg-blue-900/30">
            <MdAutoAwesome className="h-4 w-4 text-blue-500 dark:text-blue-300" />
            <span className="text-sm font-medium text-blue-700 dark:text-blue-200">
              Powered by Gemini AI
            </span>
          </div>

          <div className="inline-flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-2 dark:border-green-800 dark:bg-green-900/30">
            <FaLanguage className="h-4 w-4 text-green-500 dark:text-green-300" />
            <span className="text-sm font-medium text-green-700 dark:text-green-200">
              100+ Languages
            </span>
          </div>

          <div className="inline-flex items-center gap-2 rounded-xl border border-purple-200 bg-purple-50 px-4 py-2 dark:border-purple-800 dark:bg-purple-900/30">
            <span className="text-sm font-medium text-purple-700 dark:text-purple-200">
              ⚡ Real-time Translation
            </span>
          </div>
        </div>
      </div>

      {/* Translator */}
      <TranslateCard />
    </div>
  );
};

export default Translate;