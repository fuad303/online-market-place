import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

declare module "express-serve-static-core" {
  interface Request {
    userId?: any;
  }
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.access_token;

  if (!token) {
    res.status(400).json({
      message: "Unauthorized ",
    });
    return;
  }
  const decoded = jwt.verify(
    token,
    process.env.ACCESS_TOKEN as string
  ) as JwtPayload;

  if (!decoded) {
    res.status(401).json({
      message: "Unauthorized",
    });
  }

  try {
    if (typeof decoded === "object" && "userId" in decoded) {
      req.userId = decoded.userId;
    }
    next();
  } catch (error) {
    res.status(403).json({
      message: "Invalid token",
    });
    return;
  }
};

export default verifyToken;
