import { type Request, type Response } from "express";
import type { Types } from "mongoose";
import { Message } from "../models/message_model";
import { getSocketIdOfUser, io } from "../config/socket";
import cloudinary from "../config/cloudinary";

export const getMessages = async (req: Request, res: Response) => {
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

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: otherUserId },
        { senderId: otherUserId, receiverId: myId },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (err) {
    console.log("Error in getMessages: ", err);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

export const sendMessage = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const { textSent, image } = req.body;
    const { receiverId } = req.params;
    const senderId = req.user?._id;

    if (!receiverId) {
      return res
        .status(401)
        .json({ success: false, message: "Receiver Id not found." });
    }

    let imageUrl: string | undefined;
    if (image) {
      imageUrl = (await cloudinary.uploader.upload(image)).secure_url;
    }

    const message = await Message.create({
      senderId,
      receiverId: receiverId,
      text: textSent,
      image: imageUrl,
    });

    const socketIdOfReceiver = getSocketIdOfUser(receiverId);
    if (socketIdOfReceiver) {
      io.to(socketIdOfReceiver).emit("message", message);
    }

    res.status(200).json(message);
  } catch (err) {
    console.log("Error in sendMessage: ", err);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
