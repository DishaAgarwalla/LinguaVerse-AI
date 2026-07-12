import { languages } from "../../constants/languages";

interface Props {
  value: string;
}

const LanguageSelector = ({ value }: Props) => {
  return (
    <select
      defaultValue={value}
      className="rounded-lg border border-slate-300 px-4 py-2"
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