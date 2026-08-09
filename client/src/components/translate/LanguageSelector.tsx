import { languages } from "../../constants/languages";
import { FaChevronDown, FaGlobe } from "react-icons/fa";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const LanguageSelector = ({ value, onChange }: Props) => {
  return (
    <div className="relative">

      {/* Globe Icon */}

      <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500">
        <FaGlobe className="h-4 w-4" />
      </div>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full
          appearance-none
          rounded-2xl
          border
          border-gray-200
          bg-white
          py-3
          pl-11
          pr-10
          text-sm
          font-medium
          text-gray-700
          shadow-sm
          transition-all
          duration-300
          outline-none

          hover:border-blue-400
          focus:border-blue-500
          focus:ring-4
          focus:ring-blue-500/20

          dark:border-slate-700
          dark:bg-slate-900
          dark:text-slate-100
          dark:hover:border-blue-500
          dark:focus:border-blue-500
        "
      >
        {languages.map((language) => (
          <option
            key={language.code}
            value={language.code}
          >
            {language.name}
          </option>
        ))}
      </select>

      {/* Dropdown Icon */}

      <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500">
        <FaChevronDown className="h-3 w-3" />
      </div>

    </div>
  );
};

export default LanguageSelector;