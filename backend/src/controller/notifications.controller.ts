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

//
export const deleteNotification = async (req: Request, res: Response) => {
  const notificationId = req.params.id;

  try {
    const notification = await Notification.findById(notificationId);

    if (!notification) {
      res.status(404).json({
        message: "پست یافت نشد",
      });
      return;
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

//
export const updateNotification = async (req: Request, res: Response) => {
  const notificationId = req.params.id;
  if (typeof req.body.price !== "number") {
    res.status(400).json({
      message: "قیمت باید شماره باشد",
    });
    return;
  }
  if (!notificationId) {
    res.status(404).json({
      message: "ایدی اعلان یافت نشد",
    });
    return;
  }
  const notification = await Notification.findById(notificationId);

  try {
    if (!notification) {
      res.status(404).json({
        message: "اعلانی یافت نشد",
      });
      return;
    }
    Object.assign(notification, req.body);
    await notification?.save();
    res.status(200).json({
      message: "پست اپدیت شد",
      notification,
    });
  } catch (error) {
    console.log("Error updating the post const updateNotification: ", error);
    res.status(500).json({
      message: "مشکلی پیش آمد",
    });
  }
};

export const search = async (req: Request, res: Response) => {
  const query = req.query.query as string | undefined;

  if (!query) {
    res.status(400).json({
      message: "پارامتر جستجو یافت نشد",
    });
    return;
  }

  let searchTerm = query;

  switch (true) {
    case ["موبایل", "مبایل", "گوشی", "تلیفون", "تیلیفون"].includes(searchTerm):
      searchTerm = "موبایل";
      break;

    case [
      "لب تاپ",
      "لپ تاپ",
      "کامپیوتر",
      "کمپیوتر",
      "لبتاپ",
      "لپتاپ",
      "لب تاب",
    ].includes(searchTerm):
      searchTerm = "لب تاپ";
      break;

    case ["دکان", "دیکون"].includes(searchTerm):
      searchTerm = "دکان";
      break;

    case ["خونه", "خانه"].includes(searchTerm):
      searchTerm = "خانه";
      break;

    case [
      "سکیل",
      "موترسایکل",
      "موتور سکیل",
      "موتورسکیل",
      "موتور سیکلت",
      "موتور",
    ].includes(searchTerm):
      searchTerm = "موتور";
      break;
  }

  try {
    const regex = new RegExp(searchTerm, "i");
    const result = await Notification.find({
      $or: [
        { title: { $regex: regex } },
        { description: { $regex: regex } },
        { location: { $regex: regex } },
        { category: { $regex: regex } },
        { subCategory: { $regex: regex } },
      ],
    });

    res.status(200).json(result);
  } catch (error) {
    console.log("Best regards from search", error);

    res.status(500).json({
      message: "مشکلی پیش آمد",
    });
  }
};
