import express from "express";
import { userNotifications } from "../controller/notifications.controller";
const notifications = express.Router();

notifications.get("/getAuserNotifications", userNotifications);

export default notifications;
