import type { Types } from "mongoose";

export interface IMessage {
  senderId: Types.ObjectId | string;
  receiverId: Types.ObjectId | string;
  text?: string;
  image?: string;
}