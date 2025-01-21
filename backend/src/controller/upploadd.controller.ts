import { Request, Response } from "express";
import path from "path";
import fs from "fs";
import multer from "multer";
import Notification from "../model/Notification.model";

const rootDir = path.resolve();
const storagePath = path.join(
  rootDir,
  "src",
  "db",
  "storage",
  "uploads",
  "profile-images"
);
if (!fs.existsSync(storagePath)) {
  fs.mkdirSync(storagePath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    try {
      const user = req.detailedUser;

      if (!user) {
        cb(new Error("Detailed user not found destination func"), "");
      }

      if (user.profileImage) {
        const oldImagePath = path.join(rootDir, "src", "db", user.profileImage);
        if (fs.existsSync(oldImagePath)) {
          try {
            fs.unlinkSync(oldImagePath);
          } catch (error) {
            if (error instanceof Error) {
              console.log("Failed to remove");
            }
          }
        }
      }
      cb(null, storagePath);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error in filename function:", error.message);
      }
      cb(new Error("Internal server error"), "");
    }
  },
  filename(req, file, cb) {
    try {
      const user = req.detailedUser;

      if (!user) {
        cb(new Error("User not found     filename func"), "");
      }
      const id = user._id.toString();
      const uniquename = `${id}_${file.originalname}`;
      cb(null, uniquename);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error in filename function:", error.message);
      }
      cb(new Error("Internal server error"), "");
    }
  },
});
const uploadProfile = multer({ storage });
export const profileUploadMiddleware = uploadProfile.single("profileImage");

export const profileImage = async (req: Request, res: Response) => {
  try {
    const user = req.detailedUser;

    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
    }
    const filePath = `uploads/profile-images/${req.file?.filename}`;

    user.profileImage = filePath;
    await user.save();
    const profile = user.profileImage;

    res.status(200).json({
      profile: profile,
    });
  } catch (error: any) {
    console.log("Error in saving the image", error.message);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const newNotification = async (req: Request, res: Response) => {
  try {
    const notification = await Notification.create(req.body);
    console.log(notification);

    res.status(201).json(notification);
  } catch (error) {
    console.log("Error making notification");
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
