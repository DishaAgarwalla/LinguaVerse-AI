import { Languages } from "lucide-react";
import type { Settings } from "../../types/settings";

interface Props {
  settings: Settings;
  save: (data: Partial<Settings>) => Promise<void>;
}

const languages = [
  "English",
  "Hindi",
  "Odia",
  "Spanish",
  "French",
  "German",
  "Japanese",
  "Chinese",
];

export default function LanguageSettings({
  settings,
  save,
}: Props) {
  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex items-center gap-4">

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-lg">
          <Languages className="h-7 w-7" />
        </div>

        <div>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Language
          </h2>

          <p className="mt-1 text-gray-500 dark:text-slate-400">
            Choose your preferred language for LinguaVerse AI.
          </p>

        </div>

      </div>

      {/* Card */}

      <div className="rounded-3xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-8 shadow-lg">

        <label className="mb-3 block text-sm font-semibold text-gray-700 dark:text-slate-300">
          Default Language
        </label>

        <select
          value={settings.language}
          onChange={(e) =>
            save({
              language: e.target.value,
            })
          }
          className="
            w-full
            rounded-2xl
            border
            border-gray-300
            dark:border-slate-600
            bg-white
            dark:bg-slate-900
            px-5
            py-4
            text-gray-900
            dark:text-white
            outline-none
            transition-all
            duration-300
            focus:border-blue-500
            focus:ring-4
            focus:ring-blue-200
            dark:focus:ring-blue-900
          "
        >
          {languages.map((language) => (
            <option
              key={language}
              value={language}
            >
              {language}
            </option>
          ))}
        </select>

        <p className="mt-4 text-sm text-gray-500 dark:text-slate-400">
          This language will be used throughout the application wherever supported.
        </p>

      </div>

    </div>
  );
}