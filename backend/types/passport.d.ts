import { IUserDocument } from "../models/user_model";

declare global {
  namespace Express {
    interface User extends IUserDocument {}
  }
}

export {};
