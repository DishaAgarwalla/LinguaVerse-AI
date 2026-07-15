import type { ChatRoom } from "../../types/chat";

interface Props {
  rooms: ChatRoom[];
  selectedRoom: string;
  onSelectRoom: (room: ChatRoom) => void;
}

export default function ChatSidebar({
  rooms,
  selectedRoom,
  onSelectRoom,
}: Props) {
  return (
    <aside className="w-72 border-r bg-white flex flex-col">

      <div className="border-b p-5">
        <h2 className="text-2xl font-bold text-blue-600">
          Chat Rooms
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          {rooms.length} Room{rooms.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto">

        {rooms.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No rooms available
          </div>
        ) : (
          rooms.map((room) => (
            <button
              key={room.id}
              onClick={() => onSelectRoom(room)}
              className={`w-full border-b px-5 py-4 text-left transition-all

              ${
                selectedRoom === room.id
                  ? "bg-blue-100 border-l-4 border-blue-600"
                  : "hover:bg-gray-100"
              }`}
            >
              <h3 className="font-semibold">
                {room.name}
              </h3>

              <p className="text-xs text-gray-500 mt-1">
                Click to open conversation
              </p>
            </button>
          ))
        )}

      </div>
    </aside>
  );
}