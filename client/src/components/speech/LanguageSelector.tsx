import { languages } from "../../constants/languages";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const LanguageSelector = ({
  value,
  onChange,
}: Props) => {
  return (
    <div>
      <label className="mb-2 block font-semibold">
        Translate To
      </label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border p-3"
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
    </div>
  );
};

export default LanguageSelector;