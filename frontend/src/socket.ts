import { io, type Socket } from "socket.io-client";

const baseUrl =
  import.meta.env.VITE_NODE_ENV === "development"
    ? "http://localhost:3000"
    : "/";

let socket: Socket | null = null;

export const connectSocket = (userId: string) => {
  if (!socket) {
    socket = io(baseUrl, {
      auth: {
        userId,
      },
    });
  }
  return socket;
};

export const getSocket = (): Socket | null => socket;
