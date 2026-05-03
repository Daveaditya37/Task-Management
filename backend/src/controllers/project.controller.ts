import { Request, Response } from "express";
import { db } from "../db/index";


// ==========================
// CREATE PROJECT
// ==========================

export const createProject = async (
  Request: Request,
  Response: Response
) => {
  try {
    const { title, description } = Request.body;

    const user = (Request as any).user;

    const project = await db.project.create({
      data: {
        title,
        description,
        createdBy: user.id,
      },
    });

    return Response.status(201).json({
      success: true,
      message: "Project created successfully",
      project,
    });
  } catch (error) {
    return Response.status(500).json({
      success: false,
      message: "Failed to create project",
      error,
    });
  }
};


// ==========================
// GET ALL PROJECTS
// ==========================

export const getProjects = async (
  Request: Request,
  Response : Response
) => {
  try {
    const projects = await db.project.findMany({
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },

        tasks: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    return Response.status(200).json({
      success: true,
      count: projects.length,
      projects,
    });
  } catch (error) {
    return Response.status(500).json({
      success: false,
      message: "Failed to fetch projects",
      error,
    });
  }
};

export const getSingleProject = async (
  Request: Request,
  Response: Response
) => {
  try {
    const id = Request.params.id as string;

    const project = await db.project.findUnique({
      where: {
        id,
      },

      include: {
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },

        tasks: {
          include: {
            assignee: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    if (!project) {
      return Response.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    return Response.status(200).json({
      success: true,
      project,
    });
  } catch (error) {
    return Response.status(500).json({
      success: false,
      message: "Failed to fetch project",
      error,
    });
  }
};

export const updateProject = async (
  Request: Request,
  Response: Response
) => {
  try {
    const id = Request.params.id as string;

    const { title, description } = Request.body;

    const project = await db.project.findUnique({
      where: { id },
    });

    if (!project) {
      return Response.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    const updatedProject = await db.project.update({
      where: {
        id,
      },

      data: {
        title,
        description,
      },
    });

    return Response.status(200).json({
      success: true,
      message: "Project updated successfully",
      project: updatedProject,
    });
  } catch (error) {
    return Response.status(500).json({
      success: false,
      message: "Failed to update project",
      error,
    });
  }
};

export const deleteProject = async (
  Request: Request,
  Response: Response
) => {
  try {
    const id = Request.params.id as string;

    const project = await db.project.findUnique({
      where: {
        id,
      },
    });

    if (!project) {
      return Response.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    await db.project.delete({
      where: {
        id,
      },
    });

    return Response.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    return Response.status(500).json({
      success: false,
      message: "Failed to delete project",
      error,
    });
  }
};