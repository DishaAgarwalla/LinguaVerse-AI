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
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/40
      "
    >
      <div
        className="
          w-[380px]
          rounded-xl
          bg-white
          p-6
          shadow-xl
        "
      >
        <h2 className="text-xl font-bold">
          Delete Room
        </h2>

        <p className="mt-4 text-gray-600">
          Are you sure you want to delete

          <span className="font-semibold">
            {" "}
            {roomName}
          </span>
          ?
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="
              rounded-lg
              border
              px-4
              py-2
              hover:bg-gray-100
            "
          >
            Cancel
          </button>

          <button
            onClick={onDelete}
            className="
              rounded-lg
              bg-red-600
              px-4
              py-2
              text-white
              hover:bg-red-700
            "
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}