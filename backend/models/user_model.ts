import { Schema, model, Document } from "mongoose";
import { type IUser } from "../types/interface_user";

export interface IUserDocument extends IUser, Document {}

const userSchema = new Schema<IUserDocument>(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    googleId: { type: String },
    avatar: { type: String },
  },
  { timestamps: true }
);

export const User = model<IUserDocument>("User", userSchema);
