import { FaSearch, FaTimes } from "react-icons/fa";

interface ChatSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ChatSearch({ value, onChange }: ChatSearchProps) {
  return (
    <div className="relative p-4 border-b border-gray-200/50 bg-white/95 backdrop-blur-sm">
      <div className="absolute left-7 top-1/2 -translate-y-1/2 text-gray-400">
        <FaSearch className="w-4 h-4" />
      </div>
      <input
        type="text"
        placeholder="Search rooms..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-gray-200 bg-gray-50/50 py-2.5 pl-10 pr-10 text-sm text-gray-700 placeholder-gray-400 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 hover:border-blue-300"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-7 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
        >
          <FaTimes className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}