import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  _doc: any;
  _id: string;
  email: string;
  phone: number;
  password: string;
  username: string;
  profileImage?: string | null;
}

const userSchema: Schema<IUser> = new Schema(
  {
    password: { type: String, required: true },
    profileImage: { type: String, default: null },
    email: { type: String, required: true, unique: true },
    phone: { type: Number, required: true, unique: true },
    username: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<IUser>("User", userSchema);

export default User;
