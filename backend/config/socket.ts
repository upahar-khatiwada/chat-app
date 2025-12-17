import { Server } from "socket.io";
import http from "http";
import express from "express";
import { Message } from "../models/message_model";
import {
  getUnSeenMessagesCounts,
  markMessagesAsSeen,
} from "../utils/socket_messages_utils";

const app = express();
const server = http.createServer(app);

const onlineUsers = new Map<string, string>();

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:4000", "https://chat-app-xkgk.onrender.com"],
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

  // console.log("All online users right now: ", onlineUsers);

  io.emit("allOnlineUsers", Array.from(onlineUsers.keys()));

  socket.on("typing", (userTypingTo: string) => {
    const receiverSocketId = onlineUsers.get(userTypingTo);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("typing", userId);
    }
  });

  socket.on("stopTyping", (userTypingTo: string) => {
    const receiverSocketId = onlineUsers.get(userTypingTo);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("stopTyping", userId);
    }
  });

  socket.on("get-unseen-counts", async () => {
    const counts = await getUnSeenMessagesCounts(userId);

    if (!counts) {
      return;
    }

    const countsMap: Record<string, number> = {};
    counts.forEach((item) => {
      countsMap[item._id.toString()] = item.count;
    });

    socket.emit("unseen-counts", countsMap);
  });

  socket.on("seen", async (myId: string, userChattingToId: string) => {
    await markMessagesAsSeen(myId, userChattingToId);
    const receiverSocketId = onlineUsers.get(userChattingToId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("seen", myId, userChattingToId);
    }
  });

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
