import { Server, Socket } from "socket.io";

export default function registerChatSocket(io: Server) {
  io.on("connection", (socket: Socket) => {
    console.log("🟢 User Connected:", socket.id);

    // Join room
    socket.on("join-room", (roomId: string) => {
      socket.join(roomId);
      console.log(`${socket.id} joined ${roomId}`);
    });

    // Leave room
    socket.on("leave-room", (roomId: string) => {
      socket.leave(roomId);
      console.log(`${socket.id} left ${roomId}`);
    });

    // Typing Indicator
    socket.on(
      "typing",
      ({
        roomId,
        username,
      }: {
        roomId: string;
        username: string;
      }) => {
        socket.to(roomId).emit("typing", username);
      }
    );

    socket.on("stop-typing", (roomId: string) => {
      socket.to(roomId).emit("stop-typing");
    });

    // Live Message Broadcast
    socket.on("send-message", (message) => {
      io.to(message.roomId).emit(
        "receive-message",
        message
      );
    });

    socket.on("disconnect", () => {
      console.log("🔴 User Disconnected:", socket.id);
    });
  });
}