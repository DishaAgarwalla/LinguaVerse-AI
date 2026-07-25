import { useState, useEffect } from "react";
import { FaTimes, FaPlus, FaComments } from "react-icons/fa";

interface Props {
  open: boolean;
  onClose: () => void;
  onCreate: (roomName: string) => void;
}

export default function CreateRoomModal({ open, onClose, onCreate }: Props) {
  const [roomName, setRoomName] = useState("");

  useEffect(() => {
    if (!open) {
      setRoomName("");
    }
  }, [open]);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (roomName.trim()) {
      onCreate(roomName.trim());
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fadeIn">
      <div className="w-[440px] rounded-2xl bg-white p-6 shadow-2xl border border-gray-100 animate-slideDown">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 p-2.5 shadow-lg shadow-blue-500/20">
              <FaComments className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">Create Chat Room</h2>
              <p className="text-xs text-gray-500">Start a new conversation</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors duration-200"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Room Name
            </label>
            <input
              autoFocus
              type="text"
              placeholder="Example: Team Discussion"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-gray-700 placeholder-gray-400 outline-none transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 hover:border-blue-300"
            />
            <p className="mt-1.5 text-xs text-gray-400">
              Give your room a descriptive name
            </p>
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border-2 border-gray-200 px-5 py-2.5 font-medium text-gray-600 transition-all duration-200 hover:border-gray-300 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!roomName.trim()}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-2.5 font-semibold text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <FaPlus className="w-4 h-4" />
              Create Room
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}