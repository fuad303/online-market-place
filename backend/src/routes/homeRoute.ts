import express from "express";
import {
  feedmeed,
  getAPost,
  getUserCredentials,
} from "../controller/home.controller";
import verifyToken from "../middleware/verifyToken.middleware";
const home = express.Router();

home.get("/feedmeed", feedmeed);
home.get("/getAPost/:id", getAPost);
home.get("/getUserCredentials/:seller", verifyToken, getUserCredentials);

export default home;
