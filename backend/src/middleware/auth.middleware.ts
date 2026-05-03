import { Request, Response, NextFunction } from "express";
import { Role } from "@prisma/client";
import jwt from "jsonwebtoken";
import { db } from "../db/index";

interface JwtPayload {
  id: string;
  role: Role;
  email: string;
}

export const authenticateUser = (allowedRoles: Role[]) => {
  return async (
    Request: Request,
    Response: Response,
    NextFunction: NextFunction
  ) => {
    try {
      const token = Request.headers.authorization?.split(" ")[1];

      if (!token) {
        return Response.status(401).json({
          message: "No token provided",
        });
      }

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as JwtPayload;

      const user = await db.user.findUnique({
        where: {
          id: decoded.id,
        },
      });

      if (!user) {
        return Response.status(404).json({
          message: "User not found",
        });
      }

      if (!allowedRoles.includes(user.role)) {
        return Response.status(403).json({
          message: "Access denied",
        });
      }

      (Request as any).user = {
        id: user.id,
        role: user.role,
        email: user.email,
      };

      NextFunction();
    } catch {
      return Response.status(401).json({
        message: "Invalid or expired token",
      });
    }
  };
};

export const authMiddleware = (
  Request: Request,
  Response: Response,
  NextFunction: NextFunction
) => {
  const token = Request.headers.authorization?.split(" ")[1];

  if (!token) {
    return Response.status(401).json({
      message: "No token provided",
    });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

   (Request as any).user = {
      id: decoded.id,
      role: decoded.role,
      email: decoded.email,
    };

    NextFunction();
  } catch {
    return Response.status(401).json({
      message: "Invalid token",
    });
  }
};
