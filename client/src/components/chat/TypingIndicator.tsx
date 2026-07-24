import { FaEllipsisH } from "react-icons/fa";

interface TypingIndicatorProps {
  username?: string;
}

const TypingIndicator = ({ username }: TypingIndicatorProps) => {
  if (!username) return null;

  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-50 to-blue-50/30 border-t border-gray-100">
      <div className="flex gap-1">
        <span className="h-2 w-2 rounded-full bg-blue-500 animate-bounce"></span>
        <span
          className="h-2 w-2 rounded-full bg-blue-500 animate-bounce"
          style={{ animationDelay: "0.2s" }}
        ></span>
        <span
          className="h-2 w-2 rounded-full bg-blue-500 animate-bounce"
          style={{ animationDelay: "0.4s" }}
        ></span>
      </div>
      <span className="text-sm text-gray-600 font-medium">
        {username} is typing...
      </span>
    </div>
  );
};

export default TypingIndicator;