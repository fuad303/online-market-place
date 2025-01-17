import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import connect from "../src/db/ConnectDb";
import userRouter from "./routes/user.router";
import authRouter from "./routes/auth.router";
import upload from "./routes/upploadd.router";
import updateRoute from "./routes/update.router";
import authToken from "./middleware/auth.middleware";

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));
dotenv.config();
app.use(express.json());
app.use(cookieParser());
connect();

const uploadPath = path.join(
  __dirname,
  "db",
  "storage",
  "uploads",
  "profile-images"
);
app.use("/uploads/profile-images", express.static(uploadPath));

app.use("/auth", authRouter);
app.use("/user", authToken, userRouter);
app.use("/upploadd", authToken, upload);
app.use("/update", authToken, updateRoute);

app.listen(4000, () => {
  console.log("Listening on port 4000");
});
