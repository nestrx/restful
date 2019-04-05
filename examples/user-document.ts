import { Document } from "mongoose";

export interface UserDocument extends Document {
  id: string;
  role: "admin" | "user"
  name?: string;
  username: string;
  password?: string;
  createdAt: Date,
  updatedAt: Date,

  compare(password: string): boolean;
}
