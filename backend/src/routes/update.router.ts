import express from "express";
import { updateProfile } from "../controller/update.controller";

export const updateRoute = express.Router();

updateRoute.put("/userProfile/:id", updateProfile);
