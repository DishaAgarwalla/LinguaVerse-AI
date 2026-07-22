import { Server, Socket } from "socket.io";

interface OnlineUser {
  socketId: string;
  username: string;
}

const onlineUsers = new Map<string, OnlineUser>();

export default function registerChatSocket(io: Server) {
  io.on("connection", (socket: Socket) => {
    console.log("🟢 User Connected:", socket.id);

    /* ============================
       USER ONLINE
    ============================ */

    socket.on(
      "user-online",
      ({
        userId,
        username,
      }: {
        userId: string;
        username: string;
      }) => {
        onlineUsers.set(userId, {
          socketId: socket.id,
          username,
        });

        io.emit(
          "online-users",
          Array.from(onlineUsers.keys())
        );

        console.log(`${username} is online`);
      }
    );

    /* ============================
       JOIN ROOM
    ============================ */

    socket.on("join-room", (roomId: string) => {
      socket.join(roomId);

      console.log(
        `${socket.id} joined room ${roomId}`
      );
    });

    /* ============================
       LEAVE ROOM
    ============================ */

    socket.on("leave-room", (roomId: string) => {
      socket.leave(roomId);

      console.log(
        `${socket.id} left room ${roomId}`
      );
    });

    /* ============================
       TYPING INDICATOR
    ============================ */

    socket.on(
      "typing",
      ({
        roomId,
        username,
      }: {
        roomId: string;
        username: string;
      }) => {
        socket.to(roomId).emit("typing", {
          username,
        });
      }
    );

    socket.on(
      "stop-typing",
      (roomId: string) => {
        socket
          .to(roomId)
          .emit("stop-typing");
      }
    );

    /* ============================
       LIVE MESSAGE
    ============================ */

    socket.on("send-message", (message) => {
      io.to(message.roomId).emit(
        "receive-message",
        message
      );
    });

    /* ============================
       DISCONNECT
    ============================ */

    socket.on("disconnect", () => {
      for (const [
        userId,
        user,
      ] of onlineUsers.entries()) {
        if (user.socketId === socket.id) {
          console.log(
            `${user.username} disconnected`
          );

          onlineUsers.delete(userId);

          break;
        }
      }

      io.emit(
        "online-users",
        Array.from(onlineUsers.keys())
      );

      console.log(
        "🔴 User Disconnected:",
        socket.id
      );
    });
  });
}