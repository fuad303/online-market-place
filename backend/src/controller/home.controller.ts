import { Request, Response } from "express";
import Notification from "../model/Notification.model";
import User from "../model/User";
//
export const feedmeed = async (req: Request, res: Response) => {
  const feed = await Notification.find().sort({ createdAt: -1 });
  console.log("the Feedmeed has been hit");

  if (!feed) {
    res.status(404).json({
      message: "اعلانی یافت نشد",
    });
    return;
  }
  res.status(200).json(feed);
};

//

export const getAPost = async (req: Request, res: Response) => {
  try {
    const aPost = await Notification.findById(req.params.id);
    if (!aPost) {
      res.status(404).json({ message: "پست یافت نشد" });
      return;
    }
    res.status(200).json(aPost);
  } catch (error) {
    console.warn("Best regards from: getAPost", error);
  }
};

//
export const getUserCredentials = async (req: Request, res: Response) => {
  const userCredentials = await User.findById(req.params.seller).select(
    "username email phone -_id"
  );
  if (!userCredentials) {
    res.status(404).json({
      message: "کاربر وجود ندارد",
    });
    return;
  }

  try {
    res.status(200).json(userCredentials);
  } catch (error) {
    res.status(500).json({
      message: "مشکلی پیش امد",
    });
  }
};
