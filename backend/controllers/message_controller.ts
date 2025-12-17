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

export const getUnSeenMessagesCounts = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res
        .status(401)
        .json({ success: false, message: "Couldnt find user" });
    }

    const myId = req.user._id;

    const unSeenMessagesCounts = await Message.aggregate([
      {
        $match: {
          receiverId: myId,
          seen: false,
        },
      },
      {
        $group: {
          _id: "$senderId",
          count: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json(unSeenMessagesCounts);
  } catch (err) {
    console.log("Error in getUnSeenMessagesCounts: ", err);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

export const markMessagesAsSeen = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res
        .status(401)
        .json({ success: false, message: "Couldnt find user" });
    }

    const myId = req.user._id;
    const { otherUserId } = req.params;

    await Message.updateMany(
      {
        senderId: otherUserId,
        receiverId: myId,
        seen: false,
      },
      {
        $set: { seen: true },
      }
    );

    res
      .status(200)
      .json({ success: true, message: "Updated messages as seen" });
  } catch (err) {
    console.log("Error in markMessagesAsSeen: ", err);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
