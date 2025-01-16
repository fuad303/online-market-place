import { Request, Response } from "express";
import path from "path";
import fs from "fs";
import multer from "multer";
import User from "../model/User";
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
    cb(null, storagePath);
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  },
});

const uploadProfile = multer({ storage });

export const profileUploadMiddleware = uploadProfile.single("profileImage");

export const profileImage = async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    res.status(400).json({
      message: "Email is required",
    });
    return;
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
      return;
    }
    if (user.profileImage) {
      const oldImagePath = path.join(rootDir, "src", "db", user.profileImage);

      if (fs.existsSync(oldImagePath)) {
        try {
          await fs.promises.unlink(oldImagePath); // Use Promise-based unlink
          console.log("Old photo removed successfully");
        } catch (err) {
          console.error("Failed to remove the old photo:");
        }
      }
    }
    const filePath = `uploads/profile-images/${req.file?.filename}`;
    user.profileImage = filePath;
    await user.save();

    const toSenduser = await User.findOne({ email }).select("profileImage");
    res.status(200).json({ user: toSenduser });
  } catch (error: any) {
    console.log("Error in saving the image", error.message);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
