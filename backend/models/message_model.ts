import { Schema, model, Document, Types } from "mongoose";
import type { IMessage } from "../types/interface_message";

export interface IMessageDocument extends IMessage, Document {
  replyTo?: Types.ObjectId;
}

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
    replyTo: {
      type: Schema.Types.ObjectId,
      ref: "Message",
      default: null,
    },
    seen: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Message = model<IMessageDocument>("Message", messageSchema);
