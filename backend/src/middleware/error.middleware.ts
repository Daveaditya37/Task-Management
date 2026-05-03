import { Request, Response, NextFunction } from "express";

export const errorMiddleware = (
  err: any,
  Request: Request,
  Response: Response,
  next: NextFunction
) => {
  console.error(err);

  return Response.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};
