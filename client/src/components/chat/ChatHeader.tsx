interface Props {
  roomName: string;
}

export default function ChatHeader({
  roomName,
}: Props) {
  return (
    <div className="border-b bg-white p-5 shadow-sm">
      <h2 className="text-2xl font-semibold">
        {roomName}
      </h2>

      <p className="text-sm text-gray-500">
        Real-time multilingual chat
      </p>
    </div>
  );
}