import { type Request, type Response } from "express";
import type { Types } from "mongoose";
import { User } from "../models/user_model";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const loggedInUserId: Types.ObjectId | undefined = req.user._id;
    const otherUsers = await User.find({ _id: { $ne: loggedInUserId } });

    res.status(200).json(otherUsers);
  } catch (err) {
    console.error("Error in getAllUsers: ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
