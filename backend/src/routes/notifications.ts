import express from "express";
import {
  deleteNotification,
  search,
  updateNotification,
  userNotifications,
} from "../controller/notifications.controller";
import verifyToken from "../middleware/verifyToken.middleware";
const notifications = express.Router();

notifications.get("/getAuserNotifications", verifyToken, userNotifications);

notifications.delete(
  "/deleteANotification:id",
  verifyToken,
  deleteNotification
);

notifications.put("/updateNotification/:id", verifyToken, updateNotification);

notifications.get("/searchNotifications", search);

export default notifications;
