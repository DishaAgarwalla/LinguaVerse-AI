import { Server, Socket } from "socket.io";

let io: Server;

export const initializeSocket = (server: any) => {
  io = new Server(server, {
    cors: {
      origin: [
        "http://localhost:5173",
        "http://localhost:5174",
      ],
      credentials: true,
    },
  });

  io.on("connection", (socket: Socket) => {
    console.log(`🟢 User Connected: ${socket.id}`);

    socket.on("join-room", (roomId: string) => {
      socket.join(roomId);

      console.log(`${socket.id} joined ${roomId}`);
    });

    socket.on("leave-room", (roomId: string) => {
      socket.leave(roomId);
    });

    socket.on("typing", (roomId: string) => {
      socket.to(roomId).emit("typing");
    });

    socket.on("stop-typing", (roomId: string) => {
      socket.to(roomId).emit("stop-typing");
    });

    socket.on("disconnect", () => {
      console.log(`🔴 User Disconnected: ${socket.id}`);
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.IO not initialized.");
  }

  return io;
};