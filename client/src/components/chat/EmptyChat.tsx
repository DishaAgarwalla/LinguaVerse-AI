import { FaComments } from "react-icons/fa";

export default function EmptyChat() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-8 text-center transition-colors duration-300">

      <div className="mb-6 inline-flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-500/20 dark:to-indigo-500/20">
        <FaComments className="h-12 w-12 text-blue-500 dark:text-blue-400" />
      </div>

      <h2 className="text-3xl font-bold text-gray-800 transition-colors duration-300 dark:text-white">
        Welcome to LinguaVerse Chat
      </h2>

      <p className="mt-3 max-w-sm text-gray-500 transition-colors duration-300 dark:text-slate-400">
        Select a room from the sidebar or create a new one to start chatting.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-sm text-gray-400 transition-colors duration-300 dark:text-slate-500">

        <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>

        <span>Real-time Translation</span>

        <span className="h-1 w-1 rounded-full bg-gray-300 dark:bg-slate-600"></span>

        <span>AI Powered</span>

        <span className="h-1 w-1 rounded-full bg-gray-300 dark:bg-slate-600"></span>

        <span>100+ Languages</span>

      </div>

    </div>
  );
}