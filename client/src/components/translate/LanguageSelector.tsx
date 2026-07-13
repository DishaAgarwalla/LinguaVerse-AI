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
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-lg border p-3"
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
  );
};

export default LanguageSelector;