import { Types } from "mongoose";
import { Message } from "../models/message_model";

export const getUnSeenMessagesCounts = async (myId: string) => {
  try {
    const userObjectId = new Types.ObjectId(myId);

    const unSeenMessagesCounts = await Message.aggregate([
      {
        $match: {
          receiverId: userObjectId,
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

    return unSeenMessagesCounts;
  } catch (err) {
    console.log("Error in getUnSeenMessagesCounts: ", err);
  }
};

export const markMessagesAsSeen = async (myId: string, otherUserId: string) => {
  try {
    const userObjectId = new Types.ObjectId(myId);
    const otherUserObjectId = new Types.ObjectId(otherUserId);
    await Message.updateMany(
      {
        senderId: otherUserObjectId,
        receiverId: userObjectId,
        seen: false,
      },
      {
        $set: { seen: true },
      }
    );
  } catch (err) {
    console.log("Error in markMessagesAsSeen: ", err);
  }
};
