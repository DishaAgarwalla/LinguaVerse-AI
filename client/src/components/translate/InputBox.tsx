import { FaEdit } from "react-icons/fa";

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const InputBox = ({ value, onChange, placeholder = "Enter text..." }: Props) => {
  const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0;

  return (
    <div className="relative">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-56 resize-none rounded-xl border border-gray-200 p-4 pr-20 text-gray-700 placeholder-gray-400 outline-none transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 hover:border-blue-300"
      />
      <div className="absolute bottom-4 right-4 flex flex-col items-end gap-1">
        <span className="text-xs text-gray-400 bg-white px-2 py-1 rounded-lg border border-gray-100">
          {wordCount} words
        </span>
      </div>
    </div>
  );
};

export default InputBox;