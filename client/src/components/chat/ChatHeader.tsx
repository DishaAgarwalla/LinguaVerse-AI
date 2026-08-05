import { FaUsers, FaGlobe } from "react-icons/fa";

interface Props {
  roomName: string;
  onlineCount?: number;
}

export default function ChatHeader({
  roomName,
  onlineCount = 0,
}: Props) {
  return (
    <header className="sticky top-0 z-20 border-b border-gray-200/60 bg-white/90 px-6 py-5 backdrop-blur-xl transition-colors duration-300 dark:border-gray-700 dark:bg-gray-900/90">
      <div className="flex items-center justify-between">
        {/* Left */}
        <div className="min-w-0">
          <h2 className="truncate bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-2xl font-bold text-transparent dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400">
            {roomName}
          </h2>

          <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <FaGlobe className="text-blue-500 dark:text-blue-400" />
              <span>Real-time multilingual chat</span>
            </div>

            <span className="hidden h-1 w-1 rounded-full bg-gray-300 sm:block dark:bg-gray-600"></span>

            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-500/20 dark:text-blue-300">
              AI Translation Enabled
            </span>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2 shadow-sm transition-colors duration-300 dark:border-green-700 dark:bg-green-500/10">
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
          </span>

          <FaUsers className="text-green-600 dark:text-green-400" />

          <span className="text-sm font-semibold text-green-700 dark:text-green-300">
            {onlineCount} Online
          </span>
        </div>
      </div>
    </header>
  );
}