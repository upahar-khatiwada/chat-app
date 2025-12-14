import { io, type Socket } from "socket.io-client";

let socket: Socket | null = null;

export const connectSocket = (userId: string) => {
  if (!socket) {
    socket = io(import.meta.env.VITE_BASE_URL, {
      auth: {
        userId,
      },
    });
  }
  return socket;
};

export const getSocket = (): Socket | null => socket;
