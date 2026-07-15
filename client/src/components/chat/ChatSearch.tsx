import { FiSearch } from "react-icons/fi";

interface ChatSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ChatSearch({
  value,
  onChange,
}: ChatSearchProps) {
  return (
    <div className="relative p-3 border-b bg-white">
      <FiSearch
        className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400"
        size={18}
      />

      <input
        type="text"
        placeholder="Search rooms..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full
          rounded-lg
          border
          border-gray-300
          py-2
          pl-10
          pr-3
          outline-none
          focus:border-blue-500
        "
      />
    </div>
  );
}