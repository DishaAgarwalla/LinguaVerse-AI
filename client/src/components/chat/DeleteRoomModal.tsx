import { FaTrash, FaTimes, FaExclamationTriangle } from "react-icons/fa";

interface DeleteRoomModalProps {
  open: boolean;
  roomName: string;
  onCancel: () => void;
  onDelete: () => void;
}

export default function DeleteRoomModal({
  open,
  roomName,
  onCancel,
  onDelete,
}: DeleteRoomModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fadeIn">
      <div className="w-[400px] rounded-2xl bg-white p-6 shadow-2xl border border-gray-100 animate-slideDown">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 rounded-xl bg-red-100 p-3">
            <FaExclamationTriangle className="w-6 h-6 text-red-600" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-800">Delete Room</h2>
            <p className="mt-2 text-gray-600">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-gray-800">"{roomName}"</span>?
            </p>
            <p className="mt-1 text-sm text-gray-500">
              This action cannot be undone.
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="rounded-xl border-2 border-gray-200 px-5 py-2.5 font-medium text-gray-600 transition-all duration-200 hover:border-gray-300 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onDelete}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-red-500 to-rose-600 px-6 py-2.5 font-semibold text-white shadow-lg shadow-red-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-red-500/40 hover:scale-105"
          >
            <FaTrash className="w-4 h-4" />
            Delete Room
          </button>
        </div>
      </div>
    </div>
  );
}