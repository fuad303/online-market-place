import express from "express";
import { updateProfile } from "../controller/update.controller";

const updateRoute = express.Router();

updateRoute.post("/userProfile", updateProfile);

export default updateRoute;
