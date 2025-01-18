import { Request, Response, NextFunction } from "express";
import User from "../model/User";

declare module "express-serve-static-core" {
  interface Request {
    detailedUser?: any;
  }
}
export const userDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
      return;
    }
    req.detailedUser = user;
    next();
  } catch (error) {
    if (error instanceof Error) {
      console.log(" from userDetails.middleware: ", error.message);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }
};
