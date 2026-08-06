interface TypingIndicatorProps {
  username?: string;
}

const TypingIndicator = ({ username }: TypingIndicatorProps) => {
  if (!username) return null;

  return (
    <div className="border-t border-gray-100 bg-gradient-to-r from-gray-50 to-blue-50/30 px-4 py-3 transition-colors duration-300 dark:border-slate-700 dark:from-slate-900 dark:to-slate-800">

      <div className="flex items-center gap-3">

        <div className="flex gap-1">
          <span className="h-2 w-2 animate-bounce rounded-full bg-blue-500"></span>

          <span
            className="h-2 w-2 animate-bounce rounded-full bg-blue-500"
            style={{ animationDelay: "0.2s" }}
          ></span>

          <span
            className="h-2 w-2 animate-bounce rounded-full bg-blue-500"
            style={{ animationDelay: "0.4s" }}
          ></span>
        </div>

        <span className="text-sm font-medium text-gray-600 transition-colors duration-300 dark:text-slate-300">
          {username} is typing...
        </span>

      </div>

    </div>
  );
};

export default TypingIndicator;