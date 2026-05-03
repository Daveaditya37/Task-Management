import { Request, Response } from "express";
import { db } from "../db/index";

export const getMembers = async (Request: Request, Response: Response) => {
  try {
    const members = await db.user.findMany({
      where: {
        role: "MEMBER",
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    return Response.status(200).json({
      success: true,
      count: members.length,
      members,
    });
  } catch (error) {
    return Response.status(500).json({
      success: false,
      message: "Failed to fetch members",
      error,
    });
  }
};
