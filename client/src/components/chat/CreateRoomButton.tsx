import { Plus } from "lucide-react";

interface Props {
  onClick: () => void;
}

export default function CreateRoomButton({
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      className="
      flex
      items-center
      gap-2
      rounded-lg
      bg-blue-600
      px-5
      py-3
      text-white
      font-medium
      shadow
      transition
      hover:bg-blue-700
      hover:shadow-lg
      "
    >
      <Plus size={18} />

      Create Room
    </button>
  );
}