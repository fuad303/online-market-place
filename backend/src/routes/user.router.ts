import express, { Request, Response } from "express";

const userRouter = express.Router();

userRouter.get("/", (req: Request, res: Response) => {
  res.send("h");
});

export default userRouter;
