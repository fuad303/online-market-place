import { Request, Response } from "express";
import Notification from "../model/Notification.model";

export const userNotifications = async (req: Request, res: Response) => {
  if (!req.userId) {
    console.log("Id of the user not found in sendUserNotifications.get");
    return;
  }
  try {
    const userNotifications = await Notification.find({ seller: req.userId });
    console.log("Posts made with this user", userNotifications);

    if (userNotifications.length === 0) {
      res.status(404).json({
        message: "پستی یافت نشد",
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
