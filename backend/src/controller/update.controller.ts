import { Request, Response } from "express";
import argon2 from "argon2";
import User from "../model/User";

export const updateProfile = async (req: Request, res: Response) => {
  if (req.userId !== req.params.id) {
    console.log("Id of the authed user", req.userId);
    console.log("Id of the request", req.params.id);

    res.status(401).json({
      message: "Unauthorized go and fuck yourself",
    });
    return;
  }
  try {
    let hashedPassword;
    if (req.body.password) {
      hashedPassword = await argon2.hash(req.body.password);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          password: hashedPassword,
        },
      },
      { new: true }
    );
    const { password, __v, ...rest } = updatedUser?._doc;
    res.status(200).json(rest);
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error saving the changes", error.message);
    }
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
