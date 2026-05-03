import { Request, Response } from "express";
import { db } from "../db";

export const createTask = async (Request: Request, Response: Response) => {
  try {
    const {
      title,
      description,
      priority,
      estimatedTime,
      dueDate,
      assignedTo,
      projectId,
      isPrivate,
    } = Request.body;

    const task = await db.task.create({
      data: {
        title,
        description,
        priority,
        estimatedTime,
        dueDate: dueDate ? new Date(dueDate) : null,
        assignedTo,
        projectId: projectId || null,
        isPrivate: isPrivate || false,
      },

      include: {
        assignee: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },

        project: true,
      },
    });

    return Response.status(201).json({
      success: true,
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    return Response.status(500).json({
      success: false,
      message: "Failed to create task",
      error,
    });
  }
};

export const getTasks = async (Request: Request, Response: Response) => {
  try {
    const tasks = await db.task.findMany({
      where: {
        isPrivate: false,
      },
      include: {
        assignee: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },

        project: true,
      },

      orderBy: [
        {
          priority: "asc",
        },

        {
          createdAt: "desc",
        },
      ],
    });

    return Response.status(200).json({
      success: true,
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    return Response.status(500).json({
      success: false,
      message: "Failed to fetch tasks",
      error,
    });
  }
};

export const getSingleTask = async (Request: Request, Response: Response) => {
  try {
    const id = Request.params.id as string;

    const task = await db.task.findUnique({
      where: {
        id,
      },

      include: {
        assignee: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },

        project: true,
      },
    });

    if (!task) {
      return Response.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    return Response.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    return Response.status(500).json({
      success: false,
      message: "Failed to fetch task",
      error,
    });
  }
};

export const updateTask = async (Request: Request, Response: Response) => {
  try {
    const id = Request.params.id as string;

    const { title, description, priority, dueDate, assignedTo, estimatedTime } =
      Request.body;

    const existingTask = await db.task.findUnique({
      where: {
        id,
      },
    });

    if (!existingTask) {
      return Response.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    const updatedTask = await db.task.update({
      where: {
        id,
      },

      data: {
        title,
        description,
        priority,
        assignedTo,
        estimatedTime,
        dueDate: dueDate ? new Date(dueDate) : undefined,
      },
    });

    return Response.status(200).json({
      success: true,
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    return Response.status(500).json({
      success: false,
      message: "Failed to update task",
      error,
    });
  }
};

export const deleteTask = async (Request: Request, Response: Response) => {
  try {
    const id = Request.params.id as string;

    const existingTask = await db.task.findUnique({
      where: {
        id,
      },
    });

    if (!existingTask) {
      return Response.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    await db.task.delete({
      where: {
        id,
      },
    });

    return Response.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    return Response.status(500).json({
      success: false,
      message: "Failed to delete task",
      error,
    });
  }
};

export const getMyTasks = async (Request: Request, Response: Response) => {
  try {
    const user = (Request as any).user;

    const tasks = await db.task.findMany({
      where: {
        assignedTo: user.id,
      },

      include: {
        project: true,
      },

      orderBy: [
        {
          priority: "asc",
        },

        {
          createdAt: "desc",
        },
      ],
    });

    return Response.status(200).json({
      success: true,
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    return Response.status(500).json({
      success: false,
      message: "Failed to fetch member tasks",
      error,
    });
  }
};

export const startTask = async (Request: Request, Response: Response) => {
  try {
    const id = Request.params.id as string;

    const existingTask = await db.task.findUnique({
      where: {
        id,
      },
    });

    if (!existingTask) {
      return Response.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    const task = await db.task.update({
      where: {
        id,
      },

      data: {
        status: "IN_PROGRESS",
        startedAt: new Date(),
      },
    });

    return Response.status(200).json({
      success: true,
      message: "Task started",
      task,
    });
  } catch (error) {
    return Response.status(500).json({
      success: false,
      message: "Failed to start task",
      error,
    });
  }
};

export const completeTask = async (Request: Request, Response: Response) => {
  try {
    const id = Request.params.id as string;

    const existingTask = await db.task.findUnique({
      where: {
        id,
      },
    });

    if (!existingTask) {
      return Response.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    const task = await db.task.update({
      where: {
        id,
      },

      data: {
        status: "COMPLETED",
        completedAt: new Date(),
      },
    });

    return Response.status(200).json({
      success: true,
      message: "Task completed successfully",
      task,
    });
  } catch (error) {
    return Response.status(500).json({
      success: false,
      message: "Failed to complete task",
      error,
    });
  }
};
