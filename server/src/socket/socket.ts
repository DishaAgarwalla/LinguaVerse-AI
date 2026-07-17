import { Server } from "socket.io";
import http from "http";

let io: Server;

export const initializeSocket = (
  server: http.Server
) => {
  io = new Server(server, {
    cors: {
      origin: [
        "http://localhost:5173",
        "http://localhost:5174",
      ],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("✅ Socket Connected:", socket.id);

    socket.on("join-room", (roomId: string) => {
      socket.join(roomId);
      console.log(`${socket.id} joined ${roomId}`);
    });

    socket.on("leave-room", (roomId: string) => {
      socket.leave(roomId);
      console.log(`${socket.id} left ${roomId}`);
    });

    socket.on(
      "typing",
      (data: {
        roomId: string;
        username: string;
      }) => {
        socket
          .to(data.roomId)
          .emit("user-typing", data);
      }
    );

    socket.on("disconnect", () => {
      console.log("❌ Socket Disconnected:", socket.id);
    });
  });

  return io;
};

/**
 * Returns the initialized Socket.IO instance
 */
export const getIO = (): Server => {
  if (!io) {
    throw new Error(
      "Socket.io has not been initialized."
    );
  }

  return io;
};