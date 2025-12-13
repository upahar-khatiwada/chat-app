import { type Request, type Response } from "express";
import type { Types } from "mongoose";
import { Message } from "../models/message_model";

export const getMessages = (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const { otherUserId } = req.params;

    if (!otherUserId) {
      return res
        .status(400)
        .json({ success: false, message: "otherUserId is required" });
    }

    const myId: Types.ObjectId = req.user?._id;

    const messages = Message.find({
      $or: [
        { senderId: myId, receiverId: otherUserId },
        { senderId: otherUserId, receiverId: myId },
      ],
    });

    res.status(200).json(messages);
  } catch (err) {
    console.log("Error in getMessages: ", err);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
