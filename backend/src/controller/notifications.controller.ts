import { Request, Response } from "express";
import Notification from "../model/Notification.model";
import fs from "fs";
import path from "path";

export const userNotifications = async (req: Request, res: Response) => {
  if (!req.userId) {
    console.log("Id of the user not found in sendUserNotifications.get");
    return;
  }
  try {
    const userNotifications = await Notification.find({ seller: req.userId });

    if (userNotifications.length === 0) {
      res.status(404).json({
        message: "اعلانی یافت نشد",
      });
      return;
    }
    res.status(200).json(userNotifications);
  } catch (error) {
    console.log(
      "Failed to fetch the user notifications from sendUserNotifications.get",
      error
    );
    res.status(500).json({
      message: "مشکلی پیش امد",
    });
  }
};

export const deleteNotification = async (req: Request, res: Response) => {
  const notificationId = req.params.id;
  try {
    const notification = await Notification.findById(notificationId);
    if (!notification) {
      res.status(404).json({
        message: "پست یافت نشد",
      });
    }

    const images = notification?.images;
    const rootDir = path.resolve(__dirname, "../db/storage");

    if (images && images.length > 0) {
      images.forEach((imagePath: string) => {
        const fullPath = path.join(rootDir, imagePath);
        if (fs.existsSync(fullPath)) {
          fs.unlinkSync(fullPath);
        } else {
          console.log(`Nothing to delete ${fullPath}`);
        }
      });
    } else {
      console.log(`Nothing to remove `);
    }

    await notification?.deleteOne();

    res.json({
      message: "اعلان حذف شد",
    });
  } catch (error) {
    console.log("Error in deleteNotification", error);
  }
};
