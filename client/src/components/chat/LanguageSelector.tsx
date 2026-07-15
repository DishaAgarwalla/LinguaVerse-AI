import type { ChangeEvent } from "react";
import { languages } from "../../constants/languages";

interface LanguageSelectorProps {
  value: string;
  onChange: (language: string) => void;
}

export default function LanguageSelector({
  value,
  onChange,
}: LanguageSelectorProps) {
  const handleChange = (
    e: ChangeEvent<HTMLSelectElement>
  ) => {
    onChange(e.target.value);
  };

  return (
    <select
      value={value}
      onChange={handleChange}
      className="
        rounded-lg
        border
        border-gray-300
        px-3
        py-2
        text-sm
        focus:outline-none
        focus:ring-2
        focus:ring-blue-500
      "
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
  );
}