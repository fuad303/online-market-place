import express, { Request, Response } from "express";
import {
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

export default upload;
