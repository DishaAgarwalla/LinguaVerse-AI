import { useState, useEffect } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  onCreate: (roomName: string) => void;
}

export default function CreateRoomModal({
  open,
  onClose,
  onCreate,
}: Props) {
  const [roomName, setRoomName] = useState("");

  useEffect(() => {
    if (!open) {
      setRoomName("");
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <div className="w-[420px] rounded-xl bg-white p-6 shadow-2xl">

        <h2 className="text-2xl font-bold mb-2">
          Create Chat Room
        </h2>

        <p className="text-gray-500 mb-5">
          Give your multilingual room a name.
        </p>

        <input
          autoFocus
          type="text"
          placeholder="Example: Team Discussion"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          className="
          w-full
          rounded-lg
          border
          p-3
          outline-none
          focus:border-blue-600
          "
        />

        <div className="mt-6 flex justify-end gap-3">

          <button
            onClick={onClose}
            className="rounded-lg border px-5 py-2 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            disabled={!roomName.trim()}
            onClick={() => {
              onCreate(roomName.trim());
            }}
            className="
            rounded-lg
            bg-blue-600
            px-5
            py-2
            text-white
            hover:bg-blue-700
            disabled:opacity-50
            "
          >
            Create
          </button>

        </div>

      </div>

    </div>
  );
}