import { Request, Response } from "express";
import path from "path";
import fs from "fs";
import multer from "multer";
import Notification from "../model/Notification.model";

const rootDir = path.resolve();

//profile Image

const storagePathProfileImage = path.join(
  rootDir,
  "src",
  "db",
  "storage",
  "uploads",
  "profile-images"
);
if (!fs.existsSync(storagePathProfileImage)) {
  fs.mkdirSync(storagePathProfileImage, { recursive: true });
}

const profileImageStorage = multer.diskStorage({
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
      cb(null, storagePathProfileImage);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error in filename function:", error.message);
      }
      cb(new Error("Internal server error"), "");
    }
  },
  filename(req, file, cb) {
    try {
      const id = req.userId.toString();
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
const uploadProfile = multer({ storage: profileImageStorage });
export const profileUploadMiddleware = uploadProfile.single("profileImage");

export const profileImage = async (req: Request, res: Response) => {
  console.log("The user from imageupload", req.detailedUser);

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

//New Notification handler

const notificationStoragePath = path.join(
  rootDir,
  "src",
  "db",
  "storage",
  "uploads",
  "notifications"
);

if (!fs.existsSync(notificationStoragePath)) {
  fs.mkdirSync(notificationStoragePath, { recursive: true });
}

const notificationStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("Here are the files: ", file);

    if (!file) {
      cb(new Error("No image found"), "");
    }
    try {
      cb(null, notificationStoragePath);
    } catch (error) {
      console.log("Failed in notification storage path destination", error);
    }
  },
  filename: (req, file, cb) => {
    const userId = req.userId.toString();
    if (!userId) {
      cb(
        new Error(
          "Detailed user not found in filename of the notification func"
        ),
        ""
      );
    }
    try {
      const timeStamp = Date.now();
      const uniquename = `${userId}_${timeStamp}_${file.originalname}`;
      cb(null, uniquename);
    } catch (error) {
      console.log("Failed in notification storage path filename", error);
    }
  },
});

const notificationUpload = multer({ storage: notificationStorage });
export const notificationUploadMiddleware = notificationUpload.array(
  "images",
  4
);

export const newNotification = async (req: Request, res: Response) => {
  const userId = req.userId;
  if (!userId) {
    res.status(401).json({
      message: "دوباره وارد اکانت خود بشید",
    });
    return;
  }
  try {
    const {
      title,
      description,
      category,
      subCategory,
      specificcategoryName,
      price,
      location,
    } = req.body;

    if (!title || !category || !price || !location) {
      res.status(400).json({
        message: "فرم ناتکمیل هست",
      });
      return;
    }
    const files = req.files as Express.Multer.File[];
    const imagesPaths =
      files?.map((file) => `uploads/notifications/${file.filename}`) || [];

    const newNotification = await new Notification({
      title: title,
      description: description,
      category: category,
      subCategory: subCategory,
      specificcategoryName: specificcategoryName,
      price: price,
      location: location,
      images: imagesPaths,
      seller: req.userId,
    });

    await newNotification.save();

    res.status(201).json(newNotification);
  } catch (error) {
    console.log(
      "Error making notification, best regards:const newNotification",
      error
    );
    res.status(500).json({
      message: "مشکلی پیش امد",
    });
  }
};
