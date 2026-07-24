import type { ChatRoom } from "../../types/chat";
import { FaComments, FaHashtag, FaUsers } from "react-icons/fa";

interface Props {
  rooms: ChatRoom[];
  selectedRoom: string;
  onSelectRoom: (room: ChatRoom) => void;
}

export default function ChatSidebar({ rooms, selectedRoom, onSelectRoom }: Props) {
  return (
    <aside className="w-72 border-r border-gray-200/50 bg-white/95 backdrop-blur-sm flex flex-col shadow-lg">
      <div className="border-b border-gray-200/50 p-5">
        <div className="flex items-center gap-2">
          <div className="rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 p-2 shadow-lg shadow-blue-500/20">
            <FaComments className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Chat Rooms
            </h2>
            <p className="text-xs text-gray-500">
              {rooms.length} Room{rooms.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
        {rooms.length === 0 ? (
          <div className="p-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-3">
              <FaHashtag className="w-8 h-8 text-gray-300" />
            </div>
            <p className="text-sm text-gray-500">No rooms available</p>
            <p className="text-xs text-gray-400 mt-1">Create one to get started</p>
          </div>
        ) : (
          rooms.map((room) => (
            <button
              key={room.id}
              onClick={() => onSelectRoom(room)}
              className={`w-full rounded-xl px-4 py-3 text-left transition-all duration-300 group ${
                selectedRoom === room.id
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25"
                  : "hover:bg-gray-100"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`rounded-lg p-1.5 ${
                  selectedRoom === room.id 
                    ? "bg-white/20" 
                    : "bg-blue-100"
                }`}>
                  <FaHashtag className={`w-4 h-4 ${
                    selectedRoom === room.id 
                      ? "text-white" 
                      : "text-blue-600"
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className={`font-semibold truncate ${
                    selectedRoom === room.id ? "text-white" : "text-gray-800"
                  }`}>
                    {room.name}
                  </h3>
                  <p className={`text-xs truncate ${
                    selectedRoom === room.id ? "text-blue-100" : "text-gray-400"
                  }`}>
                    Click to join conversation
                  </p>
                </div>
              </div>
            </button>
          ))
        )}
      </div>

      {/* Bottom section */}
      <div className="border-t border-gray-200/50 p-4 bg-gradient-to-r from-gray-50 to-blue-50/20">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <FaUsers className="w-3 h-3 text-blue-500" />
          <span>{rooms.length} total rooms</span>
        </div>
      </div>
    </aside>
  );
}