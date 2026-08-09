import { FaEdit } from "react-icons/fa";

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const InputBox = ({
  value,
  onChange,
  placeholder = "Enter text...",
}: Props) => {
  const wordCount = value.trim()
    ? value.trim().split(/\s+/).length
    : 0;

  const charCount = value.length;

  return (
    <div className="relative">

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          h-56
          w-full
          resize-none
          rounded-2xl
          border
          border-gray-200
          bg-white
          p-5
          pr-20
          text-gray-800
          placeholder:text-gray-400
          outline-none
          transition-all
          duration-300
          focus:border-blue-500
          focus:ring-4
          focus:ring-blue-500/20
          hover:border-blue-300

          dark:border-slate-700
          dark:bg-slate-900
          dark:text-slate-100
          dark:placeholder:text-slate-500
          dark:hover:border-blue-500
          dark:focus:border-blue-500
        "
      />

      {/* Edit Icon */}

      <div className="absolute right-5 top-5 text-gray-300 dark:text-slate-600">
        <FaEdit className="text-lg" />
      </div>

      {/* Stats */}

      <div className="absolute bottom-4 right-4 flex flex-col items-end gap-2">

        <span
          className="
            rounded-lg
            border
            border-gray-200
            bg-white/90
            px-3
            py-1
            text-xs
            font-medium
            text-gray-500
            backdrop-blur

            dark:border-slate-700
            dark:bg-slate-800/80
            dark:text-slate-400
          "
        >
          {wordCount} words
        </span>

        <span
          className="
            rounded-lg
            border
            border-gray-200
            bg-white/90
            px-3
            py-1
            text-xs
            font-medium
            text-gray-500
            backdrop-blur

            dark:border-slate-700
            dark:bg-slate-800/80
            dark:text-slate-400
          "
        >
          {charCount} characters
        </span>

      </div>

    </div>
  );
};

export default InputBox;