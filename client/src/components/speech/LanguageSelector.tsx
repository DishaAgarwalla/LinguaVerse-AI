import { languages } from "../../constants/languages";
import { FaChevronDown, FaGlobe } from "react-icons/fa";

interface Props {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

const LanguageSelector = ({ value, onChange, label = "Translate To" }: Props) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
        <FaGlobe className="w-4 h-4 text-blue-500" />
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-xl border border-gray-200 bg-white/80 backdrop-blur-sm px-4 py-3 pr-12 text-sm font-medium text-gray-700 shadow-sm transition-all duration-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 hover:border-blue-300 cursor-pointer"
        >
          {languages.map((language) => (
            <option key={language.code} value={language.code} className="py-2">
              {language.name}
            </option>
          ))}
        </select>
        <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xs" />
      </div>
    </div>
  );
};

export default LanguageSelector;