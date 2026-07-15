interface TypingIndicatorProps {
  username?: string;
}

const TypingIndicator = ({
  username,
}: TypingIndicatorProps) => {
  if (!username) return null;

  return (
    <div className="flex items-center gap-2 px-4 py-2 text-sm text-gray-500">
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

      <span>{username} is typing...</span>
    </div>
  );
};

export default TypingIndicator;