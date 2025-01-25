import express from "express";
import {
  newNotification,
  notificationUploadMiddleware,
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

upload.post("/makeNoti", notificationUploadMiddleware, newNotification);
export default upload;
