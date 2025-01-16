import express from "express";
import connect from "../src/db/ConnectDb";
import dotenv from "dotenv";
import userRouter from "./routes/user.router";
import authRouter from "./routes/auth.router";
import cors from "cors";
import upload from "./routes/Upploadd";
import path from "path";

const app = express();
const uploadPath = path.join(
  __dirname,
  "db",
  "storage",
  "uploads",
  "profile-images"
);
const corsOptions = {
  origin: ["http://localhost:5173"],
  credentials: true,
};
dotenv.config();

app.use(cors(corsOptions));
app.use(express.json());

connect();
app.use("/uploads/profile-images", express.static(uploadPath));

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/upploadd", upload);

app.listen(4000, () => {
  console.log("Listening on port 4000");
});
