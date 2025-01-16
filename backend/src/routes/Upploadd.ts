import express, { Request, Response } from "express";
import {
  profileImage,
  profileUploadMiddleware,
} from "../controller/upploadd.controller";

const upload = express.Router();

upload.post("/profileImage", profileUploadMiddleware, profileImage);

export default upload;
