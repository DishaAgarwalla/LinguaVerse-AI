import { FaPlus } from "react-icons/fa";

interface Props {
  onClick: () => void;
}

export default function CreateRoomButton({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 font-semibold text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105"
    >
      <FaPlus className="w-4 h-4" />
      Create Room
    </button>
  );
}