import express from "express";
import {
  deleteNotification,
  search,
  updateNotification,
  userNotifications,
} from "../controller/notifications.controller";
const notifications = express.Router();

notifications.get("/getAuserNotifications", userNotifications);

notifications.delete("/deleteANotification:id", deleteNotification);

notifications.put("/updateNotification/:id", updateNotification);

notifications.get("/searchNotifications", search);

export default notifications;
