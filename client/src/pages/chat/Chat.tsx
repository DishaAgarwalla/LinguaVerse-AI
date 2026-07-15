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

  useEffect(() => {
    loadRooms();
  }, []);

  const loadRooms = async () => {
    try {
      setLoadingRooms(true);

      const data = await getRooms(token);

      setRooms(data);

      if (data.length > 0) {
        setSelectedRoom(data[0]);
      }
    } catch (err) {
      console.error(err);
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
    } catch (err) {
      console.error(err);
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
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!selectedRoom) return;

    loadMessages(selectedRoom.id);

    socket?.emit(
      "join-room",
      selectedRoom.id
    );

    return () => {
      socket?.emit(
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

    socket.on(
      "receive-message",
      receiveMessage
    );

    return () => {
      socket.off(
        "receive-message",
        receiveMessage
      );
    };
  }, [socket]);

  const handleSend = async (
    message: string,
    sourceLang: string,
    targetLang: string,
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
          sourceLang,
          targetLang,
          grammar,
          tone,
        },
        token
      );
    } catch (err) {
      console.error(err);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex h-full">
      <ChatSidebar
        rooms={rooms}
        selectedRoom={
          selectedRoom?.id || ""
        }
        onSelectRoom={setSelectedRoom}
      />

      <div className="flex flex-1 flex-col">
        <ChatHeader
          roomName={
            selectedRoom?.name ??
            "AI Multilingual Chat"
          }
        />

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
              <ChatWindow
                messages={messages}
                currentUserId={
                  currentUserId
                }
              />
            )}

            <MessageInput
              onSend={handleSend}
              sending={sending}
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