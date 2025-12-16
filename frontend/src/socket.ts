import { io, type Socket } from "socket.io-client";
import { baseUrl } from "./config/baseurl";

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
