// components/common/LanguageSelector.tsx
import { languages } from "../../constants/languages";
import { FiChevronDown } from "react-icons/fi";

interface LanguageSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const LanguageSelector = ({ value, onChange }: LanguageSelectorProps) => {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none rounded-xl border border-gray-200 bg-white/80 backdrop-blur-sm px-4 py-2 pr-10 text-sm font-medium text-gray-700 shadow-sm transition-all duration-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 hover:border-blue-300 cursor-pointer"
      >
        {languages.map((language) => (
          <option key={language.code} value={language.code}>
            {language.name}
          </option>
        ))}
      </select>
      <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xs" />
    </div>
  );
};

export default LanguageSelector;