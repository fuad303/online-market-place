import mongoose, { Model, Document } from "mongoose";

export interface NotificationInterface {
  title: string;
  category: string;
  subCategory?: string;
  description: string;
  price: number;
  location: string;
  images: string[];
  seller: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

export type NotificationDocument = Document & NotificationInterface;

const notificationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    category: { type: String, required: true }, //"Phone", "Laptop", "car", "house"...
    subCategory: { type: String, default: undefined }, //Sell, Rent... for house and shop
    price: { type: Number, required: true },
    location: { type: String, required: true },
    images: [{ type: String, require: true }],
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Notification: Model<NotificationDocument> =
  mongoose.model<NotificationDocument>("Notification", notificationSchema);

export default Notification;
