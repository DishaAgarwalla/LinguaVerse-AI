import { languages } from "../../constants/languages";
import { FaChevronDown, FaGlobe } from "react-icons/fa";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const LanguageSelector = ({ value, onChange }: Props) => {
  // Get language name for display
  const selectedLanguage = languages.find(lang => lang.code === value);
  
  return (
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
        <FaGlobe className="w-4 h-4" />
      </div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none rounded-xl border border-gray-200 bg-white/80 backdrop-blur-sm pl-10 pr-10 py-3 text-sm font-medium text-gray-700 shadow-sm transition-all duration-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 hover:border-blue-300 cursor-pointer"
      >
        {languages.map((language) => (
          <option key={language.code} value={language.code} className="py-2">
            {language.name}
          </option>
        ))}
      </select>
      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
        <FaChevronDown className="w-3 h-3" />
      </div>
    </div>
  );
};

export default LanguageSelector;