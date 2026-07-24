import ChatMessages from "./ChatMessages";
import type { ChatMessage } from "../../types/chat";

interface Props {
  messages: ChatMessage[];
  currentUserId: string;
}

export default function ChatWindow({ messages, currentUserId }: Props) {
  return (
    <div className="flex flex-1 flex-col">
      <ChatMessages messages={messages} currentUserId={currentUserId} />
    </div>
  );
}