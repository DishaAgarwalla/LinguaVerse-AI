import { FaComments, FaPlus } from "react-icons/fa";

export default function EmptyChat() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center text-center p-8">
      <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 mb-6">
        <FaComments className="w-12 h-12 text-blue-500" />
      </div>
      <h2 className="text-3xl font-bold text-gray-800">
        Welcome to LinguaVerse Chat
      </h2>
      <p className="mt-3 text-gray-500 max-w-sm">
        Select a room from the sidebar or create a new one to start chatting.
      </p>
      <div className="mt-6 flex items-center gap-2 text-sm text-gray-400">
        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
        <span>Real-time translation</span>
        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
        <span>AI-powered</span>
        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
        <span>100+ languages</span>
      </div>
    </div>
  );
}