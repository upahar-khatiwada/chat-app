import { type Request, type Response } from "express";
import type { Types, QueryFilter } from "mongoose";
import { User, type IUserDocument } from "../models/user_model";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const loggedInUserId: Types.ObjectId | undefined = req.user._id;
    const { search } = req.query;

    let filter: QueryFilter<IUserDocument> = { _id: { $ne: loggedInUserId } };

    if (search && typeof search === "string") {
      filter.fullName = { $regex: search, $options: "i" };
    }

    const otherUsers = await User.find(filter, "fullName email _id avatar").limit(20);

    res.status(200).json(otherUsers);
  } catch (err) {
    console.error("Error in getAllUsers: ", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
