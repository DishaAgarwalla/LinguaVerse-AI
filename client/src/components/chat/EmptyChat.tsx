export default function EmptyChat() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center text-center">
      <h2 className="text-3xl font-bold text-gray-700">
        Welcome to LinguaVerse Chat
      </h2>

      <p className="mt-4 text-gray-500">
        Select a room from the sidebar or create a new one.
      </p>
    </div>
  );
}