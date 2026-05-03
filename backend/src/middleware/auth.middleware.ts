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
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];

      if (!token) {
        return res.status(401).json({
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
        return res.status(404).json({
          message: "User not found",
        });
      }

      if (!allowedRoles.includes(user.role)) {
        return res.status(403).json({
          message: "Access denied",
        });
      }

      (req as any).user = {
        id: user.id,
        role: user.role,
        email: user.email,
      };

      next();
    } catch {
      return res.status(401).json({
        message: "Invalid or expired token",
      });
    }
  };
};

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "No token provided",
    });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

   (req as any).user = {
      id: decoded.id,
      role: decoded.role,
      email: decoded.email,
    };

    next();
  } catch {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};
