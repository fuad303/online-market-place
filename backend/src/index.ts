import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import connect from "../src/db/ConnectDb";
import userRouter from "./routes/user.router";
import authRouter from "./routes/auth.router";
import upload from "./routes/upploadd.router";
import { updateRoute } from "./routes/update.router";
import verifyToken from "./middleware/verifyToken.middleware";

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

app.get("/", (req: Request, res: Response) => {
  console.log("IP: ", req.ip);

  res.send("Fuck you bitch");
});
app.use("/auth", authRouter);
app.use("/user", verifyToken, userRouter);
app.use("/upploadd", verifyToken, upload);
app.use("/update", verifyToken, updateRoute);

app.listen(4000, () => {
  console.log("Listening on port 4000");
});
