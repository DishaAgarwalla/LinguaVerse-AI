import { languages } from "../../constants/languages";
import { FaChevronDown } from "react-icons/fa";

interface Props {
  value: string;
}

const LanguageSelector = ({ value }: Props) => {
  return (
    <div className="relative">
      <select
        defaultValue={value}
        className="appearance-none rounded-xl border border-gray-200 bg-white/80 backdrop-blur-sm px-4 py-2.5 pr-10 text-sm font-medium text-gray-700 shadow-sm transition-all duration-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 hover:border-blue-300 cursor-pointer"
      >
        {languages.map((language) => (
          <option
            key={language.code}
            value={language.code}
            className="py-2"
          >
            {language.name}
          </option>
        ))}
      </select>
      <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xs" />
    </div>
  );
};

export default LanguageSelector;