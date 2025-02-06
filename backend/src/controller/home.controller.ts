import { Request, Response } from "express";
import Notification from "../model/Notification.model";
import User from "../model/User";
//
export const feedmeed = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 15;
  const skip = (page - 1) * limit;

  try {
    const feed = await Notification.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    if (feed.length === 0) {
      res.status(200).json({
        feed: [],
        message: "دیگر پستی وجود ندارد",
      });
      return;
    }
    if (!feed) {
      res.status(404).json({
        message: "اعلانی یافت نشد",
      });
      return;
    }

    const modifiedFeed = feed.map((notification) => ({
      ...notification,
      images: notification.images.length > 0 ? [notification.images[0]] : [],
    }));

    res.status(200).json(modifiedFeed);
  } catch (error) {
    console.log("Best regards feedmeed", error);

    res.status(500).json({
      message: "مشکلی پیش امد",
    });
  }
};

//
export const getAPost = async (req: Request, res: Response) => {
  try {
    const aPost = await Notification.findById(req.params.id);

    if (!aPost) {
      res.status(404).json({ message: "پست یافت نشد" });
      return;
    }
    const seller = aPost.seller.toString();

    const userPosts = await Notification.find({ seller: seller }).lean();

    const modifiedUserPosts = userPosts.map((notification) => ({
      ...notification,
      images: notification.images.length > 0 ? [notification.images[0]] : [],
    }));

    res.status(200).json({
      aPost: aPost,
      userPosts: modifiedUserPosts,
    });
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
