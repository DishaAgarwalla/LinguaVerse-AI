import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";

import type { ChatMessage, ChatRoom } from "../../types/chat";

import ChatSidebar from "../../components/chat/ChatSidebar";
import ChatHeader from "../../components/chat/ChatHeader";
import ChatWindow from "../../components/chat/ChatWindow";
import ChatInput from "../../components/chat/ChatInput";
import EmptyChat from "../../components/chat/EmptyChat";
import CreateRoomButton from "../../components/chat/CreateRoomButton";
import CreateRoomModal from "../../components/chat/CreateRoomModal";
import TypingIndicator from "../../components/chat/TypingIndicator";
import LanguageSelector from "../../components/chat/LanguageSelector";

import {
  createRoom,
  getRooms,
  getMessages,
  sendMessage,
} from "../../services/chatService";

import useSocket from "../../hooks/useSocket";

export default function Chat() {
  const token = localStorage.getItem("token") || "";
  const currentUserId = localStorage.getItem("userId") || "";
  const currentUsername =
    localStorage.getItem("name") || "User";

  const socket = useSocket();

  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  const [selectedRoom, setSelectedRoom] =
    useState<ChatRoom | null>(null);

  const [messages, setMessages] = useState<
    ChatMessage[]
  >([]);

  const [loadingRooms, setLoadingRooms] =
    useState(true);

  const [loadingMessages, setLoadingMessages] =
    useState(false);

  const [sending, setSending] = useState(false);

  const [showModal, setShowModal] =
    useState(false);

  const [typingUser, setTypingUser] =
    useState("");

  const [onlineUsers, setOnlineUsers] =
    useState<string[]>([]);

  const [sourceLanguage, setSourceLanguage] =
    useState("auto");

  const [targetLanguage, setTargetLanguage] =
    useState("en");

  useEffect(() => {
    loadRooms();
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.emit("user-online", {
      userId: currentUserId,
      username: currentUsername,
    });
  }, [socket]);

  const loadRooms = async () => {
    try {
      setLoadingRooms(true);

      const data = await getRooms(token);

      setRooms(data);

      if (data.length > 0) {
        setSelectedRoom(data[0]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingRooms(false);
    }
  };

  const loadMessages = async (
    roomId: string
  ) => {
    try {
      setLoadingMessages(true);

      const data = await getMessages(
        roomId,
        token
      );

      setMessages(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingMessages(false);
    }
  };

  const handleCreateRoom = async (
    roomName: string
  ) => {
    try {
      const room = await createRoom(
        roomName,
        token
      );

      setRooms((prev) => [room, ...prev]);

      setSelectedRoom(room);

      setShowModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!selectedRoom || !socket) return;

    loadMessages(selectedRoom.id);

    socket.emit("join-room", selectedRoom.id);

    return () => {
      socket.emit(
        "leave-room",
        selectedRoom.id
      );
    };
  }, [selectedRoom, socket]);

  useEffect(() => {
    if (!socket) return;

    const receiveMessage = (
      message: ChatMessage
    ) => {
      setMessages((prev) => [...prev, message]);
    };

    const receiveTyping = ({
      username,
    }: {
      username: string;
    }) => {
      setTypingUser(username);

      setTimeout(() => {
        setTypingUser("");
      }, 1500);
    };

    const receiveOnlineUsers = (
      users: string[]
    ) => {
      setOnlineUsers(users);
    };

    socket.on(
      "receive-message",
      receiveMessage
    );

    socket.on("typing", receiveTyping);

    socket.on(
      "online-users",
      receiveOnlineUsers
    );

    socket.on("stop-typing", () =>
      setTypingUser("")
    );

    return () => {
      socket.off(
        "receive-message",
        receiveMessage
      );

      socket.off("typing", receiveTyping);

      socket.off("stop-typing");

      socket.off(
        "online-users",
        receiveOnlineUsers
      );
    };
  }, [socket]);

  const handleSend = async (
    message: string,
    grammar: boolean,
    tone: "normal" | "formal" | "casual"
  ) => {
    if (!selectedRoom) return;

    try {
      setSending(true);

      await sendMessage(
        {
          roomId: selectedRoom.id,
          message,
          sourceLang: sourceLanguage,
          targetLang: targetLanguage,
          grammar,
          tone,
        },
        token
      );
    } catch (error) {
      console.error(error);
    } finally {
      setSending(false);
    }
  };
  return (
  <div className="flex h-[calc(100vh-5rem)] overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl dark:border-gray-800 dark:bg-gray-900">

    {/* Sidebar */}
    <ChatSidebar
      rooms={rooms}
      selectedRoom={selectedRoom?.id || ""}
      onSelectRoom={setSelectedRoom}
    />

    {/* Main Chat Area */}
    <div className="flex flex-1 flex-col">

      {/* Header */}
      <ChatHeader
        roomName={
          selectedRoom?.name ||
          "AI Multilingual Chat"
        }
        onlineCount={onlineUsers.length}
      />

      {/* Language Selection */}
      <div className="border-b border-gray-200 bg-gray-50 px-6 py-4 dark:border-gray-800 dark:bg-gray-900">

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          <LanguageSelector
            sourceLanguage={sourceLanguage}
            targetLanguage={targetLanguage}
            onSourceChange={setSourceLanguage}
            onTargetChange={setTargetLanguage}
          />

          <div className="rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-lg">
            🌍 AI Translation Enabled
          </div>

        </div>

      </div>

      {/* Create Room */}
      <div className="border-b border-gray-200 bg-white px-6 py-4 dark:border-gray-800 dark:bg-gray-900">

        <div className="flex justify-end">
          <CreateRoomButton
            onClick={() => setShowModal(true)}
          />
        </div>

      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">

        {loadingRooms ? (
          <div className="flex h-full items-center justify-center">

            <div className="text-center">

              <FaSpinner className="mx-auto h-8 w-8 animate-spin text-blue-600" />

              <p className="mt-4 text-gray-500 dark:text-gray-400">
                Loading chat rooms...
              </p>

            </div>

          </div>
        ) : !selectedRoom ? (
          <EmptyChat />
        ) : loadingMessages ? (
          <div className="flex h-full items-center justify-center">

            <div className="text-center">

              <FaSpinner className="mx-auto h-8 w-8 animate-spin text-indigo-600" />

              <p className="mt-4 text-gray-500 dark:text-gray-400">
                Loading messages...
              </p>

            </div>

          </div>
        ) : (
          <div className="flex h-full flex-col">

            <ChatWindow
              messages={messages}
              currentUserId={currentUserId}
            />

            <TypingIndicator
              username={typingUser}
            />

            <div className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">

              <ChatInput
                onSend={handleSend}
                sending={sending}
                socket={socket}
                roomId={selectedRoom.id}
                username={currentUsername}
              />

            </div>

          </div>
        )}

      </div>

    </div>

    {/* Create Room Modal */}
    <CreateRoomModal
      open={showModal}
      onClose={() => setShowModal(false)}
      onCreate={handleCreateRoom}
    />

  </div>
);
}