import express, { Request, Response } from "express";
import {
  newNotification,
  profileImage,
  profileUploadMiddleware,
} from "../controller/upploadd.controller";
import { userDetails } from "../middleware/userDetails.middleware";

const upload = express.Router();

upload.post(
  "/profileImage",
  userDetails,
  profileUploadMiddleware,
  profileImage
);

upload.post("/makeNoti", newNotification);
export default upload;
