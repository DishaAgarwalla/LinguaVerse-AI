import type { ChatRoom } from "../../types/chat";

interface RoomCardProps {
  room: ChatRoom;
  selected: boolean;
  onClick: () => void;
}

export default function RoomCard({
  room,
  selected,
  onClick,
}: RoomCardProps) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full
        rounded-lg
        p-3
        text-left
        transition

        ${
          selected
            ? "bg-blue-600 text-white"
            : "hover:bg-gray-100"
        }
      `}
    >
      <div className="font-semibold">
        {room.name}
      </div>

      <div
        className={`
          text-sm

          ${
            selected
              ? "text-blue-100"
              : "text-gray-500"
          }
        `}
      >
        Room ID

        <span className="ml-1">
          {room.id.slice(0, 8)}
        </span>
      </div>
    </button>
  );
}