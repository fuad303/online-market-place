import express from "express";
import { login, signup, validateSignup } from "../controller/Auth.controller";
const authRouter = express.Router();

authRouter.post("/signup", validateSignup, signup);
authRouter.post("/login", login);

export default authRouter;
