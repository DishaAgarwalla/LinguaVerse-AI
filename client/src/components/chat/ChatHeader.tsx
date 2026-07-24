import { FaUsers, FaGlobe } from "react-icons/fa";

interface Props {
  roomName: string;
  onlineCount?: number;
}

export default function ChatHeader({ roomName, onlineCount = 0 }: Props) {
  return (
    <div className="border-b border-gray-200/50 bg-white/95 backdrop-blur-sm p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            {roomName}
          </h2>
          <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
            <FaGlobe className="w-3 h-3" />
            Real-time multilingual chat
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-green-50 px-3 py-1.5 border border-green-200">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-sm font-medium text-green-700">
            {onlineCount} Online
          </span>
        </div>
      </div>
    </div>
  );
}