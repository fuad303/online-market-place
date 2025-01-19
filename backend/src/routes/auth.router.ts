import express from "express";
import {
  login,
  logout,
  signup,
  validateSignup,
} from "../controller/Auth.controller";
import verifyToken from "../middleware/verifyToken.middleware";
const authRouter = express.Router();

authRouter.post("/signup", validateSignup, signup);
authRouter.post("/login", login);
authRouter.get("/logout", verifyToken, logout);

export default authRouter;
