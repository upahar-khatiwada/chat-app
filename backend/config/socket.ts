import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const onlineUsers = new Map<string, string>();

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:4000"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  const userId: string = socket.handshake.auth.userId;

  if (!userId) {
    console.error("No User ID available");
    socket.disconnect();
    return;
  }

  onlineUsers.set(userId, socket.id);

  console.log("All online users right now: ", onlineUsers);

  io.emit("allOnlineUsers", Array.from(onlineUsers.keys()));

  socket.on("disconnect", () => {
    onlineUsers.delete(userId);
    console.log("user disconnected", socket.id);

    console.log("User offline:", userId);

    io.emit("allOnlineUsers", [...onlineUsers.keys()]);
  });
});

export const getSocketIdOfUser = (userId: string): string | undefined => {
  return onlineUsers.get(userId);
};

export { io, app, server };
