import express from "express";
import { feedmeed, getAPost } from "../controller/home.controller";
const home = express.Router();

home.get("/feedmeed", feedmeed);
home.get("/getAPost/:id", getAPost);

export default home;
