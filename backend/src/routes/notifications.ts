import express from "express";
import {
  deleteNotification,
  userNotifications,
} from "../controller/notifications.controller";
const notifications = express.Router();

notifications.get("/getAuserNotifications", userNotifications);

notifications.delete("/deleteANotification:id", deleteNotification);

export default notifications;
