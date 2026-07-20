import type { ChangeEvent } from "react";
import { languages } from "../../constants/languages";

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
  const handleSourceChange = (
    e: ChangeEvent<HTMLSelectElement>
  ) => {
    onSourceChange(e.target.value);
  };

  const handleTargetChange = (
    e: ChangeEvent<HTMLSelectElement>
  ) => {
    onTargetChange(e.target.value);
  };

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-lg border bg-white p-3 shadow-sm">
      <div className="flex flex-col">
        <label className="mb-1 text-xs font-semibold text-gray-600">
          Source
        </label>

        <select
          value={sourceLanguage}
          onChange={handleSourceChange}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
        >
          <option value="auto">
            🌍 Auto Detect
          </option>

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

      <div className="text-xl font-bold text-gray-400">
        →
      </div>

      <div className="flex flex-col">
        <label className="mb-1 text-xs font-semibold text-gray-600">
          Translate To
        </label>

        <select
          value={targetLanguage}
          onChange={handleTargetChange}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
        >
          {languages
            .filter(
              (language) =>
                language.code !== "auto"
            )
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