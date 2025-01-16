import jwt from "jsonwebtoken";
import { Response } from "express";

const CookieAndJwt = async (
  userId: string,
  res: Response
): Promise<string | null> => {
  try {
    const token = await jwt.sign(
      { userId },
      process.env.ACCESS_TOKEN as string
    );

    res.cookie("access_token", token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      sameSite: "strict",
    });
    return token;
  } catch (error) {
    if (error instanceof Error) {
      console.log("Failed to generate the token", error.message);
    } else {
      console.error("Failed to generate the token", error);
    }
    return null;
  }
};

export default CookieAndJwt;
