import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";

import {
  connectSocket,
  disconnectSocket,
} from "../services/socketService";

export default function useSocket() {
  const [socket, setSocket] =
    useState<Socket | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    const connectedSocket =
      connectSocket(token);

    connectedSocket.on("connect", () => {
      console.log(
        "🟢 Socket Connected:",
        connectedSocket.id
      );
    });

    connectedSocket.on("disconnect", () => {
      console.log("🔴 Socket Disconnected");
    });

    connectedSocket.on(
      "connect_error",
      (error) => {
        console.error(
          "Socket Error:",
          error.message
        );
      }
    );

    setSocket(connectedSocket);

    return () => {
      connectedSocket.off("connect");
      connectedSocket.off("disconnect");
      connectedSocket.off("connect_error");

      disconnectSocket();
    };
  }, []);

  return socket;
}