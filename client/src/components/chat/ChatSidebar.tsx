import type { ChatRoom } from "../../types/chat";
import {
  FaComments,
  FaHashtag,
  FaUsers,
} from "react-icons/fa";

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
    <aside className="flex w-72 flex-col border-r border-gray-200 bg-white/95 shadow-lg backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/95">

      {/* Header */}

      <div className="border-b border-gray-200 p-5 dark:border-gray-800">

        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 p-3 shadow-lg shadow-blue-500/20">

            <FaComments className="h-5 w-5 text-white" />

          </div>

          <div>

            <h2 className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-xl font-bold text-transparent">

              Chat Rooms

            </h2>

            <p className="text-xs text-gray-500 dark:text-gray-400">

              {rooms.length} Room
              {rooms.length !== 1 ? "s" : ""}

            </p>

          </div>

        </div>

      </div>

      {/* Room List */}

      <div className="flex-1 space-y-2 overflow-y-auto p-3">

        {rooms.length === 0 ? (

          <div className="flex h-full flex-col items-center justify-center px-6 py-10 text-center">

            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">

              <FaHashtag className="h-8 w-8 text-gray-400 dark:text-gray-500" />

            </div>

            <p className="font-medium text-gray-600 dark:text-gray-300">

              No Rooms Available

            </p>

            <p className="mt-2 text-sm text-gray-400 dark:text-gray-500">

              Create a room to start chatting.

            </p>

          </div>

        ) : (

          rooms.map((room) => {

            const active =
              selectedRoom === room.id;

            return (
              <button
                key={room.id}
                onClick={() => onSelectRoom(room)}
                className={`group w-full rounded-2xl px-4 py-3 text-left transition-all duration-300 ${
                  active
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30"
                    : "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <div className="flex items-center gap-3">

                  <div
                    className={`rounded-lg p-2 ${
                      active
                        ? "bg-white/20"
                        : "bg-blue-100 dark:bg-blue-900/30"
                    }`}
                  >
                    <FaHashtag
                      className={`h-4 w-4 ${
                        active
                          ? "text-white"
                          : "text-blue-600 dark:text-blue-400"
                      }`}
                    />
                  </div>

                  <div className="min-w-0 flex-1">

                    <h3
                      className={`truncate font-semibold ${
                        active
                          ? "text-white"
                          : "text-gray-800 dark:text-gray-200"
                      }`}
                    >
                      {room.name}
                    </h3>

                    <p
                      className={`truncate text-xs ${
                        active
                          ? "text-blue-100"
                          : "text-gray-400 dark:text-gray-500"
                      }`}
                    >
                      Click to join conversation
                    </p>

                  </div>

                </div>
              </button>
            );
          })

        )}

      </div>

      {/* Footer */}

      <div className="border-t border-gray-200 bg-gradient-to-r from-gray-50 to-blue-50/20 p-4 dark:border-gray-800 dark:from-gray-900 dark:to-gray-800">

        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">

          <FaUsers className="h-4 w-4 text-blue-500" />

          <span>
            {rooms.length} total room
            {rooms.length !== 1 ? "s" : ""}
          </span>

        </div>

      </div>

    </aside>
  );
}