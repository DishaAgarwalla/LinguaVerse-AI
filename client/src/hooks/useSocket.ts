import { useEffect, useState } from "react";
import type { Socket } from "socket.io-client";

import {
  connectSocket,
  disconnectSocket,
} from "../services/socket";

const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    const newSocket = connectSocket(token);

    setSocket(newSocket);

    return () => {
      disconnectSocket();
    };
  }, []);

  return socket;
};

export default useSocket;