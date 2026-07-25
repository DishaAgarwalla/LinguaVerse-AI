import type { ChangeEvent } from "react";
import { languages } from "../../constants/languages";
import { FaGlobe, FaArrowRight } from "react-icons/fa";

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
    <div className="flex flex-wrap items-center gap-4 rounded-xl border border-gray-200 bg-white/80 backdrop-blur-sm p-3 shadow-sm">
      <div className="flex flex-col">
        <label className="mb-1 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Source
        </label>
        <select
          value={sourceLanguage}
          onChange={(e) => onSourceChange(e.target.value)}
          className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 hover:border-blue-300"
        >
          <option value="auto">🌍 Auto Detect</option>
          {languages.map((language) => (
            <option key={language.code} value={language.code}>
              {language.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center justify-center pt-3">
        <div className="rounded-full bg-blue-100 p-2 text-blue-600">
          <FaArrowRight className="w-3 h-3" />
        </div>
      </div>

      <div className="flex flex-col">
        <label className="mb-1 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Translate To
        </label>
        <select
          value={targetLanguage}
          onChange={(e) => onTargetChange(e.target.value)}
          className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 hover:border-blue-300"
        >
          {languages
            .filter((language) => language.code !== "auto")
            .map((language) => (
              <option key={language.code} value={language.code}>
                {language.name}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
}