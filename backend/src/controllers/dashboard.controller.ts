import { Request, Response } from "express";
import { db } from "../db/index";

export const getAdminDashboard = async (Request: Request, Response: Response) => {
  const totalProjects = await db.project.count();

  const activeTasks = await db.task.count({
    where: { status: "IN_PROGRESS" },
  });

  const completedTasks = await db.task.count({
    where: { status: "COMPLETED" },
  });

  const teamMembers = await db.user.count({
    where: { role: "MEMBER" },
  });

  Response.json({
    success: true,
    data: {
      totalProjects,
      activeTasks,
      completedTasks,
      teamMembers,
    },
  });
};