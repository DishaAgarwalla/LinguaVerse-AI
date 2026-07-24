import type { ChatRoom } from "../../types/chat";
import { FaComments, FaUsers } from "react-icons/fa";

interface RoomCardProps {
  room: ChatRoom;
  selected: boolean;
  onClick: () => void;
}

export default function RoomCard({ room, selected, onClick }: RoomCardProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full rounded-xl p-4 text-left transition-all duration-300 group ${
        selected
          ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25"
          : "hover:bg-gray-100"
      }`}
    >
      <div className="flex items-center gap-3">
        <div className={`rounded-lg p-2 ${
          selected ? "bg-white/20" : "bg-blue-100"
        }`}>
          <FaComments className={`w-4 h-4 ${
            selected ? "text-white" : "text-blue-600"
          }`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold truncate">
            {room.name}
          </div>
          <div className={`text-xs flex items-center gap-1 ${
            selected ? "text-blue-100" : "text-gray-500"
          }`}>
            <FaUsers className="w-3 h-3" />
            Room ID: {room.id.slice(0, 8)}
          </div>
        </div>
      </div>
    </button>
  );
}