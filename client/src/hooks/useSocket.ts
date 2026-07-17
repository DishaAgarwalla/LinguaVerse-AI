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

    const s = connectSocket(token);

    setSocket(s);

    return () => {
      disconnectSocket();
    };
  }, []);

  return socket;
}