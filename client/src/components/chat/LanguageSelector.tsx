import { languages } from "../../constants/languages";
import { FaArrowRight } from "react-icons/fa";

interface LanguageSelectorProps {
  sourceLanguage: string;
  targetLanguage: string;
  onSourceChange: (value: string) => void;
  onTargetChange: (value: string) => void;
}

export default function LanguageSelector({
  sourceLanguage,
  targetLanguage,
  onSourceChange,
  onTargetChange,
}: LanguageSelectorProps) {
  return (
    <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-gray-200 bg-white/90 p-4 shadow-sm backdrop-blur-sm transition-colors duration-300 dark:border-slate-700 dark:bg-slate-800/90">

      {/* Source Language */}

      <div className="flex flex-col">
        <label className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-slate-400">
          Source
        </label>

        <select
          value={sourceLanguage}
          onChange={(e) => onSourceChange(e.target.value)}
          className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-blue-400"
        >
          <option value="auto">🌍 Auto Detect</option>

          {languages.map((language) => (
            <option
              key={language.code}
              value={language.code}
            >
              {language.name}
            </option>
          ))}
        </select>
      </div>

      {/* Arrow */}

      <div className="flex items-center justify-center pt-5">
        <div className="rounded-full bg-blue-100 p-3 text-blue-600 transition-colors duration-300 dark:bg-blue-500/20 dark:text-blue-400">
          <FaArrowRight className="h-3 w-3" />
        </div>
      </div>

      {/* Target Language */}

      <div className="flex flex-col">
        <label className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-slate-400">
          Translate To
        </label>

        <select
          value={targetLanguage}
          onChange={(e) => onTargetChange(e.target.value)}
          className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-blue-400"
        >
          {languages
            .filter((language) => language.code !== "auto")
            .map((language) => (
              <option
                key={language.code}
                value={language.code}
              >
                {language.name}
              </option>
            ))}
        </select>
      </div>

    </div>
  );
}