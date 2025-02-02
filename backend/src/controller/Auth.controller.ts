import argon2 from "argon2";
import User from "../model/User";
import { check, validationResult } from "express-validator";
import { Request, Response } from "express";
import CookieAndJwt from "../lib/utils/CookieAndJwt";
import { Document } from "mongoose";
import { IUser } from "../model/User";

interface SignupRequestBody {
  username: string;
  email: string;
  password: string;
  phone: number;
}

interface LoginRequestBody {
  username: string;
  password: string;
}

export const validateSignup = [
  check("username").notEmpty().withMessage("username is required"),
  check("email").isEmail().withMessage("use a valid email"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 characters")
    .matches(/[A-Z]/)
    .withMessage("Must contain an uppercase letter")
    .matches(/[0-9]/)
    .withMessage("Must contain at least one number")
    .matches(/[!@#$%^&*]/)
    .withMessage("Must have at least one symbol"),
  check("phone")
    .matches(/^7[0-9]{8}$/)
    .withMessage(
      "Phone number must start with 7 and contain 8 additional digits"
    ),
];
export const signup = async (
  req: Request<SignupRequestBody>,
  res: Response
): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      errors: errors.array(),
    });
    return;
  }
  try {
    const { username, email, password, phone } = req.body;
    const hashedPassword = await argon2.hash(password);
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      res.status(400).json({
        message: "نام کاریری قابل دسترس نیست",
      });
      return;
    }
    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
      res.status(400).json({
        message: "ایمیل قابل دسترس نیست",
      });
      return;
    }
    const existingPhone = await User.findOne({ phone });
    if (existingPhone) {
      res.status(400).json({
        message: "شماره تماس قابل دسترس نیست",
      });
      return;
    }
    const newUser: Document & IUser = new User({
      username: username,
      email: email,
      password: hashedPassword,
      phone: phone,
    });
    await newUser.save();
    const jwtToken = await CookieAndJwt(newUser._id, res);
    if (jwtToken === null) {
      throw new Error("Failed to generate the token");
    }
    const toSendUser = await User.findById(newUser._id).select(
      "-password -__v"
    );
    if (toSendUser) {
      res.status(200).json(toSendUser);
      return;
    }
  } catch (error) {
    const errorMessage = (error as Error).message;
    console.log("Error in signup", errorMessage);
    res.status(500).json({
      message: "مشکلی پیش آمد",
    });
  }
};

export const login = async (
  req: Request<LoginRequestBody>,
  res: Response
): Promise<void> => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      res.status(404).json({
        message: "نام کاربری یا رمز عبور اشتباه است",
      });
      return;
    }
    const matchPassword = await argon2.verify(user.password, password);
    if (!matchPassword) {
      res.status(404).json({
        message: "نام کاربری یا رمز عبور اشتباه است",
      });
      return;
    }
    const jwtToken = await CookieAndJwt(user._id, res);

    if (jwtToken === null) {
      throw new Error("Failed to generate the token");
    }
    const toSendUser = await User.findById(user._id).select("-password -__v");
    if (toSendUser) {
      res.status(200).json(toSendUser);
      return;
    }
  } catch (error) {
    const errorMessage = (error as Error).message;
    console.log("Failed to login", errorMessage);
    res.status(500).json({
      message: "مشکلی پیش آمد",
    });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json({
      message: "از حساب خارج شد",
    });
  } catch (error) {
    res.status(500).json({
      message: "مشکل سیستم",
    });
  }
};
