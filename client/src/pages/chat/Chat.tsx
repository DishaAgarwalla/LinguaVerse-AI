import { useEffect, useState } from "react";

import type {
  ChatMessage,
  ChatRoom,
} from "../../types/chat";

import ChatSidebar from "../../components/chat/ChatSidebar";
import ChatHeader from "../../components/chat/ChatHeader";
import ChatWindow from "../../components/chat/ChatWindow";
import MessageInput from "../../components/chat/MessageInput";
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

  const currentUserId =
    localStorage.getItem("userId") || "";

  const currentUsername =
    localStorage.getItem("name") || "User";

  const socket = useSocket();

  const [rooms, setRooms] =
    useState<ChatRoom[]>([]);

  const [selectedRoom, setSelectedRoom] =
    useState<ChatRoom | null>(null);

  const [messages, setMessages] =
    useState<ChatMessage[]>([]);

  const [loadingRooms, setLoadingRooms] =
    useState(true);

  const [loadingMessages, setLoadingMessages] =
    useState(false);

  const [sending, setSending] =
    useState(false);

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

      setRooms((prev) => [
        room,
        ...prev,
      ]);

      setSelectedRoom(room);

      setShowModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!selectedRoom || !socket) return;

    loadMessages(selectedRoom.id);

    socket.emit(
      "join-room",
      selectedRoom.id
    );

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
      setMessages((prev) => [
        ...prev,
        message,
      ]);
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

    socket.on(
      "typing",
      receiveTyping
    );

    socket.on(
      "online-users",
      receiveOnlineUsers
    );

    socket.on(
      "stop-typing",
      () => {
        setTypingUser("");
      }
    );

    return () => {
      socket.off(
        "receive-message",
        receiveMessage
      );

      socket.off(
        "typing",
        receiveTyping
      );

      socket.off(
        "stop-typing"
      );

      socket.off(
        "online-users",
        receiveOnlineUsers
      );
    };
  }, [socket]);

  const handleSend = async (
    message: string,
    grammar: boolean,
    tone:
      | "normal"
      | "formal"
      | "casual"
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
    <div className="flex h-full">

      <ChatSidebar
        rooms={rooms}
        selectedRoom={selectedRoom?.id || ""}
        onSelectRoom={setSelectedRoom}
      />

      <div className="flex flex-1 flex-col">

        <ChatHeader
          roomName={
            selectedRoom?.name ??
            "AI Multilingual Chat"
          }
        />

        {/* Language Selection */}

        <div className="border-b bg-white p-4">

          <div className="flex flex-wrap items-center justify-between gap-4">

            <LanguageSelector
              sourceLanguage={sourceLanguage}
              targetLanguage={targetLanguage}
              onSourceChange={setSourceLanguage}
              onTargetChange={setTargetLanguage}
            />

            <div className="rounded-lg bg-green-50 px-4 py-2 text-sm font-medium text-green-700">

              🟢 {onlineUsers.length} Online

            </div>

          </div>

        </div>

        <div className="flex justify-end border-b bg-white p-4">

          <CreateRoomButton
            onClick={() =>
              setShowModal(true)
            }
          />

        </div>

        {loadingRooms ? (

          <div className="flex flex-1 items-center justify-center">

            Loading rooms...

          </div>

        ) : !selectedRoom ? (

          <EmptyChat />

        ) : (

          <>

            {loadingMessages ? (

              <div className="flex flex-1 items-center justify-center">

                Loading messages...

              </div>

            ) : (

              <>

                <ChatWindow
                  messages={messages}
                  currentUserId={currentUserId}
                />

                <TypingIndicator
                  username={typingUser}
                />

              </>

            )}

            <MessageInput
              onSend={handleSend}
              sending={sending}
              socket={socket}
              roomId={selectedRoom.id}
              username={currentUsername}
            />

          </>

        )}

      </div>

      <CreateRoomModal
        open={showModal}
        onClose={() =>
          setShowModal(false)
        }
        onCreate={handleCreateRoom}
      />

    </div>
  );
}