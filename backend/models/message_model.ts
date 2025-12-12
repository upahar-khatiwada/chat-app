import { Schema, model, Document } from "mongoose";
import type { IMessage } from "../types/interface_message";

export interface IMessageDocument extends IMessage, Document {}

const messageSchema = new Schema<IMessageDocument>(
  {
    senderId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Message = model<IMessageDocument>("Message", messageSchema);
