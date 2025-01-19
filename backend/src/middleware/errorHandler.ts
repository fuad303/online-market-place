import { Request, Response, NextFunction } from "express";

interface CustomError extends Error {
  statusCode?: number;
  status?: string;
}

const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!err) {
    return next();
  }

  const statusCode = err.statusCode || 500;
  const status = err.status || "error";
  const message = err.message || "Something went wrong!";

  res.status(statusCode).json({
    status,
    message,
  });
};

export default errorHandler;
